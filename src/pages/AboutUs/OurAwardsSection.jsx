import React from "react";
import spaAwards1 from "../../Pictures/spaAwards1.jpg";
import spaAwards2 from "../../Pictures/spaAwards2.png";
import spaAwards3 from "../..//Pictures/spaAwards3.png";
import "../../styles/AboutUs/AboutUsPage.css";

const OurAwardsSection = () => {
  return (
    <div id="our-awards">
      <div className="awards">
        <div className="awards-column">
          <h1>Our Awards</h1>
          <img src={spaAwards1} alt="First award" />
          <img src={spaAwards2} alt="Second award" />
          <img src={spaAwards3} alt="Third award" />
        </div>
      </div>
    </div>
  );
};

export default OurAwardsSection;
