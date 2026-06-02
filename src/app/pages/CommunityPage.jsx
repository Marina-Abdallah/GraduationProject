import React, { useState, useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import api from "../../api/axios";

// Layout components
import { MainNavbar } from "../components/MainNavbar";

// Community-specific components
import { CommunityProvider } from "../components/CommunityContext";
import { SidebarProfile } from "../components/SidebarProfile";
import { CommunitySearchBar } from "../components/CommunitySearchBar";
import { CreatePost } from "../components/CreatePost";
import { PostCard } from "../components/PostCard";
import { JobPostCard } from "../components/JobPostCard";
import { WritePostDialog } from "../components/WritePostDialog";
import { ApplyNowOverlay } from "../components/ApplyNowOverlay";
import backgroundImg from "../../assets/Background.png";
import defaultPhoto from "../../assets/defaultImg.png";


// Global context
import { useAppContext } from "../components/AppContext";

const LIGHT_BLUE = "#90baef";
const normalizeImageUrl = (url) => {
  if (!url || url === "URL") return null;

  if (url.startsWith("file://")) {
    return null;
  }

  if (url.includes("wwwroot")) {
    const match = url.match(/wwwroot(.*)$/);
    if (match) {
      const relativePath = match[1].replace(/\\/g, "/");
      return `https://localhost:7292${relativePath}`;
    }
    return null;
  }

  // Handle local upload paths that may not include a leading slash
  if (url.includes("uploads")) {
    const normalized = url.replace(/\\/g, "/");
    return normalized.startsWith("/") ? `https://localhost:7292${normalized}` : `https://localhost:7292/${normalized}`;
  }

  if (url.startsWith("/")) {
    return `https://localhost:7292${url}`;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return null;
};
// ─── Search matching logic ────────────────────────────────────────────────────
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
      companyName: job.companyName,
      companyPhoto: normalizeImageUrl(job.companyPictureUrl),

      companyLocation:
        job.locationMode ||
        job.cityOffice ||
        job.location,

      jobTitle: job.title,
      jobType: job.jobType,

      jobShortDescription: job.shortDescription,
      jobDescription: job.description,

      Img: normalizeImageUrl(job.bannerImageUrl),

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
      role: post.authorHeadline || post.role || "",

      content: post.content,

      authorPhoto: post.authorPhoto || null,
      avatarColor: LIGHT_BLUE,

      createdAt: item.createdAt,
    };
  }

  return null;
}
// ─── Inner layout (uses CommunityProvider context) ────────────────────────────

