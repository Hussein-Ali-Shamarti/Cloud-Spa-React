import React from "react";
import openingHoursImage from "../../Pictures/openingHours.jpg";

const OpeningHoursSection = () => {
  return (
    <div className="opening-hours-container">
      <img
        src={openingHoursImage}
        alt="Pink flowers"
        className="opening-hours-image"
      />
      <div className="opening-text">
        <h1>Opening hours</h1>
        <div className="opening-hours-details">
          <p className="opening-hours-text">Weekdays:</p>
          <p className="opening-hours-text">Monday - Friday 08:00-22:00</p>
        </div>
        <div className="opening-hours-details">
          <p className="opening-hours-text">Weekends:</p>
          <p className="opening-hours-text">Saturday - Sunday 10:00-23:00</p>
        </div>
      </div>
    </div>
  );
};

export default OpeningHoursSection;
