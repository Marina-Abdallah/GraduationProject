import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { JobPostCard} from "./JobPostCard";
import {PostCard } from "./PostCard";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const GOLD = "#FBBC04";
const RED = "#C32929";
const LIGHT_BLUE = "#90baef";

// ─── Normalize a saved item from the API response ────────────────────────────
function normalizeSavedItem(item) {
  if (!item) return null;
  const type = (item.type ?? "").toLowerCase();


  if (type === "job" && item.job) {
    <JobPostCard key={item.job.id} job={item.job} />;
    //const j = item.job;
     //return {
    //   id: `job-${j.id}`,
    //   type: "job",
    //   sourceId: j.id,
    //   title: j.title ?? "Job",
    //   author: j.companyName ?? "Company",
    //   role: j.jobType ?? "",
    //   content: j.shortDescription ?? j.description ?? "",
    //   likesCount: j.likesCount ?? 0,
     //};
  }

  if (type === "post" && item.post) {
    <PostCard key={item.post.id} post={item.post} />;
    // const p = item.post;
    // return {
    //   id: `post-${p.id}`,
    //   type: "post",
    //   sourceId: p.id,
    //   title: null,
    //   author: p.authorName ?? "User",
    //   pictureUrl: p.authorPictureUrl,
    //   role: p.authorHeadline ?? p.authorSubtitle ?? "",
    //   content: p.content ?? "",
    //   likesCount: p.likesCount ?? 0,
    // };
  }

  // Flat shape fallback (API might return items directly)
  if (item.content !== undefined || item.title !== undefined) {
    const isJob = !!item.title;
    return {
      id: `item-${item.id ?? Math.random()}`,
      type: isJob ? "job" : "post",
      sourceId: item.id,
      title: item.title ?? null,
      author: item.authorName ?? item.companyName ?? "Unknown",
      role: item.jobType ?? item.authorHeadline ?? "",
      content: item.content ?? item.shortDescription ?? item.description ?? "",
      likesCount: item.likesCount ?? 0,
    };
  }

  return null;
}

