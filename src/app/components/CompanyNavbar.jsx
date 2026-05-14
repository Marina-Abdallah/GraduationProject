import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import logo from "../../assets/Logo.png";
import ProGrow from "../../assets/ProGrow.png";

export function CompanyNavbar() {
  const location = useLocation();

  const navItems = [
    { label: "Home",      path: "/CompanyJobs",     icon: <HomeOutlinedIcon /> },
    { label: "Community", path: "/CompanyCommunity", icon: <PeopleOutlineIcon /> },
    { label: "Features",  path: "/CompanyFeatures",  icon: <StarOutlineIcon /> },
  ];

  // treat /company-jobs and /company-jobs/:id as the "Home" active path
  const isJobsActive =
    location.pathname === "/CompanyJobs" ||
    location.pathname.startsWith("/CompanyJobs/");

  // treat /company-features and /company/* sub-routes as "Features" active
  const isFeaturesActive =
    location.pathname === "/CompanyFeatures" ||
    location.pathname.startsWith("/Company/");

  function isActive(item) {
    if (item.path === "/CompanyJobs") return isJobsActive;
    if (item.path === "/CompanyFeatures") return isFeaturesActive;
    return location.pathname === item.path;
  }

  return (
    <div className="w-full flex justify-center items-center px-4 md:px-12 max-w-7xl mx-auto mt-0 pt-0">
      {/* Navigation Pill */}
      <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] shadow-sm px-6 md:px-8 py-3 flex items-center justify-between w-full gap-4 md:gap-8 border border-white/40">

        {/* Logo — clicks back to company home */}
        <Link to="/company-jobs" className="flex items-center gap-3 shrink-0">
          <img src={logo}    alt="Logo"    className="h-10 md:h-14 w-auto object-contain" />
          <img src={ProGrow} alt="ProGrow" className="h-9  md:h-12 w-auto object-contain" />
        </Link>

        {/* Right side: nav + divider + profile */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0 ml-auto">

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-2.5 text-lg font-medium transition-all [&>svg]:scale-110 ${
                  isActive(item)
                    ? "text-green-400"
                    : "text-[#13206d] hover:text-green-400 hover:scale-105"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-200" />

          {/* Company profile icon */}
          <Link
            to="/CompanyProfile"
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors [&>svg]:scale-125 ${
              location.pathname === "/CompanyProfile"
                ? "border-green-400 text-green-400 bg-green-50"
                : "border-[#13206d] text-[#13206d] hover:bg-gray-50"
            }`}
          >
            <BusinessOutlinedIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}