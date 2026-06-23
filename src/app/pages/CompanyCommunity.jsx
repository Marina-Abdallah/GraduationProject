import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import api from "../../api/axios";

// Layout
import { CompanyNavbar } from "../components/CompanyNavbar";

// Community context + shared components
import { CommunityProvider } from "../components/CommunityContext";
import { CommunitySearchBar } from "../components/CommunitySearchBar";
import { PostCard } from "../components/PostCard";
import { JobPostCard } from "../components/JobPostCard";
import { ApplyNowOverlay } from "../components/ApplyNowOverlay";
import { useAppContext } from "../components/AppContext";
import { useLocation } from "react-router-dom";

// Company-specific components
import { CompanySidebar } from "../components/CompanySidebar";
import { WritePostDialog } from "../components/WritePostDialog";
import { CreateJobDialog } from "../components/CreateJobDialog";
import { ErrorDialog } from "../components/ErrorDialog";

import backgroundImg from "../../assets/Background.png";
import defaultPhoto from "../../assets/defaultCompanyImg.png";


const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

const normalizeImageUrl = (url) => {
  if (!url || url === "URL") return null;

  // Remove surrounding quotes if present
  let cleanUrl = url.replace(/^["']|["']$/g, '');

  if (cleanUrl.includes("wwwroot")) {
    const match = cleanUrl.match(/wwwroot(.*)$/);
    if (match) {
      const relativePath = match[1].replace(/\\/g, "/");
      return `https://localhost:7292${relativePath}`;
    }
  }

  if (cleanUrl.includes("uploads")) {
    const match = cleanUrl.match(/(uploads.*)$/);
    if (match) {
      const relativePath = match[1].replace(/\\/g, "/");
      return `https://localhost:7292/${relativePath}`;
    }
  }

  if (cleanUrl.startsWith("/")) {
    return `https://localhost:7292${cleanUrl}`;
  }

  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }

  if (cleanUrl.match(/^[a-zA-Z]:\\/)) {
    return `file:///${cleanUrl.replace(/\\/g, '/')}`;
  }

  return cleanUrl;
};

// ─── Initial feed data ────────────────────────────────────────────────────────
// ─── Search filter ────────────────────────────────────────────────────────────
function matchesSearch(post, query) {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  if (post.type === "job") {
    return (
      (post.company || "").toLowerCase().includes(q) ||
      (post.jobTitle || "").toLowerCase().includes(q) ||
      (post.jobType || "").toLowerCase().includes(q) ||
      (post.companyLocation || "").toLowerCase().includes(q) ||
      (post.jobDescription || "").toLowerCase().includes(q)
    );
  }
  return (
    (post.author || "").toLowerCase().includes(q) ||
    (post.role || "").toLowerCase().includes(q) ||
    (post.content || "").toLowerCase().includes(q)
  );
}

function normalizeFeedItem(item, index = 0) {
  if (!item) return null;

  const type = item.type?.toLowerCase();

  // JOB
  if (type === "job" && item.job) {
    const job = item.job;

    return {
      id: `job-${job.id}-${index}`,
      sourceId: job.id,
      type: "job",

      company: job.companyName,
      companyId: job.companyId,
      companyName: job.companyName,
      companyPhoto: normalizeImageUrl(job.companyPictureUrl),
      companyIndustry: job.companyIndustry || "",

      companyLocation:
        job.cityOffice ||
        job.location,
      locationMode: job.locationMode || job.jobLocationMode || "",

      jobTitle: job.title,
      jobType: job.jobType,
      jobCategoryId: job.jobCategoryId,
      jobCategoryName: job.jobCategoryName,

      jobShortDescription: job.shortDescription,
      jobDescription: job.description,

      Img: normalizeImageUrl(job.bannerImageUrl),

      likesCount: job.likesCount || 0,
      isLikedByMe: job.isLikedByMe || false,
      isSavedByMe: job.isSavedByMe || false,

      createdAt: item.createdAt,
    };
  }

  // POST
  if (type === "post" && item.post) {
    const post = item.post;

    return {
      id: `post-${post.id}-${index}`,
      sourceId: post.id,
      type: "post",

      author: post.authorName,
      authorId: post.authorId,
      authorType: post.authorType,
      role: post.authorSubtitle || post.authorHeadline || post.role || "",
      subtitle: post.authorSubtitle || "",

      content: post.content,
      mediaUrl: normalizeImageUrl(post.postMediaUrl) || null,

      authorPhoto: normalizeImageUrl(post.authorPictureUrl) || null,
      avatarColor: LIGHT_BLUE,

      likesCount: post.likesCount || 0,
      isLikedByMe: post.isLikedByMe || false,
      isSavedByMe: post.isSavedByMe || false,

      createdAt: item.createdAt,
    };
  }

  return null;
}

// ─── Create bar: "Write a post" + "Post a new job" ────────────────────────────
function CreateBar({ onWritePost, onCreateJob }) {
  const { company } = useAppContext();

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "16px",
        p: "12px 16px",
        boxShadow: "0px 4px 16px rgba(132,251,162,0.3)",
        border: "1px solid rgba(132,251,162,0.2)",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Campany Logo */}
      <Avatar
        src={company.photo || defaultPhoto}
        alt={company.name}
        sx={{
          width: 44,
          height: 44,
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

      {/* Write a post pill */}
      <Box
        onClick={onWritePost}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: `1.5px solid rgba(19,32,109,0.14)`,
          borderRadius: "40px",
          px: 2.5,
          py: 1,
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": {
            borderColor: GREEN,
            boxShadow: "0 2px 10px rgba(132,251,162,0.3)",
            bgcolor: "rgba(132,251,162,0.04)",
          },
        }}
      >
        <Typography
          sx={{
            color: `${NAVY}70`,
            fontSize: 15,
            fontFamily: "'Inter', sans-serif",
            userSelect: "none",
          }}
        >
          Write a post
        </Typography>
        <AddCircleOutlineIcon sx={{ color: GREEN, fontSize: 22, flexShrink: 0 }} />
      </Box>

      {/* Post a new job pill */}
      <Box
        onClick={onCreateJob}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: `1.5px solid rgba(19,32,109,0.14)`,
          borderRadius: "40px",
          px: 2.5,
          py: 1,
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": {
            borderColor: GREEN,
            boxShadow: "0 2px 10px rgba(132,251,162,0.3)",
            bgcolor: "rgba(132,251,162,0.04)",
          },
        }}
      >
        <Typography
          sx={{
            color: `${NAVY}70`,
            fontSize: 15,
            fontFamily: "'Inter', sans-serif",
            userSelect: "none",
          }}
        >
          Post a new job
        </Typography>
        <AddCircleOutlineIcon sx={{ color: GREEN, fontSize: 22, flexShrink: 0 }} />
      </Box>
    </Box>
  );
}

