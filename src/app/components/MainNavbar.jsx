import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import logo from "../../assets/Logo.png";
import ProGrow from "../../assets/ProGrow.png";

export function MainNavbar() {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/MyJobApplication", icon: <HomeOutlinedIcon /> },
    { label: "Community", path: "/Community", icon: <PeopleOutlineIcon /> },
    { label: "Features", path: "/Features", icon: <StarOutlineIcon /> },
  ];

  return (
    <div className="w-full flex flex-wrap justify-center items-center px-4 md:px-12 max-w-7xl mx-auto mt-0 pt-0">
      {/* Navigation Pill */}
      <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] shadow-sm px-6 md:px-8 py-3 flex items-center justify-between w-full gap-4 md:gap-8 border border-white/40">
        
        {/* Logo — clicks back to home */}
        <Link to="/MyJobApplication" className="text-blue-900 font-bold tracking-tighter flex items-center shrink-0">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className=" h-7 sm:h-9 md:h-14 w-auto object-contain" />
            <img src={ProGrow} alt="ProGrow" className="h-6 sm:h-8 md:h-12 w-auto object-contain" />
          </div>
        </Link>

        {/* Navigation and Profile on the right */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 shrink-0 ml-auto">
          {/* Navigation */}
          {/* <div className="hidden md:flex items-center gap-12"> */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-12">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.label === 'Home' && location.pathname === '/');
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-2.5 text-sm sm:text-base md:text-lg font-medium transition-all [&>svg]:scale-90 sm:[&>svg]:scale-100 md:[&>svg]:scale-110 
                    ${isActive ? "text-green-400" : "text-[#13206d] hover:text-green-400 hover:scale-105"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          {/* Profile Icon → links to /profile */}
          <Link
            to="/Profile"
            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 transition-colors [&>svg]:scale-125 ${
              location.pathname === '/Profile'
                ? 'border-green-400 text-green-400 bg-green-50'
                : 'border-[#13206d] text-[#13206d] hover:bg-gray-50'
            }`}
          >
            <AccountCircleOutlinedIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}