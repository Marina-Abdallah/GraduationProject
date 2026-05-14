import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import defaultPhoto from "../../assets/defaultImg.png";

// function MiniProfileSidebar({ profile, skills }) {
//   return (
//     <Box
//       sx={{
//         width: { xs: "100%", sm: 260 },
//         flexShrink: 0,
//         bgcolor: "#fafafa",
//         borderRadius: "16px",
//         p: "24px 20px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 2,
//         boxShadow: "0px 4px 16px rgba(132,251,162,0.3)",
//       }}
//     >
//       {/* Avatar */}
//       <Box
//         sx={{
//           width: 110,
//           height: 110,
//           borderRadius: "50%",
//           overflow: "hidden",
//           border: "3px solid #84fba2",
//           boxShadow: "0px 4px 8px rgba(132,251,162,0.4)",
//         }}
//       >
//         <img
//           src={profile.photo || defaultPhoto}
//           alt="Profile"
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />
//       </Box>

//       {/* Name + details */}
//       <Box sx={{ textAlign: "center" }}>
//         <Typography sx={{ color: "#13206d", fontSize: "18px", fontWeight: 700 }}>
//           {profile.name}
//         </Typography>
//         <Typography sx={{ color: "#13206d", fontSize: "13px", opacity: 0.6 }}>
//           Alexandria, Egypt
//         </Typography>
//         <Typography sx={{ color: "#13206d", fontSize: "14px", fontWeight: 500, mt: 0.5 }}>
//           {profile.headline}
//         </Typography>
//         <Typography sx={{ color: "#13206d", fontSize: "12px", opacity: 0.6, mt: 0.5, lineHeight: 1.4 }}>
//           Student in software industry and multimedia,
//           <br />
//           faculty of science, Alexandria University
//         </Typography>
//       </Box>

//       {/* Stats */}
//       <Box sx={{ display: "flex", gap: 2, width: "100%", justifyContent: "center" }}>
//         {[
//           { label: "Posts", value: 20 },
//           { label: "Followers", value: 100 },
//           { label: "Following", value: 250 },
//         ].map((s) => (
//           <Box key={s.label} sx={{ textAlign: "center" }}>
//             <Typography sx={{ color: "#13206d", fontSize: "16px", fontWeight: 700 }}>
//               {s.value}
//             </Typography>
//             <Typography sx={{ color: "#13206d", fontSize: "12px", opacity: 0.6 }}>
//               {s.label}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       <Divider sx={{ width: "100%", borderColor: "rgba(19,32,109,0.1)" }} />

//       {/* Career Meter */}
//       <Box sx={{ width: "100%" }}>
//         <Typography sx={{ color: "#13206d", fontSize: "13px", fontWeight: 600, mb: 0.5 }}>
//           Career Meter
//         </Typography>
//         <Typography sx={{ color: "#84fba2", fontSize: "12px", fontWeight: 700, mb: 0.5 }}>
//           25% and Rising
//         </Typography>
//         <LinearProgress
//           variant="determinate"
//           value={25}
//           sx={{
//             height: 6,
//             borderRadius: 3,
//             bgcolor: "rgba(19,32,109,0.1)",
//             "& .MuiLinearProgress-bar": { bgcolor: "#84fba2", borderRadius: 3 },
//           }}
//         />
//       </Box>

//       {/* Career Stats */}
//       <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0.5 }}>
//         {[
//           { icon: "📋", label: "CV Score:", value: `${profile.resumeScore || 85}%`, extra: "Updated 1 month ago" },
//           { icon: "🎓", label: "Completed Courses:", value: "5" },
//           { icon: "🚀", label: "Projects:", value: "2" },
//           { icon: "🏆", label: "Certifications:", value: "2" },
//           { icon: "🎯", label: "Current Goal:", value: "" },
//         ].map((item) => (
//           <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Typography sx={{ fontSize: "13px" }}>{item.icon}</Typography>
//             <Typography sx={{ color: "#13206d", fontSize: "12px", fontWeight: 600, flexShrink: 0 }}>
//               {item.label}
//             </Typography>
//             <Typography sx={{ color: "#13206d", fontSize: "12px", opacity: 0.75 }}>
//               {item.value}
//             </Typography>
//             {item.extra && (
//               <Typography sx={{ color: "#13206d", fontSize: "10px", opacity: 0.5, ml: "auto" }}>
//                 {item.extra}
//               </Typography>
//             )}
//           </Box>
//         ))}
//         <Typography sx={{ color: "#13206d", fontSize: "12px", opacity: 0.6, pl: "22px" }}>
//           Finish ITI .NET Course
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

