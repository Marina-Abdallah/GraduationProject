import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Divider,
  Chip,
  Collapse,
  Avatar,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useCommunity } from "./CommunityContext";
import { useAppContext } from "../components/AppContext";
import bannerImg from "../../assets/ApplyJobBackground.jpg";
import defaultPhoto from "../../assets/defaultImg.png";
import defaultCompanyPhoto from "../../assets/defaultCompanyImg.png";


const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";
const GOLD = "#FBBC04";
const RED = "#C32929";

export function JobPostCard({
  postId,
  jobId,
  companyId,
  company,
  companyPhoto,
  companyName,
  companyIndustry,
  locationMode,
  jobTitle,
  companyLocation,
  jobType,
  jobCategoryName,
  jobShortDescription,
  jobDescription,
  Img,
  likesCount = 0,
  isLikedByMe = false,
  isFollowedByMe = false,
  isSavedByMe = false,
  highlighted = false,
}) {
  const companyLabel =
    typeof company === "string"
      ? company
      : companyName ?? company?.name ?? "Unknown company";
  const companyImage = company?.photo || companyPhoto;
  const displayedJobDescription = jobShortDescription ?? jobDescription ?? "";

  const { posts, onLike, onSave, onApplyNow } = useCommunity();
  const { profile, toggleFollow, loggedInId } = useAppContext();
  const isOwnCompany = loggedInId && Number(loggedInId) === Number(companyId);
  const initialState = { liked: isLikedByMe, saved: isSavedByMe, likeCount: likesCount, followed: isFollowedByMe };
  const postState = posts[postId] ?? initialState;
  const { liked, saved, likeCount, followed } = postState;

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  //const { company } = useAppContext();
  // ── Follow state ────────────────────────────────────────────────
  const [isFollowing, setIsFollowing] = useState(isFollowedByMe);

  useEffect(() => {
    console.log("isFollowedByMe from API:", isFollowedByMe);
    setIsFollowing(isFollowedByMe);
  }, [isFollowedByMe]);

  const cardRef = useRef(null);

  useEffect(() => {
    if (highlighted && cardRef.current) {
      const timer = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [highlighted]);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/jobs/${jobId}/comments`,
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
        `${import.meta.env.VITE_API_URL}/Jobs/${jobId}/comments`,
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

      setComments((prev) => [...prev, newComment]);

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
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

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
        overflow: "hidden",
        transition: "box-shadow 0.5s ease, border-color 0.5s ease",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: "16px 20px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* <MSLogo size={52} /> */}
          <Avatar
            src={companyImage || defaultCompanyPhoto}
            alt={companyLabel}
            sx={{
              width: 52,
              height: 52,
              bgcolor: "white",
              borderRadius: "10px",
              border: "1px solid rgba(19,32,109,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
            }}
          />
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
              {companyLabel}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {/* <LocationOnOutlinedIcon sx={{ fontSize: 13, color: LIGHT_BLUE }} /> */}
              <Typography
                sx={{
                  color: NAVY,
                  fontSize: 12,
                  opacity: 0.7,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {companyIndustry}
                {/* {companyIndustry ? `${companyIndustry} • ${companyLocation}` : companyLocation} */}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {/* Follow button */}
          {!isOwnCompany && (
            <Tooltip title={isFollowing ? "Unfollow" : `Follow ${companyLabel}`}>
              <Box
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!companyId) return;

                  try {
                    const followed = await toggleFollow(companyId, "company");

                    console.log("follow API returned:", followed);

                    setIsFollowing(followed);
                  } catch (err) {
                    console.error("Error following/unfollowing company:", err);
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

      {/* Banner image */}
      <Box
        sx={{
          position: "relative",
          height: 170,
          overflow: "hidden",
          mx: 2,
          borderRadius: "12px",
          mb: 2,
        }}
      >
        <img
          src={Img || bannerImg}
          alt="Job banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Gradient overlay with company info */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 55%)",
            borderRadius: "12px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 12,
            display: "flex",
            alignItems: "flex-end",
            gap: 1.5,
          }}
        >

          <Avatar
            src={companyImage || defaultCompanyPhoto}
            alt={companyLabel}
            sx={{
              width: 36,
              height: 36,
              bgcolor: "white",
              borderRadius: "8px",
              border: "1px solid rgba(19,32,109,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
            }}
          />
          <Box>
            <Typography
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: 16,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.2,
              }}
            >
              {companyLabel}
            </Typography>
            {locationMode && (
              <>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {companyLocation ? `${companyLocation} • ${locationMode}` : locationMode}

                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Job info + Apply */}
      <Box
        sx={{
          px: "20px",
          pb: "16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: NAVY,
              fontWeight: 700,
              fontSize: 18,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.3,
            }}
          >
            {jobTitle}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mt: 0.4, mb: 0.8 }}>
            <WorkOutlineIcon sx={{ fontSize: 14, color: LIGHT_BLUE }} />
            <Chip
              label={jobType}
              size="small"
              sx={{
                bgcolor: `rgba(132,251,162,0.18)`,
                color: NAVY,
                fontWeight: 700,
                fontSize: 12,
                border: `1px solid rgba(132,251,162,0.4)`,
                borderRadius: "8px",
                height: 22,
              }}
            />

            {locationMode && (
              <>
                <Chip
                  label={locationMode}
                  size="small"
                  sx={{
                    bgcolor: `rgba(132,251,162,0.18)`,
                    color: NAVY,
                    fontWeight: 700,
                    fontSize: 12,
                    border: `1px solid rgba(132,251,162,0.4)`,
                    borderRadius: "8px",
                    height: 22,
                  }}
                />

              </>
            )}
            <Chip
              label={jobCategoryName}
              size="small"
              sx={{
                bgcolor: `rgba(132,251,162,0.18)`,
                color: NAVY,
                fontWeight: 700,
                fontSize: 12,
                border: `1px solid rgba(132,251,162,0.4)`,
                borderRadius: "8px",
                height: 22,
              }}
            />
          </Box>

          <Typography
            sx={{
              color: NAVY,
              fontSize: 14,
              opacity: 0.75,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.6,
              maxWidth: 400,
            }}
          >
            {displayedJobDescription}
          </Typography>
        </Box>

        {/* Apply Now button */}
        <Box
          onClick={(e) => { e.stopPropagation(); onApplyNow(jobId); }}
          sx={{
            bgcolor: GREEN,
            color: NAVY,
            fontWeight: 700,
            fontSize: 14,
            fontFamily: "'Inter', sans-serif",
            px: 3,
            py: 1.2,
            borderRadius: "16px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
            "&:hover": { bgcolor: "#6ef094" },
            transition: "background 0.2s",
            userSelect: "none",
            mt: 0.5,
          }}
        >
          Apply Now
        </Box>
      </Box>

      <Divider sx={{ mx: 2.5, borderColor: `${NAVY}14` }} />

      {/* Action bar */}
      <Box sx={{ px: "20px", py: "12px", display: "flex", alignItems: "center", gap: 1 }}>
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
    </Card>
  );
}
