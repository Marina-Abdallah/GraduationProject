import React from "react";
import "./heroCard.css";

function HeroCard({
  icon,
  title,
  text,
  buttonText,
  showButton = true,
  variant = "hero",

  iconWidth = "60px",
  iconHeight = "60px",
  width,
  height,

  bgColor,
  textColor = "#13206D",
  shadow,

  /* button */
  buttonBg,
  buttonColor,
  buttonWidth,
  buttonHeight,
  buttonFontSize,

  /* layout */
  align = "center", // center | left | right
  padding = "20px",
  margin,
  iconMargin,
  textAlign,



  titleFontSize = "24px",
textFontSize = "16px",

titleFontWeight = "600",
textFontWeight = "400", 
}) {
  return (
    <div
      className={`hero-card ${variant}`}
      style={{
        background: bgColor,
        width: width,
        height: height,
        boxShadow: shadow,
        padding: padding,
        margin: margin,
      }}
    >
      <div
        className="hero-content"
        style={{
          textAlign: textAlign || align,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {icon && (
          <img
            src={icon}
            alt=""
            className="hero-icon"
            style={{
             width: iconWidth,
             height: iconHeight,
              objectFit: "contain",
              margin: iconMargin,
              display: "block",
              marginLeft: align === "center" ? "auto" : "0",
              marginRight: align === "center" ? "auto" : "0",
            }}
          />
        )}

        <h2
          style={{
            color: textColor,
            fontSize: titleFontSize,
            fontWeight: titleFontWeight,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: textColor,
            fontSize: textFontSize,
            fontWeight: textFontWeight,
          }}
        >
          {text}
        </p>
        {showButton && (
          <button
            className="hero-btn"
            style={{
              backgroundColor: buttonBg,
              color: buttonColor,
              width: buttonWidth,
              height: buttonHeight,
              fontSize: buttonFontSize,
               display: "block",
                marginTop: "20px",
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default HeroCard;