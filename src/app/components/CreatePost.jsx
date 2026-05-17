import React from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useCommunity } from "./CommunityContext";
import { useAppContext } from "../components/AppContext";
import defaultPhoto from "../../assets/defaultImg.png";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

export function CreatePost() {
  const { onWritePost } = useCommunity();
  const { profile } = useAppContext();

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "16px",
        p: "12px 16px",
        boxShadow: "0px 8px 16px rgba(132,251,162,0.35)",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0px 8px 24px rgba(132,251,162,0.55)",
        },
      }}
    >
      {/* Top row */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
        onClick={onWritePost}
      >
        <Avatar
          src={profile.photo || defaultPhoto}
          alt={profile.name}
          sx={{
            width: 52,
            height: 52,
            border: `2px solid ${GREEN}`,
            flexShrink: 0,
          }}
        />
        <Box
          sx={{
            flex: 1,
            border: `1.5px solid ${GREEN}`,
            borderRadius: "40px",
            px: 3,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: `${NAVY}60`,
              fontSize: 16,
              fontFamily: "'Inter', sans-serif",
              userSelect: "none",
            }}
          >
            Write a post…
          </Typography>
          <AddCircleOutlineIcon sx={{ color: GREEN, fontSize: 22 }} />
        </Box>
        <Box
            onClick={onWritePost}
            sx={{
              bgcolor: GREEN,
              color: NAVY,
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              px: 2.5,
              py: 0.7,
              borderRadius: "20px",
              cursor: "pointer",
              "&:hover": { bgcolor: "#6ef094" },
              transition: "background 0.2s",
              userSelect: "none",
            }}
          >
            Post
          </Box>
      </Box>

      {/* <Divider sx={{ my: 1.5, borderColor: `${NAVY}12` }} /> */}

      {/* Bottom quick actions */}
      {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 1 }}>
        <QuickAction icon={<ImageOutlinedIcon />} label="Photo / Video" onClick={onWritePost} />
        <QuickAction icon={<ShareOutlinedIcon />} label="Share Link" onClick={onWritePost} />
        <Box sx={{ ml: "auto" }}>
          <Box
            onClick={onWritePost}
            sx={{
              bgcolor: GREEN,
              color: NAVY,
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              px: 2.5,
              py: 0.7,
              borderRadius: "20px",
              cursor: "pointer",
              "&:hover": { bgcolor: "#6ef094" },
              transition: "background 0.2s",
              userSelect: "none",
            }}
          >
            Post
          </Box>
        </Box> 
      </Box>*/}
    </Box>
  );
}

function QuickAction({ icon, label, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.8,
        color: NAVY,
        opacity: 0.65,
        fontSize: 13,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        cursor: "pointer",
        px: 1,
        py: 0.5,
        borderRadius: "8px",
        "&:hover": { opacity: 1, bgcolor: "rgba(19,32,109,0.05)" },
        transition: "all 0.15s",
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: 18 } })}
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
    </Box>
  );
}
