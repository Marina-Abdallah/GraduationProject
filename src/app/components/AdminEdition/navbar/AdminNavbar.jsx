import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../../assets/logo.png";
import ProGrow from "../../../../assets/ProGrow.png";

function ProGrowIcon() {
  return (
    <svg
      width="30.3374"
      height="48"
      viewBox="0 0 30.3374 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.3374 48H17.468C16.2864 47.9361 11.8156 47.5848 8.17514 44.008C5.01366 40.9102 4.31111 37.2695 4.15144 36.2475C3.06568 29.8603 6.77003 24.8144 8.43061 22.483C10.2189 20.0559 12.1669 18.3633 13.6678 17.2455C13.9871 17.022 14.4023 17.0539 14.6578 17.3094C16.1906 18.7465 17.7234 20.1836 19.2563 21.5888C19.7672 22.0679 20.5656 21.7166 20.5975 21.0459C20.7252 16.4471 20.8849 11.8483 21.0126 7.24951C21.0446 6.70659 20.5336 6.32336 19.9908 6.4511C15.2326 7.82436 10.4744 9.19761 5.71621 10.5709C5.01366 10.7944 4.94979 11.7844 5.62041 12.0719C7.60032 12.9022 9.61217 13.7006 11.5921 14.5309C12.1669 14.7545 12.2627 15.521 11.7837 15.8723C10.3786 16.9581 8.68608 18.523 7.12131 20.6627C5.93974 22.2914 1.85218 27.1457 2.33119 33.5329C2.61859 37.2056 4.37498 40.5269 2.74634 44.3912C2.01185 46.1158 0.862215 47.2655 0.0638624 47.9681C0.0319283 31.9681 0.0319341 16 0 0C5.62041 0.0319361 11.2727 0.03194 16.8931 0.0638762C24.5893 1.34132 30.0819 7.21757 30.3055 13.4771C30.4651 17.501 28.3256 21.9401 24.9725 24.4631C21.6513 26.9221 18.1066 27.0499 16.8293 27.018C12.8056 27.3054 9.73991 30.6906 9.77184 34.491C9.80378 37.9401 12.3904 41.006 15.9671 41.6766C18.6495 41.6128 21.332 41.5489 23.9825 41.485C23.9825 39.7605 24.0145 38.0359 24.0145 36.3114L16.7973 36.1517C16.8293 34.0759 16.8612 32.0319 16.8931 29.9561L30.3055 29.988V48H30.3374Z"
        fill="#13206D"
      />
    </svg>
  );
}

function DashboardIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18.5" cy="18.5" r="16.5" stroke={color} strokeWidth="2.5" />
      <circle cx="18.5" cy="18.5" r="7" stroke={color} strokeWidth="2.5" />
      <line x1="26.5" y1="10" x2="23" y2="13.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function RequestsIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 20C24.4 20 28 16.4 28 12C28 7.6 24.4 4 20 4C15.6 4 12 7.6 12 12C12 16.4 15.6 20 20 20Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 36C4 29.4 11.2 24 20 24"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="30" y1="22" x2="30" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="30" x2="38" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33 22.5V17.5L29.5 16.5C29.1 15.3 28.5 14.2 27.8 13.2L28.8 9.7L25.3 6.2L21.8 7.2C20.8 6.5 19.7 5.9 18.5 5.5L17.5 2H12.5L11.5 5.5C10.3 5.9 9.2 6.5 8.2 7.2L4.7 6.2L1.2 9.7L2.2 13.2C1.5 14.2 0.9 15.3 0.5 16.5L-3 17.5V22.5L0.5 23.5C0.9 24.7 1.5 25.8 2.2 26.8L1.2 30.3L4.7 33.8L8.2 32.8C9.2 33.5 10.3 34.1 11.5 34.5L12.5 38H17.5L18.5 34.5C19.7 34.1 20.8 33.5 21.8 32.8L25.3 33.8L28.8 30.3L27.8 26.8C28.5 25.8 29.1 24.7 29.5 23.5L33 22.5Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="20" r="5" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}

function EditSettingsIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28 6L34 12L14 32H8V26L28 6Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 36H34"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PotatoIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 6C4 4.9 4.9 4 6 4H34C35.1 4 36 4.9 36 6V26C36 27.1 35.1 28 34 28H12L4 36V6Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="13" y1="15" x2="27" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="13" y1="20" x2="21" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminNavbar({ activePage, onNavigate }) {
  const darkBlue = '#13206d';
  const mintGreen = '#84fba2';

  const items = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: (c) => <DashboardIcon color={c} /> },
    { id: 'requests', label: 'Requests', icon: (c) => <RequestsIcon color={c} /> },
    { id: 'settings', label: 'Edit Settings', icon: (c) => <EditSettingsIcon color={c} /> },
    { id: 'potato', label: 'Potato', icon: (c) => <PotatoIcon color={c} /> },
  ];

  return (
    <nav
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(255,255,255,0.7)',
        borderRadius: 30,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        padding: '16px 16px 16px 0',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        margin: '40px auto 0',
        width: 'calc(100% - 16.66%)',
        maxWidth: 1196,
        boxSizing: 'border-box',
      }}
    >
      {/* Logo — right padding matches Figma spec to give breathing room before nav items */}
      <Link to="/AdminDashboardPage" className="text-blue-900 font-bold tracking-tighter flex items-center shrink-0">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className=" h-7 sm:h-10 md:h-12 w-auto object-contain" />
          <img src={ProGrow} alt="ProGrow" className="h-6 sm:h-8 md:h-10 w-auto object-contain" />
        </div>
      </Link>

      {/* Nav Items */}
      {items.map((item) => {
        const isActive = item.id === (activePage || 'requests');
        const color = isActive ? mintGreen : darkBlue;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate && onNavigate(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              borderRadius: 8,
              flexShrink: 0,
              height: 48,
            }}
          >
            {item.icon(color)}
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: color,
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
