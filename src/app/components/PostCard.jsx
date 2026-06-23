import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Collapse,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useCommunity } from "./CommunityContext";
import { useAppContext } from "./AppContext";
import defaultPhoto from "../../assets/defaultImg.png";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";
const GOLD = "#FBBC04";
const RED = "#C32929";

export function PostCard({ postId, author, authorId, authorType, role, subtitle, content, mediaUrl, authorPhoto, avatarColor, rtl = false, highlighted = false, profileType, likesCount = 0, isLikedByMe = false, isSavedByMe = false, isFollowedByMe = false }) {
  const { posts, onLike, onSave } = useCommunity();
  const { profile, company, toggleFollow, loggedInId } = useAppContext();
  const isOwnPost = loggedInId && Number(loggedInId) === Number(authorId);
  const initialState = { liked: isLikedByMe, saved: isSavedByMe, likeCount: likesCount, followed: isFollowedByMe }; // Default followed state is false; you may want to fetch this from the backend in a real app
  const postState = posts[postId] ?? initialState;
  const { liked, saved, likeCount, followed } = postState;

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  // ── Follow state ────────────────────────────────────────────────
  const [isFollowing, setIsFollowing] = useState(isFollowedByMe);

  useEffect(() => {
    setIsFollowing(isFollowedByMe);
  }, [isFollowedByMe]);  // ── Highlight / scroll ref ──────────────────────────────────────
  const cardRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (highlighted && cardRef.current) {
      const timer = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [highlighted]);
  const displayName = () => {
    if (profileType === "company") return company?.name;
    if (profileType === "user") return profile?.name;
    return "Unknown";
  };
  const displayPhoto = () => {
    if (profileType === "company") return company?.photo;
    if (profileType === "user") return profile?.photo;
    return "Unknown";
  };
  console.log(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments`
  );

  const fetchComments = async () => {
    try {
      setLoadingComments(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("API Error:", errorText);
        throw new Error(errorText);
      }

      const data = await response.json();

      const formattedComments = data.map((c) => ({
        id: c.id,
        author: c.authorName,   // temporary until you return user name
        avatarSrc: c.authorPictureUrl,
        time: c.createdAt ? new Date(c.createdAt).toLocaleString() : "",
        text: c.content,
        replies: c.replies || [],
      }));

      setComments(formattedComments);

    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);

    }
  };

  const createComment = async (text) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: text,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("POST Error:", errorText);
        throw new Error(errorText);
      }

      const newComment = await response.json();
      // Transform to same shape as fetched comments
      const formatted = {
        id: newComment.id,
        author: newComment.authorName,
        avatarSrc: newComment.authorPictureUrl,
        time: newComment.createdAt ? new Date(newComment.createdAt).toLocaleString() : "",
        text: newComment.content,
        replies: newComment.replies || [],
      };
      setComments((prev) => [...prev, formatted]);

      return true;
    } catch (error) {
      console.error("Error creating comment:", error);
      return false;
    }
  };

  const handleSubmitComment = async () => {
    const trimmed = commentInput.trim();

    if (!trimmed) return;

    const success = await createComment(trimmed);

    if (success) {
      setCommentInput("");
      // Refresh the list to guarantee consistency
      fetchComments();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  // Generate a deterministic avatar background from author name
  const initials = author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bgColor = avatarColor || LIGHT_BLUE;
  const userPhoto = authorPhoto || defaultPhoto;

  return (
    <Card
      ref={cardRef}
      elevation={0}
      sx={{
        bgcolor: "white",
        borderRadius: "16px",
        boxShadow: highlighted
          ? `0 0 0 3px ${GREEN}, 0 8px 32px rgba(132,251,162,0.45)`
          : "0 4px 20px rgba(19,32,109,0.07)",
        border: highlighted
          ? `2px solid ${GREEN}`
          : "1px solid rgba(19,32,109,0.05)",
        overflow: "visible",
        transition: "box-shadow 0.5s ease, border-color 0.5s ease",
      }}
    >
      <Box sx={{ p: "16px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={userPhoto}
              alt={author}
              sx={{
                width: 52,
                height: 52,
                bgcolor: bgColor,
                fontWeight: 700,
                color: NAVY,
                fontSize: 18,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {!userPhoto && initials}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  color: NAVY,
                  fontWeight: 700,
                  fontSize: 17,
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1,
                }}
              >
                {author}
              </Typography>
              <Typography
                sx={{
                  color: NAVY,
                  fontSize: 12,
                  opacity: 0.7,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {subtitle || role}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {/* Follow button */}
            {!isOwnPost && (
              <Tooltip title={isFollowing ? "Unfollow" : `Follow ${author}`}>
                <Box
                  onClick={async (e) => {
                    e.stopPropagation();
                    console.log("FOLLOW CLICK", {
                      author,
                      authorId,
                      authorType,
                    });
                    if (!authorId) return;
                    try {
                      await toggleFollow(authorId, authorType || "user");
                      setIsFollowing(prev => !prev);
                    } catch (err) {
                      console.error("Error following/unfollowing:", err);
                    }
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: NAVY,
                    fontWeight: 600,
                    fontSize: 14,
                    fontFamily: "'Inter', sans-serif",
                    border: `1.5px solid ${NAVY}30`,
                    borderRadius: "20px",
                    px: 1.5,
                    py: 0.5,
                    cursor: "pointer",
                    "&:hover": { borderColor: GREEN, color: GREEN },
                    transition: "all 0.25s",
                    mr: 0.5,
                    ...(isFollowing
                      ? {
                        bgcolor: GREEN,
                        color: NAVY,
                        border: `1.5px solid ${GREEN}`,
                        "&:hover": { bgcolor: "#6ef094", borderColor: "#6ef094" },
                      }
                      : {
                        bgcolor: "transparent",
                        color: NAVY,
                        border: `1.5px solid ${NAVY}30`,
                        "&:hover": { borderColor: GREEN, color: GREEN },
                      }),

                  }}
                >
                  {isFollowing ? (
                    <CheckIcon sx={{ fontSize: 15 }} />
                  ) : (
                    <PersonAddOutlinedIcon sx={{ fontSize: 15 }} />
                  )}
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </Box>
              </Tooltip>
            )}
            {/* Save button */}
            <Tooltip title={saved ? "Unsave post" : "Save post"}>
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); onSave(postId, initialState); }}
                sx={{ color: GOLD }}
              >
                {saved ? (
                  <BookmarkIcon sx={{ fontSize: 24 }} />
                ) : (
                  <BookmarkBorderIcon sx={{ fontSize: 24 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Content */}
        <Typography
          sx={{
            color: NAVY,
            fontSize: 16,
            fontFamily: rtl
              ? "'Noto Sans Arabic', 'Inter', sans-serif"
              : "'Inter', sans-serif",
            lineHeight: 1.75,
            whiteSpace: "pre-wrap",
          }}
          dir={rtl ? "rtl" : "auto"}
        >
          {content}
        </Typography>

        {/* Media image */}
        {mediaUrl && (
          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              maxHeight: 400,
              mt: -0.5,
            }}
          >
            <img
              src={mediaUrl}
              alt="post media"
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
                display: "block",
                borderRadius: 12,
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </Box>
        )}

        <Divider sx={{ borderColor: `${NAVY}18` }} />

        {/* Action bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Comment trigger */}
          <Box
            onClick={(e) => {
              e.stopPropagation();
              const nextState = !showComments;
              setShowComments(nextState);
              if (nextState) {
                fetchComments();
              }
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flex: 1,
              cursor: "pointer",
              border: `1.5px solid ${LIGHT_BLUE}`,
              borderRadius: "16px",
              px: 2,
              py: 0.7,
              color: LIGHT_BLUE,
              fontSize: 15,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              "&:hover": { bgcolor: `${LIGHT_BLUE}12` },
              transition: "background 0.15s",
            }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 20, color: NAVY }} />
            <span>
              {showComments
                ? "Hide comments"
                : comments.length > 0
                  ? `${comments.length} comment${comments.length > 1 ? "s" : ""}`
                  : "Write a comment on this post"}
            </span>
          </Box>

          {/* Like */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onLike(postId, initialState); }}
              sx={{ transition: "transform 0.15s", "&:hover": { transform: "scale(1.15)" } }}
            >
              {liked ? (
                <FavoriteIcon sx={{ color: RED, fontSize: 24 }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: RED, fontSize: 24 }} />
              )}
            </IconButton>
            <Typography
              sx={{
                color: NAVY,
                fontSize: 16,
                fontFamily: "'Inter', sans-serif",
                minWidth: 22,
              }}
            >
              {likeCount}
            </Typography>
          </Box>
        </Box>

        {/* Collapsible comments section */}
        <Collapse in={showComments} onClick={(e) => e.stopPropagation()}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            {/* Submitted comments list */}
            {comments.map((c) => (
              <Box key={c.id} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Avatar
                  src={c.avatarSrc}
                  alt={c.author}
                  sx={{ width: 36, height: 36, border: `2px solid ${GREEN}` }}
                />
                <Box
                  sx={{
                    bgcolor: "rgba(144,186,239,0.08)",
                    borderRadius: "12px 12px 12px 0",
                    px: 2,
                    py: 1,
                    flex: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.4 }}>
                    <Typography
                      sx={{
                        color: NAVY,
                        fontWeight: 700,
                        fontSize: 13,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {c.author}
                    </Typography>
                    <Typography
                      sx={{
                        color: NAVY,
                        fontSize: 11,
                        opacity: 0.45,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {c.time}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: NAVY,
                      fontSize: 14,
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    {c.text}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Comment input */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                src={profile.photo || defaultPhoto}
                alt={profile.name}
                sx={{ width: 36, height: 36, border: `2px solid ${GREEN}`, flexShrink: 0 }}
              />
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  border: `1.5px solid ${GREEN}`,
                  borderRadius: "24px",
                  px: 2,
                  py: 0.8,
                  gap: 1,
                }}
              >
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a comment…"
                  rows={1}
                  style={{
                    flex: 1,
                    resize: "none",
                    border: "none",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: NAVY,
                    background: "transparent",
                    lineHeight: 1.5,
                    maxHeight: 100,
                    overflowY: "auto",
                  }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = Math.min(el.scrollHeight, 100) + "px";
                  }}
                />
                <IconButton
                  size="small"
                  disabled={!commentInput.trim()}
                  onClick={handleSubmitComment}
                  sx={{
                    bgcolor: commentInput.trim() ? GREEN : "transparent",
                    color: NAVY,
                    "&:hover": { bgcolor: "#6ef094" },
                    "&.Mui-disabled": { opacity: 0.35 },
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <SendIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Card>
  );
}
