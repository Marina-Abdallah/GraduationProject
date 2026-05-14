import React from "react";
import logo from "../../assets/Logo.png";
import ProGrow from "../../assets/ProGrow.png";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const goToPage = (path) => {
    navigate(path);
    handleClose();
  };

  // Improved detection using regex (case-insensitive)
  const isLoginPage = /login/i.test(location.pathname);
  const isSignupPage = /signup/i.test(location.pathname);

  // Determine what to show in the menu
  // If we are on Signup, show Login options. 
  // Otherwise (on Login OR Home), show Signup options.
  const showLoginOptions = isSignupPage;
  const showSignupOptions = isLoginPage || (!isLoginPage && !isSignupPage);

  return (
     <div className="w-full flex flex-wrap justify-center items-center px-4 md:px-12 max-w-7xl mx-auto mt-0 pt-0">
      {/* Navigation Pill */}
      <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] shadow-sm px-6 md:px-8 py-3 flex items-center justify-between w-full gap-4 md:gap-8 border border-white/40">
        
        {/* Logo */}
        <div className="text-blue-900 font-bold tracking-tighter flex items-center shrink-0">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className=" h-7 sm:h-9 md:h-14 w-auto object-contain" />
            <img src={ProGrow} alt="ProGrow" className="h-6 sm:h-8 md:h-12 w-auto object-contain" />
          </div>
        </div>

        {/* Navigation and Profile on the right */}
       <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: "#13206D",
          "&:hover": { backgroundColor: "#84FBA2" },
          borderRadius: "12px",
          marginRight: "15px",
          width: 150,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        {/* Toggle label based on what the menu will contain */}
        {showSignupOptions ? "Sign Up ▾" : "Login ▾"}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {showSignupOptions && (
          <div>
            <MenuItem onClick={() => goToPage("/UserSignUp")}>Sign Up as JobSeeker</MenuItem>
            <MenuItem onClick={() => goToPage("/CompanySignUp")}>Sign Up as Recruiter</MenuItem>
          </div>
        )}

        {showLoginOptions && (
          <div>
            <MenuItem onClick={() => goToPage("/UserLogin")}>Login as JobSeeker</MenuItem>
            <MenuItem onClick={() => goToPage("/CompanyLogin")}>Login as Recruiter</MenuItem>
          </div>
        )}
      </Menu>
      </div>
    </div>

  );
}
export default Navbar;