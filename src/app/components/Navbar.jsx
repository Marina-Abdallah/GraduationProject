import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/Logo.png";
import ProGrow from "../../assets/ProGrow.png";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useNavigate, useLocation } from "react-router-dom";

const dropdownMenuSx = {
  position: "absolute",
  top: "calc(100% + 6px)",
  right: 0,
  minWidth: "200px",
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
  animation: "navbarDropdownEnter 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
  "@keyframes navbarDropdownEnter": {
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
  borderTop: "5px solid currentColor",
  transition: "transform 0.2s ease",
  transform: open ? "rotate(180deg)" : "rotate(0deg)",
});

function Navbar() {
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

  const isLoginPage = /login/i.test(location.pathname);
  const isSignupPage = /signup/i.test(location.pathname);

  const showLoginOptions = isSignupPage;
  const showSignupOptions = isLoginPage || (!isLoginPage && !isSignupPage);
  const dropdownLabel = showSignupOptions ? "Sign Up" : "Login";

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

        {/* Navigation and Profile on the right */}
        <Box ref={dropdownRef} sx={{ position: "relative", marginRight: "15px", width: 150 }}>
          <Button
            variant="contained"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            id="navbar-auth-dropdown-button"
            sx={{
              backgroundColor: "#13206D",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#84FBA2", color: "#13206D" },
              borderRadius: "12px",
              width: 150,
              textTransform: "none",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
            }}
          >
            {dropdownLabel}
            <Box component="span" aria-hidden="true" sx={chevronSx(isOpen)} />
          </Button>

          {isOpen && (
            <Box
              role="menu"
              aria-labelledby="navbar-auth-dropdown-button"
              sx={dropdownMenuSx}
            >
              {showSignupOptions && (
                <>
                  <Box
                    component="button"
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => goToPage("/UserSignUp")}
                    onKeyDown={(e) => handleMenuKeyDown(e, "/UserSignUp")}
                    sx={dropdownItemSx}
                  >
                    Sign Up as JobSeeker
                  </Box>
                  <Box sx={dropdownDividerSx} aria-hidden="true" />
                  <Box
                    component="button"
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => goToPage("/CompanySignUp")}
                    onKeyDown={(e) => handleMenuKeyDown(e, "/CompanySignUp")}
                    sx={dropdownItemSx}
                  >
                    Sign Up as Recruiter
                  </Box>
                </>
              )}

              {showLoginOptions && (
                <>
                  <Box
                    component="button"
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => goToPage("/UserLogin")}
                    onKeyDown={(e) => handleMenuKeyDown(e, "/UserLogin")}
                    sx={dropdownItemSx}
                  >
                    Login as JobSeeker
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
                </>
              )}
            </Box>
          )}
        </Box>
      </div>
    </div>

  );
}
export default Navbar;
