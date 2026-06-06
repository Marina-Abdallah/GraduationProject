import React from "react";
import HeroCard from "./heroCard";
import "./heroSection.css";
import companyIcon from "../../../../assets/company.png";
import userIcon from "../../../../assets/user.png";

function HeroSection() {
  return (
    <section className="hero-section">

      
        <div className="cards-container">
                  <HeroCard
              /* المحتوى */
              icon={companyIcon}
              title="Company Account"
              text="A dedicated space for companies to post jobs, review candidate profiles, and use AI tools to filter and rank applicants efficiently."

              /* نوع الكارت */

              buttonText="Sign up"
              variant="hero"
              showButton={true}

              /* الأحجام */
              
            iconWidth="440px"
            iconHeight="330px"  

              /* الألوان */
              textColor="#13206D"

              
            

              /* الزرار */
              buttonBg="#84FBA2"
              buttonColor="#13206D"
              buttonWidth="224px"
              buttonHeight="56px"
              buttonFontSize="24px"

              /* layout */
              align="center"
              textAlign="center"
              padding="30px"
              margin="40px auto"
              iconMargin="0 auto 20px auto"


              titleFontSize="32px"
              textFontSize="24px"

              titleFontWeight="700"
              textFontWeight="400"

                width="500px"
                height="700px"
            />

       <HeroCard
              /* المحتوى */
               icon={userIcon}

              title="User Account"
              text="A personalized dashboard where users can track their progress, update their CV, earn points, and access their career path and learning history."
              

              /* نوع الكارت */

              buttonText="Sign up"
              variant="hero"
              showButton={true}

              /* الأحجام */
              
            iconWidth="440px"
            iconHeight="330px"  

              /* الألوان */
              textColor="#13206D"

              
            

              /* الزرار */
              buttonBg="#84FBA2"
              buttonColor="#13206D"
              buttonWidth="224px"
              buttonHeight="56px"
              buttonFontSize="24px"

              /* layout */
              align="center"
              textAlign="center"
              padding="30px"
              margin="40px auto"
              iconMargin="0 auto 20px auto"


              titleFontSize="32px"
              textFontSize="24px"

              titleFontWeight="700"
              textFontWeight="400"

                width="500px"
                height="700px"
            />
          </div>

    </section>
  );
}

export default HeroSection;