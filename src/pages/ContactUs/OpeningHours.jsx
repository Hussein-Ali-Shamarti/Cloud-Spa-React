import React from "react";
import openingHoursImage from "../../Pictures/openingHours.jpg";
import "../../styles/AboutUs/ContactPage.css";

const OpeningHours = () => {
  return (
    <div className="opening-hours">
      <img
        src={openingHoursImage}
        alt="Opening Hours Image"
        className="opening-hours-image"
      />
      <div className="opening-hours-text">
        <h1>Opening hours</h1>
        <p>Weekdays: Monday - Friday 08:00-22:00</p>
        <p>Weekends: Saturday - Sunday 10:00-23:00</p>
      </div>
    </div>
  );
};

export default OpeningHours;