// ─── Single saved-item card ───────────────────────────────────────────────────
function SavedItemCard({ item, onNavigate }) {
  return (
    <Box
      onClick={() => onNavigate(item.sourceId, item.type)}
      sx={{
        bgcolor: "white",
        borderRadius: "16px",
        p: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0px 2px 12px rgba(19,32,109,0.07)",
        border: "1px solid rgba(132,251,162,0.3)",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          boxShadow: `0 0 0 2px ${GREEN}, 0px 4px 20px rgba(132,251,162,0.35)`,
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Box
            sx={{
              width: 48, height: 48, borderRadius: "50%",
              background: "linear-gradient(to bottom, #84fba2, #90baef)",
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography sx={{ color: NAVY, fontSize: "16px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
              {item.author}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {item.type === "job" && <WorkOutlineIcon sx={{ fontSize: 13, color: LIGHT_BLUE }} />}
              <Typography sx={{ color: NAVY, fontSize: "13px", opacity: 0.7, fontFamily: "'Inter', sans-serif" }}>
                {item.role || (item.type === "job" ? "Job Post" : "Post")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {item.type === "job" && (
            <Chip
              label="Job"
              size="small"
              sx={{ bgcolor: "rgba(132,251,162,0.18)", color: NAVY, fontWeight: 700, fontSize: 11, borderRadius: "6px", height: 20 }}
            />
          )}
          <BookmarkIcon sx={{ color: GOLD, fontSize: "22px" }} />
          <OpenInNewIcon sx={{ color: NAVY, fontSize: "15px", opacity: 0.35 }} />
        </Box>
      </Box>

      {/* Title (jobs only) */}
      {item.title && (
        <Typography sx={{ color: NAVY, fontSize: "15px", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
          {item.title}
        </Typography>
      )}

      {/* Content snippet */}
      <Typography
        sx={{
          color: NAVY, fontSize: "15px", lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}
        dir="auto"
      >
        {item.content}
      </Typography>

      <Divider sx={{ borderColor: "rgba(19,32,109,0.1)" }} />

      {/* Footer */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ color: LIGHT_BLUE, fontSize: "13px", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
          Tap to jump →
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <FavoriteIcon sx={{ color: RED, fontSize: "18px" }} />
          <Typography sx={{ color: NAVY, fontSize: "14px", fontFamily: "'Inter', sans-serif" }}>
            {item.likesCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export function SavedItemsModal({ open, onClose, profileType = "user" }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch from backend every time the modal opens
  useEffect(() => {
    if (!open) return;

    const fetchSaved = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const endpoint =
          profileType === "company" ? "/Companies/SavedItems" : "/Users/SavedItems";

        const res = await api.get(endpoint, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const raw = Array.isArray(res.data)
          ? res.data
          : res.data?.items ?? res.data?.data ?? res.data?.savedPosts ?? [];

        setItems(
          raw
            .map((item, index) => normalizeSavedItem(item, index))
            .filter(Boolean)
        );
      } catch (err) {
        console.error("Failed to fetch saved posts:", err);
        setError(
          err.response?.data?.message ??
          (typeof err.response?.data === "string" ? err.response.data : null) ??
          "Failed to load saved posts."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [open, profileType]);

  const handleNavigate = (sourceId, type) => {
    onClose();
    const targetRoute =
      profileType === "company" ? "/CompanyCommunity" : "/Community";
    navigate(targetRoute, {
      state: {
        highlightPostId:
          type === "job"
            ? `job-${sourceId}`
            : `post-${sourceId}`,
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: { borderRadius: "16px", overflow: "hidden", maxHeight: "90vh" },
      }}
    >
      <DialogContent sx={{ p: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 3,
            py: 2,
            borderBottom: "1px solid rgba(19,32,109,0.1)",
            bgcolor: "#fafafa",
            flexShrink: 0,
          }}
        >
          <Button
            onClick={onClose}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: NAVY,
              textTransform: "none",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              bgcolor: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(132,251,162,0.5)",
              borderRadius: "8px",
              px: 2,
              "&:hover": { bgcolor: GREEN, color: NAVY },
            }}
          >
            Back to Profile
          </Button>

          <Typography
            sx={{ color: NAVY, fontSize: "20px", fontWeight: 700, ml: 3, fontFamily: "'Inter', sans-serif" }}
          >
            Saved Posts &amp; Jobs
          </Typography>

          {!loading && items.length > 0 && (
            <Chip
              label={items.length}
              size="small"
              sx={{ ml: 1.5, bgcolor: GREEN, color: NAVY, fontWeight: 700 }}
            />
          )}
        </Box>

        {/* Body */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            p: 3,
            overflow: "auto",
            flex: 1,
            bgcolor: "rgba(144,186,239,0.08)",
          }}
        >
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress sx={{ color: GREEN }} />
              </Box>
            ) : error ? (
              <Typography
                sx={{ color: RED, textAlign: "center", py: 8, fontFamily: "'Inter', sans-serif" }}
              >
                {error}
              </Typography>
            ) : items.length === 0 ? (
              <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8, gap: 2 }}
              >
                <BookmarkIcon sx={{ color: GOLD, fontSize: "64px", opacity: 0.4 }} />
                <Typography
                  sx={{ color: NAVY, fontSize: "20px", fontWeight: 600, opacity: 0.5, textAlign: "center", fontFamily: "'Inter', sans-serif" }}
                >
                  No saved posts yet
                </Typography>
                <Typography
                  sx={{ color: NAVY, fontSize: "14px", opacity: 0.4, textAlign: "center", fontFamily: "'Inter', sans-serif" }}
                >
                  Save posts or jobs from the Community page and they&apos;ll appear here
                </Typography>
              </Box>
            ) : (
              items.map((item) => (
                //<SavedItemCard key={item.id} item={item} onNavigate={handleNavigate} />
                items.map((item) =>
                  item.type === "job" ? (
                    <JobPostCard
                      key={item.id}
                      postId={item.id}
                      company={item.company}
                      companyName={item.companyName}
                      companyPhoto={item.companyPhoto}
                      companyLocation={item.companyLocation}
                      locationMode={item.locationMode}
                      companyIndustry={item.companyIndustry}
                      jobTitle={item.jobTitle}
                      jobType={item.jobType}
                      jobCategoryId={item.jobCategoryId}
                      jobCategoryName={item.jobCategoryName}
                      jobShortDescription={item.jobShortDescription}
                      jobDescription={item.jobDescription}
                      Img={item.Img}
                      likesCount={item.likesCount}
                      isLikedByMe={item.isLikedByMe}
                      isSavedByMe={item.isSavedByMe}
                    />
                  ) : (
                    <PostCard
                      key={item.id}
                      postId={item.id}
                      author={item.author}
                      role={item.role}
                      subtitle={item.subtitle}
                      content={item.content}
                      authorPhoto={item.authorPhoto}
                      avatarColor={item.avatarColor}
                      likesCount={item.likesCount}
                      isLikedByMe={item.isLikedByMe}
                      isSavedByMe={item.isSavedByMe}
                      profileType="user"
                    />
                  )
                )
              ))
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
