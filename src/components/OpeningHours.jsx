import React from "react";
import openingHoursImage from "../Pictures/openingHours.jpg";
import "../styles/AboutUs/ContactPage.css";

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
        <div className="hours">
          <p>Weekdays: </p>
          <p>Monday - Friday 08:00-22:00</p>
        </div>
        <div className="hours">
          <p className="p2">Weekends:</p>
          <p>Saturday - Sunday 10:00-23:00</p>
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
