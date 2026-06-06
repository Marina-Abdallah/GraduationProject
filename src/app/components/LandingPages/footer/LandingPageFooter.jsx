/*import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        <span className="pro">Pro</span>
        <span className="grow">Grow</span>
      </div>

      <div className="footer-links">
        <div>
          <h4>Solutions</h4>
          <p>For Business</p>
          <p>Leadership</p>
          <p>Development</p>
          <p>Outplacement</p>
        </div>

        <div>
          <h4>Coaching</h4>
          <p>Leadership</p>
          <p>Career Coaching</p>
          <p>Life Coaching</p>
        </div>

        <div>
          <h4>Resources</h4>
          <p>Guides</p>
          <p>Jobs</p>
          <p>Interview Prep</p>
        </div>

        <div>
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>FAQ</p>
        </div>
      </div>

      <div className="copyright">
        Copyright © ProGrow 2026
      </div>
    </div>
  );
}

export default Footer;
*/

import React from "react";
import "./Footer.css";
import Logo from "../../../../assets/Logo.png";


function LandingPageFooter() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          
         <div className="logo-container">
        <img src={Logo} alt="ProGrow Logo" />
      </div>
          <p>Ready to elevate your career ??</p>
          <button className="get-started-btn">Get Started</button>
        </div>

        <div className="footer-links">
          <div>
            <h4>Solutions</h4>
            <p>For Business</p>
            <p>Leadership</p>
            <p>Development</p>
            <p>Outplacement</p>
          </div>

          <div>
            <h4>Coaching</h4>
            <p>Leadership</p>
            <p>Coaching</p>
            <p>Career Coaching</p>
            <p>Life Coaching</p>
            <p>Job Search Coaching</p>
          </div>

          <div>
            <h4>Resources</h4>
            <p>Guides</p>
            <p>Jobs</p>
            <p>Boards</p>
            <p>Interview Prep</p>
            <p>Custom Job Boards</p>
          </div>

          <div>
            <h4>Company</h4>
            <p>About Us</p>
            <p>Join as Coach</p>
            <p>Careers</p>
            <p>FAQ</p>
            <p>Press</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Facebook | Instagram | Twitter | Linkedin</p>
        <p>Copyright @UIHUT 2022</p>
      </div>
    </footer>
  );
}

export default LandingPageFooter;