import React from "react";
import clipCardEntrance from "../../Pictures/clipCardEntrance.jpg";
import "../../styles/SErvices/ClipCardBlock.css";

const ClipCardBlock = () => {
  return (
    <div>
      <img src={clipCardEntrance} alt="Clip Card Entrance" />
      <div className="clipCard-info">
        <h4 className="Clipcard-title">Clip Card for Spa Entrance</h4>
        {"\n"}
        <p className="ClipCard-text-box">
          INCLUDED: Spa/gym access, daily spa activities, tea & water,
          complimentary use of bathrobe and slippers.
        </p>
        {"\n"}
        <button className="BuyCC-btn">Buy Clip Card</button>
        <button className="book-btn">Book Entrance</button>
      </div>
    </div>
  );
};
export default ClipCardBlock;
