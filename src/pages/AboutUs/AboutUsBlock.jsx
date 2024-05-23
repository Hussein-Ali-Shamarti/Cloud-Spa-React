//Author: 7030
import React from "react";
import aboutUsImage from "../../Pictures/aboutUs.jpg";
import "../../styles/AboutUsBlock.css";
const AboutUsBlock = () => {
  return (
    <div className="about-us-block">
      <div className="about-us-content">
        <div className="text-box">
          <h1>About us</h1>
          <p>
            Welcome to Cloud Spa, where tranquility meets innovation.
            Established in 2004, we step into luxury with award-winning
            treatments tailored uniquely to you and your requirements. Our
            expert therapists offer personalized experiences tailored by your
            relaxation needs. Step into our oasis in the clouds and embark on a
            journey of bliss.
          </p>
        </div>
      </div>
      <div className="about-us-image">
        <img src={aboutUsImage} alt="Holding flowers" />
      </div>
    </div>
  );
};

export default AboutUsBlock;
