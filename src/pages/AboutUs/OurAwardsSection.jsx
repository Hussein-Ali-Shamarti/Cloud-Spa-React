import React from "react";
import spaAwards1 from "../../public/assets/Pictures/spaAwards1.jpg";
import spaAwards2 from "../../public/assets/Pictures/spaAwards2.png";
import spaAwards3 from "../../public/assets/Pictures/spaAwards3.png";
import "../../public/assets/styles/AboutUs.css"; // Adjust path as necessary

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
