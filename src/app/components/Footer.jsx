import React from "react";
import logo from "../../assets/Logo.png";
import ProGrow from "../../assets/ProGrow.png";

export function Footer() {
  return (
      <div
        className="w-[70%] bg-white rounded-t-[50px] pt-12 pb-8 px-12 mt-4"
        style={{
          boxShadow: "0 0 40px 8px rgba(34,197,94,0.25), 0 0 80px 16px rgba(34,197,94,0.12)",
        }}
      >
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">

          {/* Logo Column */}
          <div className="flex-shrink-0">
            <div className="text-blue-900 font-bold text-5xl tracking-tighter flex items-center mb-6">
              <div className="flex items-center  gap-2">
                <img src={logo} alt="Logo" className="h-80 md:h-35 w-auto object-contain" />
                <img src={ProGrow} alt="ProGrow" className="h-20 md:h-25 w-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-3 whitespace-nowrap">
              <h4 className="text-[#13206d] font-bold text-lg mb-4">Solutions</h4>
              <ul className="flex flex-col gap-3 text-[#13206d] opacity-80">
                <li><a href="#" className="hover:text-green-500 transition-colors">For Business</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Leadership</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Development</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Outplacement</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 whitespace-nowrap">
              <h4 className="text-[#13206d] font-bold text-lg mb-4">Coaching</h4>
              <ul className="flex flex-col gap-3 text-[#13206d] opacity-80">
                <li><a href="#" className="hover:text-green-500 transition-colors">Leadership Coaching</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Career Coaching</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Life Coaching</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Job Search Coaching</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 whitespace-nowrap">
              <h4 className="text-[#13206d] font-bold text-lg mb-4">Resources</h4>
              <ul className="flex flex-col gap-3 text-[#13206d] opacity-80">
                <li><a href="#" className="hover:text-green-500 transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Job Boards</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Interview Prep</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Custom Job Boards</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 whitespace-nowrap">
              <h4 className="text-[#13206d] font-bold text-lg mb-4">Company</h4>
              <ul className="flex flex-col gap-3 text-[#13206d] opacity-80">
                <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Join as Coach</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-[#13206d] opacity-80 text-sm">
          <div className="flex gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-green-500 transition-colors">Facebook</a>
            <a href="#" className="hover:text-green-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-green-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-green-500 transition-colors">LinkedIn</a>
          </div>
          <div>Copyright @UIHUT 2022</div>
        </div>
      </div>
  );
}