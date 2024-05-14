import React, { useState } from "react";
import "../../styles/Booking2/QuantityPers.css";
import iconPerson from "../../Pictures/iconPerson.png";

const QuantityPers = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return(
    <div className= "Quantity-Container">
        <div className="age-label">
          <img src={iconPerson} alt="PersonIcon" className= "personIcon" />
          Age 16+
        </div>
        <div className="counter-controls">
          <button onClick={handleDecrement} disabled={count === 0}>-</button>
          <span>{count}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
            
        
    </div>
  );

};

export default QuantityPers;