// ─── Inner feed (needs CommunityProvider context) ────────────────────────────
function CommunityFeed({ posts, highlightedPostId }) {


  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>


      {/* Feed */}
      {posts.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: NAVY,
            opacity: 0.5,
          }}
        >
          <SearchOffIcon sx={{ fontSize: 48, mb: 1 }} />
          <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: 16 }}>
            No posts match your search.
          </Typography>
        </Box>
      ) : (
        posts.map((post) =>
          post.type === "job" ? (
            <JobPostCard
              key={post.id}
              postId={post.id}
              jobId={post.sourceId}
              companyId={post.companyId}
              company={post.company}
              companyName={post.companyName}
              companyPhoto={post.companyPhoto}
              companyLocation={post.companyLocation}
              locationMode={post.locationMode}
              companyIndustry={post.companyIndustry}
              jobTitle={post.jobTitle}
              jobType={post.jobType}
              jobCategoryId={post.jobCategoryId}
              jobCategoryName={post.jobCategoryName}
              jobShortDescription={post.jobShortDescription}
              jobDescription={post.jobDescription}
              Img={post.Img}
              likesCount={post.likesCount}
              isFollowedByMe={post.isFollowedByMe}
              isLikedByMe={post.isLikedByMe}
              isSavedByMe={post.isSavedByMe}
              highlighted={highlightedPostId === post.id || highlightedPostId === `job-${post.sourceId}`}
            />
          ) : (
            <PostCard
              key={post.id}
              postId={post.sourceId}
              author={post.author}
              authorId={post.authorId}
              authorType={post.authorType}
              role={post.role}
              subtitle={post.subtitle}
              content={post.content}
              mediaUrl={post.mediaUrl}
              authorPhoto={post.authorPhoto}
              avatarColor={post.avatarColor}
              rtl={post.rtl || false}
              likesCount={post.likesCount}
              isLikedByMe={post.isLikedByMe}
              isFollowedByMe={post.isFollowedByMe}
              isSavedByMe={post.isSavedByMe}
              highlighted={highlightedPostId === post.id || highlightedPostId === `post-${post.sourceId}`}
              profileType="company"
            />
          )
        )
      )}
    </Box>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function CompanyCommunityPage() {
  const { toggleCompanySavedPost, company } = useAppContext();
  const location = useLocation();


  const [highlightedPostId, setHighlightedPostId] = useState(
    location.state?.highlightPostId || null
  );

  useEffect(() => {
    const id = location.state?.highlightPostId;

    if (id) {
      setHighlightedPostId(id);

      window.history.replaceState({}, "");

      const timer = setTimeout(() => {
        setHighlightedPostId(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state?.highlightPostId]);
  // Dialog states
  const [writePostOpen, setWritePostOpen] = useState(false);
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [applyJobOpen, setApplyJobOpen] = useState(false);
  const [applyJobId, setApplyJobId] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic posts (prepended to feed)
  const [dynamicPosts, setDynamicPosts] = useState([]);

  // Company account flag (true = company browsing, cannot apply)
  const isCompanyAccount = true;

  // Pagination & Fetch States
  const [feedItems, setFeedItems] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePageChange = useCallback((event, value) => setPage(value), []);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/Community/feed", {
        params: { page, pageSize },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const data = response.data;
      const items = Array.isArray(data)
        ? data
        : data?.items || data?.feed || data?.data || [];

      const normalizedItems = Array.isArray(items)
        ? items.map((item, index) => normalizeFeedItem(item, index)).filter(Boolean)
        : [];

      setFeedItems(normalizedItems);

      if (typeof data?.totalPages === "number") {
        setPageCount(data.totalPages);
      } else if (typeof data?.totalCount === "number") {
        setPageCount(Math.max(1, Math.ceil(data.totalCount / pageSize)));
      } else if (Array.isArray(data)) {
        setPageCount(Math.max(1, Math.ceil(data.length / pageSize)));
      }
    } catch (fetchError) {
      console.error("Community feed request failed:", fetchError);
      const responseData = fetchError.response?.data;
      const errorMessage =
        responseData?.message ||
        responseData?.title ||
        (typeof responseData === "string" ? responseData : JSON.stringify(responseData)) ||
        fetchError.message ||
        "Unable to load community feed.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const refreshFeed = useCallback(() => {
    if (page === 1) {
      loadFeed();
    } else {
      setPage(1);
    }
  }, [page, loadFeed]);

  const allPosts = useMemo(
    () => [...dynamicPosts, ...feedItems],
    [dynamicPosts, feedItems]
  );

  const filteredPosts = useMemo(
    () => allPosts.filter((p) => matchesSearch(p, searchQuery)),
    [allPosts, searchQuery]
  );

  // Apply Now handler — always opens the overlay; overlay handles the error internally
  const handleApplyNow = (jobId) => {
    if (isCompanyAccount) {
      setErrorOpen(true);
    } else {
      setApplyJobId(jobId);
      setApplyJobOpen(true);
    }
  };

  // New post submitted from WritePostDialog

  const handlePostSubmit = async (content, mediaFile) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("content", content);

      if (mediaFile) {
        formData.append("mediaFile", mediaFile);
      }

      await api.post("/Posts", formData, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      });

      setWritePostOpen(false);
      refreshFeed();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // New job submitted from CreateJobDialog — receives the API response object
  const handleJobSubmit = (apiJob) => {
    if (!apiJob) {
      // No response body — just reload the feed
      refreshFeed();
      return;
    }

    // jobCategoryName: prefer what the server returns, fall back to the
    // category name the user selected in the form (_formCategory)
    const resolvedCategoryName =
      apiJob.jobCategoryName ||
      apiJob._formCategory ||
      "";

    // companyIndustry is never returned by POST /Jobs — use the company
    // context which was loaded when the company logged in
    const resolvedIndustry =
      apiJob.companyIndustry ||
      company.industry ||
      "";

    // Normalise the API response into the same shape used by normalizeFeedItem
    const newJob = {
      id: `dyn-job-${apiJob.id ?? Date.now()}`,
      sourceId: apiJob.id,
      type: "job",

      company: apiJob.companyName || company.name || "[COMPANY NAME]",
      companyName: apiJob.companyName || company.name || "[COMPANY NAME]",
      companyPhoto: normalizeImageUrl(apiJob.companyPictureUrl) || company.photo || null,
      companyIndustry: resolvedIndustry,

      companyLocation: apiJob.cityOffice || company.location || "[LOCATION]",
      locationMode: apiJob.locationMode || "",

      jobTitle: apiJob.title,
      jobType: apiJob.jobType,
      jobCategoryId: apiJob.jobCategoryId,
      jobCategoryName: resolvedCategoryName,

      jobShortDescription: apiJob.shortDescription || "",

      Img: normalizeImageUrl(apiJob.bannerImageUrl),

      likesCount: apiJob.likesCount || 0,
      isLikedByMe: false,
      isSavedByMe: false,

      createdAt: apiJob.createdAt || new Date().toISOString(),
    };

    setDynamicPosts((prev) => [newJob, ...prev]);
    // Also refresh the feed in the background so pagination stays accurate
    refreshFeed();
  };

  return (
    <CommunityProvider
      onWritePostOpen={() => setWritePostOpen(true)}
      onCloseWritePost={() => setWritePostOpen(false)}
      onOpenComments={() => { }}
      onApplyNow={handleApplyNow}
      onCloseApplyNow={() => setApplyJobOpen(false)}
      onSaveGlobal={toggleCompanySavedPost}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `url(${backgroundImg})`,
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      >
        {/* Navbar */}
        <Box
          sx={{
            width: "100%",
            pt: 3,
            px: { xs: 2, md: 4 },
            position: "relative",
            zIndex: 20,
          }}
        >
          <CompanyNavbar />
        </Box>

        {/* Page content */}
        <Box sx={{ width: "100%", flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              px: { xs: 2, md: 4 },
              mt: 3,
              maxWidth: 1200,
              mx: "auto",
              width: "100%",
              alignItems: "flex-start",
              pb: 6,
            }}
          >
            {/* LEFT: Company sidebar */}
            <Box sx={{ display: { xs: "none", lg: "block" }, position: "sticky", top: 10, alignSelf: "flex-start" }}>
              <CompanySidebar />
            </Box>

            {/* RIGHT: Create bar + Feed */}
            <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Search */}
              <CommunitySearchBar
                value={searchQuery}
                onChange={setSearchQuery}
              />

              {/* Create bar */}
              <CreateBar
                onWritePost={() => setWritePostOpen(true)}
                onCreateJob={() => setCreateJobOpen(true)}
              />

              {/* Feed with search */}
              <CommunityFeed
                posts={filteredPosts}
                highlightedPostId={highlightedPostId}
              />

              {error && (
                <Box sx={{ px: { xs: 2, md: 4 }, mt: 2 }}>
                  <Typography sx={{ color: "#C32929", textAlign: "center" }}>
                    {error}
                  </Typography>
                </Box>
              )}

              <Stack spacing={2} sx={{ width: "100%", py: 3, px: { xs: 2, md: 4 } }}>
                <Pagination
                  sx={{ color: "#84fba2", display: "flex", justifyContent: "center" }}
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </Box>
          </Box>
        </Box>

      </Box>

      {/* ── Dialogs ──────────────────────────────────────────────── */}

      {/* Write Post */}
      <WritePostDialog
        open={writePostOpen}
        onClose={() => setWritePostOpen(false)}
        onSubmit={handlePostSubmit}
        profileType="company"
      />

      {/* Create Job */}
      <CreateJobDialog
        open={createJobOpen}
        onClose={() => setCreateJobOpen(false)}
        onSubmit={handleJobSubmit}
      />

      {/* Apply Now — passes isCompanyAccount so overlay shows error on submit */}
      <ApplyNowOverlay
        isCompanyAccount={isCompanyAccount}
        open={applyJobOpen}
        onClose={() => { setApplyJobOpen(false); setApplyJobId(null); }}
        jobId={applyJobId}
      />

      {/* Error: company cannot apply */}
      <ErrorDialog
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        message="You cannot apply for jobs as a company account."
      />
    </CommunityProvider>
  );
}