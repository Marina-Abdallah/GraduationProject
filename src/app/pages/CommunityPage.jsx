import React, { useState, useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";

// Layout components
import { MainNavbar } from "../components/MainNavbar";

// Community-specific components
import { CommunityProvider } from "../components/CommunityContext";
import { SidebarProfile } from "../components/SidebarProfile";
import { CommunitySearchBar } from "../components/CommunitySearchBar";
import { CreatePost } from "../components/CreatePost";
import { PostCard } from "../components/PostCard";
import { JobPostCard } from "../components/JobPostCard";
import { FunctionalWritePost } from "../components/FunctionalWritePost";
import { ApplyNowOverlay } from "../components/ApplyNowOverlay";
import backgroundImg from "../../assets/Background.png";

// Global context
import { useAppContext } from "../components/AppContext";

// ─── Posts data ────────────────────────────────────────────────────────────────
const POSTS = [
  {
    id: "post1",
    type: "post",
    author: "Marina Abdallah",
    role: "UI/UX Designer",
    content: "Can anyone help me with the new feature in Figma?",
    avatarColor: "#90baef",
  },
  {
    id: "post3",
    type: "job",
    company: "MicroSoft",
    companyLocation: "Cairo, Egypt",
    jobTitle: "Frontend Developer",
    jobType: "Full time",
    jobDescription:
      "A Full time Frontend Developer at MicroSoft, creating user-friendly web experiences.",
  },
  {
    id: "post2",
    type: "post",
    author: "Ahmed Mamdouh",
    role: "Staff Software Engineer",
    rtl: true,
    avatarColor: "#c8b4e3",
    content:
      'شركه كانت مكلماني علشان اعمل Interviews لمتقدمين علشان كانت محتاجه "Senior" في ال Team بتاعها لان مفيش حد فاضي عندهم في الشركه، فوافقت.\n\nبعمل انترفيو لناس بقالها علي الاقل ٥ سنين في المجال وفيه ناس منهم عندهم خبره آكبر.\n\nالشركه كانت مسؤله عن مشروع ضخم وعليه ترافيك عالي والمشروع كان Distributed system وفيه مشاكل كثير في ال Production.\n\nبعض الآسئله كانت كالآتي:\n- ACID properties and Isolation levels\n- Consistency models\n- CAP theorem and when to use AP or CP\n- FIRST principles of unit testing\n- OOAD and how to design a given use case\n\nبعد كام انترفيو الشركه قررت اني مكملش معاهم لاني بعقد ال Process.\n\nوالنتيجه سيئه.',
  },
];

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

// ─── Inner layout (uses CommunityProvider context) ────────────────────────────
function CommunityFeed({ showWritePost, showApplyNow, onCloseApplyNow, highlightedPostId }) {
    const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = POSTS.filter((p) => matchesSearch(p, searchQuery));
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
        <Box sx={{ display: { xs: "none", lg: "block" },position: "sticky", top: 5, alignSelf: "flex-start"}}>
          <SidebarProfile />
        </Box>

        {/* Right: Feed */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <CommunitySearchBar value={searchQuery} onChange={setSearchQuery} />
          <CreatePost />

          {/* {POSTS.map((post) =>
            post.type === "job" ? (
              <JobPostCard key={post.id} postId={post.id} />
            ) : (
              <PostCard
                key={post.id}
                postId={post.id}
                author={post.author}
                role={post.role}
                content={post.content}
                avatarColor={post.avatarColor}
                rtl={post.rtl || false}
              />
            )
          )} */}
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
            filteredPosts.map((post) =>
              post.type === "job" ? (
                <JobPostCard
                  key={post.id}
                  postId={post.id}
                  company={post.company}
                  companyLocation={post.companyLocation}
                  jobTitle={post.jobTitle}
                  jobType={post.jobType}
                  jobDescription={post.jobDescription}
                  highlighted={highlightedPostId === post.id}
                />
              ) : (
                <PostCard
                  key={post.id}
                  postId={post.id}
                  author={post.author}
                  role={post.role}
                  content={post.content}
                  avatarColor={post.avatarColor}
                  rtl={post.rtl || false}
                  highlighted={highlightedPostId === post.id}
                  profileType = "user"
                />
              )
            )
          )}
        </Box>
      </Box>

      {/* Modals / Overlays */}
      {showWritePost && <FunctionalWritePost />}
      <ApplyNowOverlay open={showApplyNow} onClose={onCloseApplyNow} />
    </>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export function CommunityPage() {
  const [showWritePost, setShowWritePost] = useState(false);
  const [showApplyNow, setShowApplyNow] = useState(false);
  const { toggleUserSavedPost,} = useAppContext();  
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
            pt: 4,
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
            showWritePost={showWritePost}
            showApplyNow={showApplyNow}
            onCloseApplyNow={handleCloseApplyNow}
             highlightedPostId={highlightedPostId}
          />
        </Box>

      </Box>
    </CommunityProvider>
  );
}
