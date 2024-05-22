import React from "react";
import clipCardEntrance from "../../Pictures/clipCardEntrance.jpg";
import "../../styles/Services/ClipCardBlock.css";

const ClipCardBlock = () => {
  return (
    <div className="container">
    <div className= "Clip-Card-Container">
      <img src={clipCardEntrance} alt="Clip Card Entrance" />
      <div className="ClipCard-info">
        <h4 className="ClipCard-title">Our Daily Spa Activities</h4>
        {"\n"}
        <ul className="ClipCard-text-box">
          <li>Morning Meditation at 09:00</li><br/>
          <li>Peel Rituals at 11:00</li><br/>
          <li>Aqua Gym at 16:00</li><br/>
          <li>Yoga at 19:00</li><br/>
          <li>Relaxing Breath Meditation at 21:30</li>
        </ul>
        {"\n"}
        
      </div>
      </div>
    </div>
  );
};
export default ClipCardBlock;
