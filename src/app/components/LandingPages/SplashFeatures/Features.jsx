import React from "react";
import "./Features.css";
import cvIcon from "../../../../assets/cvIcon.png";
import communityIcon from "../../../../assets/communityIcon.png";
import featureSection from "../../../../assets/featureSection.png";
import careerIcon from "../../../../assets/careerIcon.png";
import resumeIcon from "../../../../assets/resumeIcon.png";


function Features() {
  return (
    <section className="features-section">
      <div className="features-image">
        <img src={featureSection} alt="Computer Graphic" />
      </div>

      <div className="features-list">
        <div className="feature-item">
          <div className="icon">
            <img src={cvIcon} alt="cvIcon" />
              </div>
          <h3>CV Search & Filter</h3>
          <p>Find the right CVs with smart search and filters</p>
        </div>

        <div className="feature-item">
          <div className="icon">
            <img src={communityIcon} alt="communityIcon" />
              </div>
          <h3>Community</h3>
          <p>Connect with peers in the same industry</p>
        </div>

        <div className="feature-item">
          <div className="icon">
            <img src={careerIcon} alt="careerIcon" />
              </div>
          <h3>Career Paths</h3>
          <p>Personalized roadmap to advance in your field</p>
        </div>

        <div className="feature-item">
          <div className="icon">
            <img src={resumeIcon} alt="resumeIcon" />
              </div>
          <h3>Resume Assistant</h3>
          <p>Optimize your CV and improve your chances</p>
        </div>
      </div>
    </section>
  );
}

export default Features;