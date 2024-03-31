import React from "react";
import openingHoursImage from "../../public/assets/Pictures/openingHours.jpg";
import "../../public/assets/styles/AboutUs.css"; // Adjust path as necessary

const OpeningHoursSection = () => {
  return (
    <div className="opening-hours">
      <img src={openingHoursImage} alt="Pink flowers" />
      <div className="opening-text">
        <h1>Opening hours</h1>
        <p>Weekdays:</p>
        <p className="p1">Monday - Friday 08:00-22:00</p>
        <br />
        <br />
        <br />
        <p className="p2">Weekends:</p>
        <br />
        <p className="p3">Saturday - Sunday 10:00-23:00</p>
      </div>
    </div>
  );
};

export default OpeningHoursSection;
