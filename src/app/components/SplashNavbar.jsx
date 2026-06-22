import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button } from "@mui/material";

import logo from "../../assets/Logo.png";
import ProGrow from "../../assets/ProGrow.png";

const dropdownMenuSx = {
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  right: 0,
  width: "100%",
  zIndex: 1300,
  borderRadius: "14px",
  backgroundColor: "#ffffff",
  boxShadow:
    "0 4px 20px rgba(19, 32, 109, 0.08), 0 1px 4px rgba(19, 32, 109, 0.04)",
  border: "1px solid rgba(19, 32, 109, 0.08)",
  overflow: "hidden",
  p: "6px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  transformOrigin: "top center",
  animation: "splashDropdownEnter 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
  "@keyframes splashDropdownEnter": {
    from: { opacity: 0, transform: "translateY(-4px) scale(0.98)" },
    to: { opacity: 1, transform: "translateY(0) scale(1)" },
  },
};

const dropdownItemSx = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: 40,
  px: 1.5,
  py: 1,
  border: "none",
  background: "transparent",
  borderRadius: "8px",
  fontSize: "0.8125rem",
  fontWeight: 500,
  fontFamily: "Inter, sans-serif",
  color: "#13206d",
  lineHeight: 1.5,
  letterSpacing: "0.01em",
  textAlign: "left",
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "background-color 0.15s ease",
  boxSizing: "border-box",
  "&:hover": {
    backgroundColor: "rgba(19, 32, 109, 0.05)",
  },
  "&:active": {
    backgroundColor: "rgba(19, 32, 109, 0.08)",
  },
  "&:focus-visible": {
    outline: "2px solid rgba(19, 32, 109, 0.18)",
    outlineOffset: -2,
  },
};

const dropdownDividerSx = {
  height: "1px",
  backgroundColor: "rgba(19, 32, 109, 0.06)",
  mx: 1,
  my: 0.25,
  flexShrink: 0,
};

const chevronSx = (open) => ({
  display: "inline-block",
  width: 0,
  height: 0,
  borderLeft: "4px solid transparent",
  borderRight: "4px solid transparent",
  borderTop: "5px solid #1E2A78",
  transition: "transform 0.2s ease",
  transform: open ? "rotate(180deg)" : "rotate(0deg)",
});

function NavbarSplash() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const goToPage = (path) => {
    navigate(path);
    closeDropdown();
  };

  const handleMenuKeyDown = (event, path) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToPage(path);
    }
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
          <Box ref={dropdownRef} sx={{ position: "relative", width: 165 }}>
            <Button
              variant="outlined"
              onClick={toggleDropdown}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              id="splash-login-dropdown-button"
              sx={{
                width: 165,
                height: 42,
                borderRadius: "16px",
                borderColor: "#1E2A78",
                color: "#1E2A78",
                fontWeight: 600,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.75,
                "&:hover": {
                  borderColor: "#1E2A78",
                  backgroundColor: "rgba(30,42,120,0.05)",
                },
              }}
            >
              Login
              <Box component="span" aria-hidden="true" sx={chevronSx(isOpen)} />
            </Button>

            {isOpen && (
              <Box
                role="menu"
                aria-labelledby="splash-login-dropdown-button"
                sx={dropdownMenuSx}
              >
                <Box
                  component="button"
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => goToPage("/UserLogin")}
                  onKeyDown={(e) => handleMenuKeyDown(e, "/UserLogin")}
                  sx={dropdownItemSx}
                >
                  Login as Job Seeker
                </Box>
                <Box sx={dropdownDividerSx} aria-hidden="true" />
                <Box
                  component="button"
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => goToPage("/CompanyLogin")}
                  onKeyDown={(e) => handleMenuKeyDown(e, "/CompanyLogin")}
                  sx={dropdownItemSx}
                >
                  Login as Recruiter
                </Box>
              </Box>
            )}
          </Box>

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
