// import React from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import logo from "../../../../assets/logo.png";
import ProGrow from "../../../../assets/ProGrow.png";

export function AdminNavbar({ activePage, onNavigate }) {
  const location = useLocation();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/AdminDashboardPage",
      icon: <DashboardOutlinedIcon />,
    },
    {
      id: "requests",
      label: "Requests",
      path: "/RequestsPage",
      icon: <PersonAddAltOutlinedIcon />,
    },
    {
      id: "settings",
      label: "Edit Settings",
      path: "/EditSettingsPage",
      icon: <EditOutlinedIcon />,
    },
    {
      id: "potato",
      label: "Potato",
      path: "/PotatoPage",
      icon: <ChatBubbleOutlineOutlinedIcon />,
    },
  ];

  return (
    <div className="w-full flex flex-wrap justify-center items-center px-4 md:px-12 max-w-7xl mx-auto mt-0 pt-0">
      <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] shadow-sm px-6 md:px-8 py-3 flex items-center justify-between w-full gap-4 md:gap-8 border border-white/40">
        
        {/* Logo */}
        <Link
          to="/AdminDashboardPage"
          className="text-blue-900 font-bold tracking-tighter flex items-center shrink-0"
        >
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              className="h-7 sm:h-10 md:h-12 w-auto object-contain"
            />
            <img
              src={ProGrow}
              alt="ProGrow"
              className="h-6 sm:h-8 md:h-10 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-6 md:gap-12 shrink-0 ml-auto">
          {navItems.map((item) => {
           // const isActive = activePage === item.id;
            const isActive = location.pathname === item.path || (item.label === 'Dashboard' && location.pathname === '/');

            return (
              <Link
                key={item.id}
                to={item.path}
                //onClick={() => onNavigate?.(item.id)}
                className={`flex items-center gap-2.5 text-sm sm:text-base md:text-lg font-medium transition-all
                [&>svg]:scale-90 sm:[&>svg]:scale-100 md:[&>svg]:scale-110
                ${
                  isActive
                    ? "text-green-400"
                    : "text-[#13206d] hover:text-green-400 hover:scale-105"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}