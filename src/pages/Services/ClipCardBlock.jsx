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
        <p className="ClipCard-text-box">
          Morning Meditation at 09:00<br/>
          Peel Rituals at 11:00<br/>
          Aqua Gym at 16:00<br/>
          Yoga at 19:00<br/>
          Relaxing Breath Meditation at 21:30
        </p>
        {"\n"}
        
      </div>
      </div>
    </div>
  );
};
export default ClipCardBlock;
