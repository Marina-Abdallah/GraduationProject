import React, { useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  LinearProgress,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";
import defaultPhoto from "../../assets/defaultImg.png";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

function StatBox({ value, label }) {
  return (
    <Box sx={{ textAlign: "center", flex: 1 }}>
      <Typography
        sx={{
          color: NAVY,
          fontWeight: 700,
          fontSize: 18,
          lineHeight: 1.2,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          color: NAVY,
          fontSize: 13,
          opacity: 0.65,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function SidebarProfile() {
  const { profile, skills, followCounts, fetchFollowCounts } = useAppContext();

  useEffect(() => {
    fetchFollowCounts();
  }, [fetchFollowCounts]);

  return (
    <Box
      sx={{
        width: 300,
        flexShrink: 0,
        bgcolor: "white",
        borderRadius: "24px",
        p: "28px 24px",
        boxShadow: "0px 8px 24px rgba(132,251,162,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        height: "fit-content",
        position: "sticky",
        top: 100,
      }}
    >
      {/* Profile Photo */}
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={profile.photo || defaultPhoto}
          alt={profile.name}
          sx={{
            width: 110,
            height: 110,
            border: `3px solid ${GREEN}`,
            boxShadow: `0 4px 16px rgba(132,251,162,0.5)`,
            objectFit: "cover",
          }}
        />
        <Link to="/Profile" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              right: 2,
              bgcolor: GREEN,
              borderRadius: "50%",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": { bgcolor: "#6ef094" },
              transition: "background 0.2s",
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 14, color: NAVY }} />
          </Box>
        </Link>
      </Box>

      {/* Name */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            color: NAVY,
            fontWeight: 700,
            fontSize: 20,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.3,
          }}
        >
          {profile.name}
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", borderColor: `${NAVY}18` }} />

      {/* Role & Major */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            color: NAVY,
            fontWeight: 600,
            fontSize: 15,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {profile.headline || "[Your Headline Here]"}
        </Typography>
        <Typography
          sx={{
            color: NAVY,
            fontSize: 12,
            opacity: 0.6,
            fontFamily: "'Inter', sans-serif",
            mt: 0.5,
            lineHeight: 1.4,
          }}
        >
          {profile.major
            ? `${profile.major}`
            : "[Your Major or Role Here]"}
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", borderColor: `${NAVY}18` }} />

      {/* Stats */}
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <StatBox value={followCounts.posts || 0} label="Posts" />
        <Divider orientation="vertical" flexItem sx={{ borderColor: `${NAVY}20`, mx: 0.5 }} />
        <StatBox value={followCounts.followers} label="Followers" />
        <Divider orientation="vertical" flexItem sx={{ borderColor: `${NAVY}20`, mx: 0.5 }} />
        <StatBox value={followCounts.followings} label="Following" />
      </Box>

      <Divider sx={{ width: "100%", borderColor: `${NAVY}18` }} />

      {/* Career Meter */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography
            sx={{
              color: NAVY,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.5px",
              fontFamily: "'Inter', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Career Meter
          </Typography>
          <Typography
            sx={{
              color: NAVY,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {profile.resumeScore ? `${profile.resumeScore}%` : "0%"}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={profile.resumeScore || 0}
          sx={{
            height: 10,
            borderRadius: 8,
            bgcolor: "#e8eaf6",
            "& .MuiLinearProgress-bar": {
              background: `linear-gradient(90deg, ${LIGHT_BLUE}, ${GREEN})`,
              borderRadius: 8,
            },
          }}
        />
      </Box>

      {/* Skills chips */}
      {skills && skills.length > 0 && (
        <>
          <Divider sx={{ width: "100%", borderColor: `${NAVY}18` }} />
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {skills.slice(0, 6).map((skill) => {
              const skillId = typeof skill === 'object' ? skill.id : skill;
              const skillName = typeof skill === 'object' ? (skill.name || skill.skillName || "Unknown") : skill;
              return (
                <Chip
                  key={skillId}
                  label={skillName}
                  size="small"
                  sx={{
                    bgcolor: `rgba(144,186,239,0.15)`,
                    color: NAVY,
                    fontWeight: 600,
                    fontSize: 11,
                    border: `1px solid rgba(144,186,239,0.4)`,
                    borderRadius: "8px",
                    height: 24,
                  }}
                />
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
}

function AchievRow({ icon, label, value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {icon}
      <Typography
        sx={{
          color: NAVY,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}&nbsp;
        <span style={{ fontWeight: 400, opacity: 0.75 }}>{value}</span>
      </Typography>
    </Box>
  );
}
