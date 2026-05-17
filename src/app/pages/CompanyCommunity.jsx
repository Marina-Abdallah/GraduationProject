import React, { useState, useMemo, useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchOffIcon from "@mui/icons-material/SearchOff";

// Layout
import { CompanyNavbar } from "../components/CompanyNavbar";
import { Footer } from "../components/Footer";

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
import defaultPhoto from "../../assets/defaultCompanyImg.jpg";


const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

// ─── Initial feed data ────────────────────────────────────────────────────────
const INITIAL_POSTS = [
  {
    id: "post1",
    type: "post",
    author: "Marina Abdallah",
    role: "UI/UX Designer",
    content: "Can anyone help me with the new feature in Figma?",
    avatarColor: LIGHT_BLUE,
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
      'شركه كانت مكلماني علشان اعمل Interviews لمتقدمين علشان كانت محتاجه "Senior" في ال Team بتاعها لان مفيش حد فاضي عندهم في الشركه، فوافقت.\n\nبعمل انترفيو لناس بقالها علي الاقل ٥ سنين في المجال وفيه ناس منهم عندهم خبره آكبر.\n\nالشركه كانت مسؤله عن مشروع ضخم وعليه ترافيك عالي والمشروع كان Distributed system وفيه مشاكل كثير في ال Production.\n\nبعض الآسئله كانت كالآتي:\n- ACID properties and Isolation levels\n- Consistency models\n- CAP theorem and when to use AP or CP\n- FIRST principles of unit testing\n- OOAD and how to design a given use case\n- How to evaluate third-party APIs\n\nبعد كام انترفيو الشركه قررت اني مكملش معاهم لاني بعقد ال Process.\n\nوالنتيجه سيئه.',
  },
];

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
      {/* MS Logo */}
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
function CommunityFeed({ allPosts, highlightedPostId }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(
    () => allPosts.filter((p) => matchesSearch(p, searchQuery)),
    [allPosts, searchQuery]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {/* Search */}
      <CommunitySearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Feed */}
      {filteredPosts.length === 0 ? (
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
        filteredPosts.map((post) =>
          post.type === "job" ? (
            <JobPostCard
              key={post.id}
              postId={post.id}
              company={post.company}
              companyLocation={post.companyLocation}
              jobTitle={post.jobTitle}
              jobType={post.jobType}
              jobCategory={post.jobCategory}
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
              profileType = "company"
            />
          )
        )
      )}
    </Box>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function CompanyCommunityPage() {
  const { toggleCompanySavedPost } = useAppContext();
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
  const [errorOpen, setErrorOpen] = useState(false);

  // Dynamic posts (prepended to feed)
  const [dynamicPosts, setDynamicPosts] = useState([]);

  // Company account flag (true = company browsing, cannot apply)
  const isCompanyAccount = true;

  const allPosts = useMemo(
    () => [...dynamicPosts, ...INITIAL_POSTS],
    [dynamicPosts]
  );

  // Apply Now handler — always opens the overlay; overlay handles the error internally
  const handleApplyNow = () => {
    if (isCompanyAccount) {
      setErrorOpen(true);
    } else {
      setApplyJobOpen(true);
    }
  };

  // New post submitted from WritePostDialog
  const handlePostSubmit = (content, mediaUrl) => {
    const newPost = {
      id: `dyn-post-${Date.now()}`,
      type: "post",
      author: "Microsoft",
      role: "Technology Company",
      content,
      avatarColor: LIGHT_BLUE,
      mediaUrl,
    };
    setDynamicPosts((prev) => [newPost, ...prev]);
  };

  // New job submitted from CreateJobDialog
  const handleJobSubmit = (jobData) => {
    const newJob = {
      id: `dyn-job-${Date.now()}`,
      type: "job",
      company: "Microsoft",
      companyLocation: jobData.city || "Alexandria, Egypt",
      jobTitle: jobData.jobTitle,
      jobType: jobData.locationMode,
      jobDescription: jobData.description || `${jobData.jobTitle} at Microsoft.`,
    };
    setDynamicPosts((prev) => [newJob, ...prev]);
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
              {/* Create bar */}
              <CreateBar
                onWritePost={() => setWritePostOpen(true)}
                onCreateJob={() => setCreateJobOpen(true)}
              />

              {/* Feed with search */}
              <CommunityFeed
                allPosts={allPosts}
                highlightedPostId={highlightedPostId}
              />
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        {/* <Box sx={{ display: "flex", justifyContent: "center", width: "100%", pb: 0 }}>
          <Footer />
        </Box> */}
      </Box>

      {/* ── Dialogs ──────────────────────────────────────────────── */}

      {/* Write Post */}
      <WritePostDialog
        open={writePostOpen}
        onClose={() => setWritePostOpen(false)}
        onSubmit={handlePostSubmit}
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
        onClose={() => setApplyJobOpen(false)}
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