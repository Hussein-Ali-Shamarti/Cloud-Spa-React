import React from "react";
import clipCardEntrance from "../../Pictures/clipCardEntrance.jpg";
import "../../styles/Services/ClipCardBlock.css";

const ClipCardBlock = () => {
  return (
    <div class="container">
    <div className= "Clip-Card-Container">
      <img src={clipCardEntrance} alt="Clip Card Entrance" />
      <div className="ClipCard-info">
        <h4 className="ClipCard-title">Clip Card for Spa Entrance</h4>
        {"\n"}
        <p className="ClipCard-text-box">
          INCLUDED: Spa/gym access, daily spa activities, tea & water,
          complimentary use of bathrobe and slippers.
        </p>
        {"\n"}
        <button className="BuyCC-btn">Buy Clip Card</button>
        <button className="BookE-btn">Book Entrance</button>
      </div>
      </div>
    </div>
  );
};
export default ClipCardBlock;