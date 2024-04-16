import React from "react";
import fullDaySpa from "../../Pictures/fullDaySpa.jpg";
import "../../styles/Services/FdsBlock.css";

const FdsBlock = () => {
  return (
    <div className="full-day-spa-container">
      <img src={fullDaySpa} alt="Full day Spa Retreat" />

      <div className="FDS-info">
        <h4 className="FDS-title">Full Day Spa Retreat</h4>
        {"\n"}

        <p className="FDS-text-box">
          INCLUDED: Spa/gym access, all meal times, daily spa activities, tea &
          water, complimentary use of bathrobe and slippers.
        </p>
        {"\n"}
        <p className="FDS-price">Just for 1000kr</p>
        {"\n"}
        <button className="FDS-book-btn">Book now</button>
      </div>
    </div>
  );
};

export default FdsBlock;
