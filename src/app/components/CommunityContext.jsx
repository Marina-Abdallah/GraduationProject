import React, { createContext, useContext, useState, useCallback, useRef } from "react";

const defaultPostState = (likeCount = 16) => ({
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
  const [posts, setPosts] = useState({
    post1: defaultPostState(16),
    post2: defaultPostState(24),
    post3: defaultPostState(31),
  });

  const [commentText, setCommentText] = useState("");
  const [submittedComments, setSubmittedComments] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostMedia, setNewPostMedia] = useState(null);
  const [newPostMediaUrl, setNewPostMediaUrl] = useState(null);

  const onLike = useCallback((postId) => {
    setPosts((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        liked: !prev[postId].liked,
        likeCount: prev[postId].liked
          ? prev[postId].likeCount - 1
          : prev[postId].likeCount + 1,
      },
    }));
  }, []);

  const onSave = useCallback((postId) => {
    setPosts((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        saved: !prev[postId].saved,
      },
    }));
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