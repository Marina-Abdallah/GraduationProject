import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Menu, MenuItem } from "@mui/material";

import logo from "../../assets/Logo.png";
import ProGrow from "../../assets/ProGrow.png";

function NavbarSplash() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToPage = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 5,
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1300px",
          height: "80px",
          px: { xs: 3, md: 5 },
          borderRadius: "30px",
          backgroundColor: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "48px",
                width: "auto",
                objectFit: "contain",
              }}
            />

            <img
              src={ProGrow}
              alt="ProGrow"
              style={{
                height: "40px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Login Dropdown */}
          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{
              width: 165,
              height: 42,
              borderRadius: "16px",
              borderColor: "#1E2A78",
              color: "#1E2A78",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                borderColor: "#1E2A78",
                backgroundColor: "rgba(30,42,120,0.05)",
              },
            }}
          >
            Login ▾
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => goToPage("/UserLogin")}>
              Login as Job Seeker
            </MenuItem>

            <MenuItem onClick={() => goToPage("/CompanyLogin")}>
              Login as Recruiter
            </MenuItem>
          </Menu>

          {/* Get Started Button */}
          <Button
            variant="contained"
            onClick={() => navigate("/LandingPage")}
            sx={{
              width: 165,
              height: 42,
              borderRadius: "16px",
              backgroundColor: "#1E2A78",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#16205f",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default NavbarSplash;