function CommunityFeed({ feedItems = [], showWritePost, onCloseWritePost, showApplyNow, onCloseApplyNow, highlightedPostId, loading = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dynamicPosts, setDynamicPosts] = useState([]);
  const [authorProfiles, setAuthorProfiles] = useState({});
  const { profile } = useAppContext();

  const normalizeAuthorData = (data) => {
    if (!data) return null;
    const payload = data.data || data.result || data.profile || data.user || data;
    const headline =
      payload.headline ||
      payload.role ||
      payload.major ||
      payload.profession ||
      payload.jobTitle ||
      payload.title ||
      "";
    const photo = normalizeImageUrl(
      payload.pictureUrl ||
      payload.PictureUrl ||
      payload.photo ||
      payload.avatarUrl ||
      payload.profilePictureUrl ||
      payload.imageUrl ||
      payload.profilePic ||
      null
    );
    return {
      headline,
      photo,
    };
  };

  const fetchUserPhoto = useCallback(async (authorId, headers) => {
    try {
      const photoResponse = await api.get(`/Users/${authorId}/photo`, {
        headers,
        responseType: "blob",
      });
      if (photoResponse.data) {
        return URL.createObjectURL(photoResponse.data);
      }
    } catch (error) {
      console.warn(`Unable to resolve photo for user ${authorId}:`, error);
    }
    return null;
  }, []);

  const fetchAuthorProfile = useCallback(async (authorId, authorType) => {
    if (!authorId || authorProfiles[authorId]) return;

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      let response;

      if (authorType?.toLowerCase().includes("company")) {
        response = await api.get(`/Companies/${authorId}/overview`, { headers });
      } else {
        const userEndpoints = [
          `/Users/${authorId}/profile`,
          `/Users/${authorId}/overview`,
          `/Users/${authorId}`,
        ];

        for (const endpoint of userEndpoints) {
          try {
            response = await api.get(endpoint, { headers });
            break;
          } catch (endpointError) {
            if (endpointError.response?.status !== 404) {
              throw endpointError;
            }
          }
        }
      }

      if (!response?.data) {
        const blobPhoto = await fetchUserPhoto(authorId, headers);
        if (blobPhoto) {
          setAuthorProfiles((prev) => ({
            ...prev,
            [authorId]: { headline: "", photo: blobPhoto },
          }));
        }
        return;
      }

      const normalized = normalizeAuthorData(response.data);
      const finalProfile = {
        ...normalized,
      };

      if (!finalProfile.photo) {
        const blobPhoto = await fetchUserPhoto(authorId, headers);
        if (blobPhoto) {
          finalProfile.photo = blobPhoto;
        }
      }

      if (!finalProfile.headline && response.data?.firstName && response.data?.lastName) {
        finalProfile.headline = `${response.data.firstName} ${response.data.lastName}`;
      }

      if (!finalProfile.headline && response.data?.name) {
        finalProfile.headline = response.data.name;
      }

      if (normalized) {
        setAuthorProfiles((prev) => ({
          ...prev,
          [authorId]: finalProfile,
        }));
      }
    } catch (error) {
      console.warn(`Unable to resolve author profile for ${authorId}:`, error);
    }
  }, [authorProfiles, fetchUserPhoto]);

  const handlePostSubmit = (content, mediaUrl) => {
    const newPost = {
      id:
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `dyn-post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: "post",
      author: profile.name,
      role: profile.headline,
      content,
      authorPhoto: profile.photo,
      avatarColor: LIGHT_BLUE,
      mediaUrl,
    };
    setDynamicPosts((prev) => [newPost, ...prev]);
  };

  const allPosts = [...dynamicPosts, ...feedItems];

  useEffect(() => {
    const pending = [];
    const seen = new Set();

    allPosts.forEach((post) => {
      if (post.type === "post" && post.authorId && !authorProfiles[post.authorId] && !seen.has(post.authorId)) {
        seen.add(post.authorId);
        pending.push({ id: post.authorId, type: post.authorType });
      }
    });

    pending.forEach(({ id, type }) => {
      fetchAuthorProfile(id, type);
    });
  }, [allPosts, authorProfiles, fetchAuthorProfile]);

  const filteredPosts = allPosts.filter((p) =>
    matchesSearch(p, searchQuery)
  );

  const resolvedPosts = filteredPosts.map((post) => {
    if (post.type !== "post" || !post.authorId) return post;
    const profileInfo = authorProfiles[post.authorId] || {};
    return {
      ...post,
      role: profileInfo.headline || post.role || "",
      authorPhoto: profileInfo.photo || post.authorPhoto || defaultPhoto,
    };
  });

  return (
    <>
      {/* Two-column layout */}
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
        {/* Left: Sidebar (position: "sticky", top: 5, alignSelf: "flex-start" )*/}
        <Box sx={{ display: { xs: "none", lg: "block" }, position: "sticky", top: 5, alignSelf: "flex-start" }}>
          <SidebarProfile />
        </Box>

        {/* Right: Feed */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <CommunitySearchBar value={searchQuery} onChange={setSearchQuery} />
          <CreatePost />
          {filteredPosts.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                py: 8,
                bgcolor: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(19,32,109,0.06)",
              }}
            >
              <SearchOffIcon sx={{ fontSize: 56, color: "#13206d", opacity: 0.25 }} />
              <Typography
                sx={{
                  color: "#13206d",
                  fontSize: 18,
                  fontWeight: 600,
                  opacity: 0.5,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                No posts match "{searchQuery}"
              </Typography>
              <Typography
                sx={{
                  color: "#13206d",
                  fontSize: 14,
                  opacity: 0.35,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Try searching by name, role, company, or keywords
              </Typography>
            </Box>
          ) : (
            resolvedPosts.map((post) =>
              post.type === "job" ? (
                <JobPostCard
                  key={post.id}
                  postId={post.id}
                  company={post.company}
                  companyName={post.companyName}
                  companyPhoto={post.companyPhoto}
                  companyLocation={post.companyLocation}
                  jobTitle={post.jobTitle}
                  jobType={post.jobType}
                  jobCategory={post.jobCategory}
                  jobShortDescription={post.jobShortDescription}
                  jobDescription={post.jobDescription}
                  Img={post.Img}
                  highlighted={highlightedPostId === post.id}
                />
              ) : (
                <PostCard
                  key={post.id}
                  postId={post.id}
                  author={post.author}
                  role={post.role}
                  content={post.content}
                  authorPhoto={post.authorPhoto}
                  avatarColor={post.avatarColor}
                  rtl={post.rtl || false}
                  highlighted={highlightedPostId === post.id}
                  profileType="user"
                />
              )
            )
          )}
        </Box>
      </Box>

      {/* Modals / Overlays */}
      {<WritePostDialog
        open={showWritePost}
        onClose={onCloseWritePost}
        onSubmit={handlePostSubmit}
        profileType="user"
      />}
      <ApplyNowOverlay open={showApplyNow} onClose={onCloseApplyNow} />
    </>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export function CommunityPage() {
  const [showWritePost, setShowWritePost] = useState(false);
  const [showApplyNow, setShowApplyNow] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toggleUserSavedPost, } = useAppContext();
  const location = useLocation();

  // Read highlight target from router state (set by SavedPostsModal)
  const [highlightedPostId, setHighlightedPostId] = useState(
    location.state?.highlightPostId || null
  );

  useEffect(() => {
    const id = location.state?.highlightPostId;
    if (id) {
      setHighlightedPostId(id);
      // Clear router state so back-navigation doesn't re-trigger highlight
      window.history.replaceState({}, "");
      // Auto-fade the highlight after 3 s
      const timer = setTimeout(() => setHighlightedPostId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.highlightPostId]);

  const handleOpenWritePost = useCallback(() => setShowWritePost(true), []);
  const handleCloseWritePost = useCallback(() => setShowWritePost(false), []);
  const handleOpenApplyNow = useCallback(() => setShowApplyNow(true), []);
  const handleCloseApplyNow = useCallback(() => setShowApplyNow(false), []);
  const handlePageChange = useCallback((event, value) => setPage(value), []);

  useEffect(() => {
    const loadFeed = async () => {
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
    };

    loadFeed();
  }, [page, pageSize]);

  return (
    <CommunityProvider
      onWritePostOpen={handleOpenWritePost}
      onCloseWritePost={handleCloseWritePost}
      onOpenComments={() => { }}
      onApplyNow={handleOpenApplyNow}
      onCloseApplyNow={handleCloseApplyNow}
      onSaveGlobal={toggleUserSavedPost}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `url(${backgroundImg})`,
          backgroundSize: "cover",
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
          <MainNavbar />
        </Box>

        {/* Feed */}
        <Box sx={{ width: "100%", flex: 1 }}>
          <CommunityFeed
            feedItems={feedItems}
            loading={loading}
            showWritePost={showWritePost}
            onCloseWritePost={handleCloseWritePost}
            showApplyNow={showApplyNow}
            onCloseApplyNow={handleCloseApplyNow}
            highlightedPostId={highlightedPostId}
          />

          {error ? (
            <Box sx={{ px: { xs: 2, md: 4 }, mt: 2 }}>
              <Typography sx={{ color: "#C32929", textAlign: "center" }}>
                {error}
              </Typography>
            </Box>
          ) : null}

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
    </CommunityProvider>
  );
}
