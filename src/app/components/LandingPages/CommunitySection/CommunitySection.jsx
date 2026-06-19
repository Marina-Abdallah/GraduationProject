import React from "react";
import "./CommunitySection.css";

function CommunitySection({
  title,
  description,
  image,
  reverse = false,

  // 🔥 new props
  imageWidth = "360px",
  titleColor = "#1e2a78",
  descColor = "#1e2a78",
  titleSize = "40px",
  descSize = "24px",
   imageOffset = "0px", 
   
}) {
  return (
    <section
      className={`community-section ${reverse ? "reverse" : ""}`}
    >
      <div className="community-text">
        <h2
          style={{
            color: titleColor,
            fontSize: titleSize,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: descColor,
            fontSize: descSize,
          }}
        >
          {description}
        </p>
      </div>

      <div className="community-image">
        <img
        src={image}
        alt="section"
        style={{
        width: imageWidth,
        transform: `translateX(${imageOffset})`,
  }}
/>
      </div>
    </section>
  );
}

export default CommunitySection;