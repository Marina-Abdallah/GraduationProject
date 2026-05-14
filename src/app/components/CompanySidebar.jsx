import React from "react";
import { Box, Typography, Divider, Button, Avatar } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import defaultPhoto from "../../assets/defaultCompanyImg.jpg";


const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

// function MSLogoCircle() {
//   return (
//     <Box
//       sx={{
//         width: 100,
//         height: 100,
//         bgcolor: "white",
//         borderRadius: "50%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         boxShadow: "0 4px 20px rgba(132,251,162,0.45), 0 2px 8px rgba(0,0,0,0.06)",
//         border: "3px solid rgba(132,251,162,0.4)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: "4px",
//           width: 58,
//           height: 58,
//           p: "7px",
//         }}
//       >
//         <Box sx={{ bgcolor: "#F25022", borderRadius: "2px" }} />
//         <Box sx={{ bgcolor: "#7FBA00", borderRadius: "2px" }} />
//         <Box sx={{ bgcolor: "#00A4EF", borderRadius: "2px" }} />
//         <Box sx={{ bgcolor: "#FFB900", borderRadius: "2px" }} />
//       </Box>
//     </Box>
//   );
// }

function StatBox({ value, label }) {
  
  return (
    <Box sx={{ textAlign: "center", flex: 1 }}>
      <Typography
        sx={{
          color: NAVY,
          fontWeight: 700,
          fontSize: 17,
          lineHeight: 1.2,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          color: NAVY,
          fontSize: 12,
          opacity: 0.65,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function CompanySidebar() {
  const { company } = useAppContext();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 300,
        flexShrink: 0,
        bgcolor: "white",
        borderRadius: "24px",
        p: "24px 18px",
        boxShadow: "0px 8px 24px rgba(132,251,162,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        height: "fit-content",
      }}
    >
      {/* Logo */}
      {/* <MSLogoCircle /> */}
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={company.photo || defaultPhoto}
          alt={company.name}
          sx={{
            width: 110,
            height: 110,
            border: `3px solid ${GREEN}`,
            boxShadow: `0 4px 16px rgba(132,251,162,0.5)`,
            objectFit: "cover",
          }}
        />
        <Link to="/CompanyProfile" style={{ textDecoration: "none" }}>
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

      {/* Company name + location */}
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
          Microsoft
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.4,
            mt: 0.5,
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 12, color: LIGHT_BLUE }} />
          <Typography
            sx={{
              color: LIGHT_BLUE,
              fontSize: 12,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Alexandria, Egypt
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ width: "100%", borderColor: `${NAVY}18` }} />

      {/* Category */}
      <Typography
        sx={{
          color: LIGHT_BLUE,
          fontWeight: 600,
          fontSize: 13,
          fontFamily: "'Inter', sans-serif",
          textAlign: "center",
        }}
      >
        Technology Company
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          color: NAVY,
          fontSize: 11.5,
          opacity: 0.7,
          fontFamily: "'Inter', sans-serif",
          textAlign: "center",
          lineHeight: 1.65,
        }}
      >
        We believe technology can and should be a force for good and that
        meaningful innovation contributes to a brighter world in the future and
        today
      </Typography>

      <Divider sx={{ width: "100%", borderColor: `${NAVY}18` }} />

      {/* Stats */}
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <StatBox value="200" label="Posts" />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: `${NAVY}20`, mx: 0.3 }}
        />
        <StatBox value="1M" label="Followers" />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: `${NAVY}20`, mx: 0.3 }}
        />
        <StatBox value="1K" label="Following" />
      </Box>

      <Divider sx={{ width: "100%", borderColor: `${NAVY}18` }} />

      {/* Manage Jobs button */}
      <Button
        variant="outlined"
        onClick={() => navigate("/CompanyJobs")}
        startIcon={<WorkOutlineIcon sx={{ fontSize: "15px !important" }} />}
        sx={{
          borderColor: GREEN,
          color: NAVY,
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "'Inter', sans-serif",
          borderRadius: "20px",
          px: 2,
          py: 0.8,
          textTransform: "none",
          width: "100%",
          "&:hover": {
            borderColor: "#6ef094",
            bgcolor: "rgba(132,251,162,0.08)",
          },
          transition: "all 0.2s",
        }}
      >
        Manage Posted Jobs
      </Button>
    </Box>
  );
}