import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import api from "../../api/axios";

const defaultPostState = (likeCount = 0) => ({
  liked: false,
  saved: false,
  likeCount,
});

const CommunityContext = createContext(null);

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used within CommunityProvider");
  return ctx;
}

export function CommunityProvider({
  children,
  onWritePostOpen,
  onCloseWritePost,
  onOpenComments,
  onApplyNow,
  onCloseApplyNow,
  onSaveGlobal,
}) {
  const [posts, setPosts] = useState(0);

  const [commentText, setCommentText] = useState("");
  const [submittedComments, setSubmittedComments] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostMedia, setNewPostMedia] = useState(null);
  const [newPostMediaUrl, setNewPostMediaUrl] = useState(null);

  const onLike = useCallback(async (postId, initialState) => {
    // Optimistic UI update
    setPosts((prev) => {
      const current = prev[postId] ?? initialState ?? defaultPostState();
      return {
        ...prev,
        [postId]: {
          ...current,
          liked: !current.liked,
          likeCount: current.liked ? current.likeCount - 1 : current.likeCount + 1,
        },
      };
    });

    // Determine actual numeric ID and endpoint
    let endpoint = null;
    if (typeof postId === "string") {
      if (postId.startsWith("dyn-")) return; // Don't call API for unsaved dynamic posts

      const parts = postId.split("-");
      if (parts[0] === "post" && parts.length >= 3) {
        endpoint = `/Posts/${parts[1]}/like`;
      } else if (parts[0] === "job" && parts.length >= 3) {
        endpoint = `/Jobs/${parts[1]}/like`; 
      } else {
        endpoint = `/Posts/${postId}/like`;
      }
    } else {
      endpoint = `/Posts/${postId}/like`;
    }

    if (endpoint) {
      try {
        const token = localStorage.getItem("token");
        await api.post(endpoint, {}, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
      } catch (error) {
        console.error("Failed to like item:", error);
        // Revert optimistic update on failure
        setPosts((prev) => {
          const current = prev[postId] ?? initialState ?? defaultPostState();
          return {
            ...prev,
            [postId]: {
              ...current,
              liked: !current.liked,
              likeCount: current.liked ? current.likeCount - 1 : current.likeCount + 1,
            },
          };
        });
      }
    }
  }, []);

  const onSave = useCallback((postId, initialState) => {
    setPosts((prev) => {
      const current = prev[postId] ?? initialState ?? defaultPostState();
      return {
        ...prev,
        [postId]: {
          ...current,
          saved: !current.saved,
        },
      };
    });
    onSaveGlobal?.(postId);
  }, [onSaveGlobal]);

  const onSubmitComment = useCallback(() => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    setSubmittedComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: trimmed,
        author: "Mina Morcos",
        time: "Just now",
      },
    ]);
    setCommentText("");
  }, [commentText]);

  const handleSetNewPostMedia = useCallback((file) => {
    setNewPostMedia(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setNewPostMediaUrl(url);
    } else {
      setNewPostMediaUrl(null);
    }
  }, []);

  const onSubmitPost = useCallback(() => {
    setNewPostContent("");
    setNewPostMedia(null);
    setNewPostMediaUrl(null);
    onCloseWritePost();
  }, [onCloseWritePost]);

  return (
    <CommunityContext.Provider
      value={{
        posts,
        onLike,
        onSave,
        onOpenComments,
        onWritePost: onWritePostOpen,
        onCloseWritePost,
        onApplyNow,
        onCloseApplyNow,
        commentText,
        setCommentText,
        onSubmitComment,
        submittedComments,
        newPostContent,
        setNewPostContent,
        newPostMedia,
        setNewPostMedia: handleSetNewPostMedia,
        newPostMediaUrl,
        onSubmitPost,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}