import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button, Menu, MenuItem } from "@mui/material";

import logo from "../../assets/Logo.png";
import ProGrow from "../../assets/ProGrow.png";

function NavbarSplash() {
  const navigate = useNavigate();
  const location = useLocation();
  //const currentPath = location.pathname;

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

    <div className="w-full flex flex-wrap justify-center items-center px-4 md:px-12 max-w-7xl mx-auto mt-0 pt-0">
      {/* Navigation Pill */}
      <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] shadow-sm px-6 md:px-8 py-3 flex items-center justify-between w-full gap-4 md:gap-8 border border-white/40">

        {/* Logo */}
        <div className="text-blue-900 font-bold tracking-tighter flex items-center shrink-0">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className=" h-7 sm:h-10 md:h-12 w-auto object-contain" />
            <img src={ProGrow} alt="ProGrow" className="h-6 sm:h-8 md:h-10 w-auto object-contain" />
          </div>
        </div>

        {/* Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
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
          {location.pathname !== "/LandingPage" && (
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
          )}
        </Box>
      </div>
    </div>
  );
}

export default NavbarSplash;