function SavedPostCard({ post, onNavigateToPost }) {
  return (
    <Tooltip title="Click to view this post in Community" placement="top" arrow>
      <Box
        onClick={() => onNavigateToPost(post.id)}
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
            boxShadow: "0 0 0 2px #84fba2, 0px 4px 20px rgba(132,251,162,0.35)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {/* Author row */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(to bottom, #84fba2, #90baef)",
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography sx={{ color: "#13206d", fontSize: "16px", fontWeight: 600 }}>
                {post.author}
              </Typography>
              <Typography sx={{ color: "#13206d", fontSize: "13px", opacity: 0.7 }}>
                {post.role}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BookmarkIcon sx={{ color: "#FBBC04", fontSize: "24px" }} />
            <OpenInNewIcon sx={{ color: "#13206d", fontSize: "16px", opacity: 0.35 }} />
          </Box>
        </Box>

        {/* Content */}
        <Typography
          sx={{
            color: "#13206d",
            fontSize: "15px",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          dir="auto"
        >
          {post.content}
        </Typography>

        <Divider sx={{ borderColor: "rgba(19,32,109,0.1)" }} />

        {/* Footer */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography sx={{ color: "#90baef", fontSize: "13px", fontWeight: 500 }}>
            Tap to jump to this post →
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <FavoriteIcon sx={{ color: "#C32929", fontSize: "18px" }} />
            <Typography sx={{ color: "#13206d", fontSize: "14px" }}>{post.likes}</Typography>
          </Box>
        </Box>
      </Box>
    </Tooltip>
  );
}

export function SavedPostsModal({ open, onClose, profileType = "user", }) {
  const { profile, skills, userSavedPosts, companySavedPosts, } = useAppContext();
  const navigate = useNavigate();

  const savedPosts = profileType === "company" ? companySavedPosts : userSavedPosts;

  // Navigate to community and highlight the chosen post
  const handleNavigateToPost = (postId) => {
    onClose();

    const targetRoute =
      profileType === "company"
        ? "/CompanyCommunity"
        : "/Community";

    navigate(targetRoute, {
      state: { highlightPostId: postId },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          maxHeight: "90vh",
        },
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
              color: "#13206d",
              textTransform: "none",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              bgcolor: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(132,251,162,0.5)",
              borderRadius: "8px",
              px: 2,
              "&:hover": { bgcolor: "#84fba2", color: "#13206d" },
            }}
          >
            Back to Profile
          </Button>
          <Typography
            sx={{
              color: "#13206d",
              fontSize: "20px",
              fontWeight: 700,
              ml: 3,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Saved Posts
          </Typography>
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
          {/* Left Sidebar */}
          {/* <MiniProfileSidebar profile={profile} skills={skills} /> */}

          {/* Posts Area */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            {savedPosts.length === 0 ? (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  py: 8,
                }}
              >
                <BookmarkIcon sx={{ color: "#FBBC04", fontSize: "64px", opacity: 0.4 }} />
                <Typography
                  sx={{
                    color: "#13206d",
                    fontSize: "20px",
                    fontWeight: 600,
                    opacity: 0.5,
                    textAlign: "center",
                  }}
                >
                  No saved posts yet
                </Typography>
                <Typography
                  sx={{
                    color: "#13206d",
                    fontSize: "14px",
                    opacity: 0.4,
                    textAlign: "center",
                  }}
                >
                  Save posts from the Community page and they'll appear here
                </Typography>
              </Box>
            ) : (
              savedPosts.map((post) => (
                <SavedPostCard
                  key={post.id}
                  post={post}
                  onNavigateToPost={handleNavigateToPost}
                />
              ))
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// function SavedPostCard({ post }) {
//   return (
//     <Box
//       sx={{
//         bgcolor: "white",
//         borderRadius: "16px",
//         p: "16px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "12px",
//         boxShadow: "0px 2px 12px rgba(19,32,109,0.07)",
//         border: "1px solid rgba(132,251,162,0.3)",
//       }}
//     >
//       {/* Author row */}
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <Box
//             sx={{
//               width: 48,
//               height: 48,
//               borderRadius: "50%",
//               background: "linear-gradient(to bottom, #84fba2, #90baef)",
//               flexShrink: 0,
//             }}
//           />
//           <Box>
//             <Typography sx={{ color: "#13206d", fontSize: "16px", fontWeight: 600 }}>
//               {post.author}
//             </Typography>
//             <Typography sx={{ color: "#13206d", fontSize: "13px", opacity: 0.7 }}>
//               {post.role}
//             </Typography>
//           </Box>
//         </Box>
//         <BookmarkIcon sx={{ color: "#FBBC04", fontSize: "28px" }} />
//       </Box>

//       {/* Content */}
//       <Typography
//         sx={{
//           color: "#13206d",
//           fontSize: "15px",
//           lineHeight: 1.6,
//           display: "-webkit-box",
//           WebkitLineClamp: 3,
//           WebkitBoxOrient: "vertical",
//           overflow: "hidden",
//         }}
//         dir="auto"
//       >
//         {post.content}
//       </Typography>

//       <Divider sx={{ borderColor: "rgba(19,32,109,0.1)" }} />

//       {/* Footer */}
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Typography sx={{ color: "#90baef", fontSize: "14px", fontWeight: 500 }}>
//           Write a comment on this post
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
//           <FavoriteIcon sx={{ color: "#C32929", fontSize: "20px" }} />
//           <Typography sx={{ color: "#13206d", fontSize: "14px" }}>{post.likes}</Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export function SavedPostsModal({ open, onClose }) {
//   const { profile, skills, savedPosts } = useAppContext();

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="lg"
//       PaperProps={{
//         sx: {
//           borderRadius: "16px",
//           overflow: "hidden",
//           maxHeight: "90vh",
//         },
//       }}
//     >
//       <DialogContent sx={{ p: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
//         {/* Top bar */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             px: 3,
//             py: 2,
//             borderBottom: "1px solid rgba(19,32,109,0.1)",
//             bgcolor: "#fafafa",
//             flexShrink: 0,
//           }}
//         >
//           <Button
//             onClick={onClose}
//             startIcon={<ArrowBackIcon />}
//             sx={{
//               color: "#13206d",
//               textTransform: "none",
//               fontWeight: 500,
//               fontFamily: "'Inter', sans-serif",
//               bgcolor: "rgba(255,255,255,0.8)",
//               border: "1px solid rgba(132,251,162,0.5)",
//               borderRadius: "8px",
//               px: 2,
//               "&:hover": { bgcolor: "#84fba2", color: "#13206d" },
//             }}
//           >
//             Back to Profile
//           </Button>
//           <Typography
//             sx={{
//               color: "#13206d",
//               fontSize: "20px",
//               fontWeight: 700,
//               ml: 3,
//               fontFamily: "'Inter', sans-serif",
//             }}
//           >
//             Saved Posts
//           </Typography>
//         </Box>

//         {/* Body */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 3,
//             p: 3,
//             overflow: "auto",
//             flex: 1,
//             bgcolor: "rgba(144,186,239,0.08)",
//           }}
//         >
//           {/* Left Sidebar */}
//          {/* <MiniProfileSidebar profile={profile} skills={skills} /> */}

//           {/* Posts Area */}
//           <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
//             {savedPosts.length === 0 ? (
//               <Box
//                 sx={{
//                   flex: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: 2,
//                   py: 8,
//                 }}
//               >
//                 <BookmarkIcon sx={{ color: "#FBBC04", fontSize: "64px", opacity: 0.4 }} />
//                 <Typography
//                   sx={{
//                     color: "#13206d",
//                     fontSize: "20px",
//                     fontWeight: 600,
//                     opacity: 0.5,
//                     textAlign: "center",
//                   }}
//                 >
//                   No saved posts yet
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "#13206d",
//                     fontSize: "14px",
//                     opacity: 0.4,
//                     textAlign: "center",
//                   }}
//                 >
//                   Save posts from the Community page and they'll appear here
//                 </Typography>
//               </Box>
//             ) : (
//               savedPosts.map((post) => (
//                 <SavedPostCard key={post.id} post={post} />
//               ))
//             )}
//           </Box>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// }
