import React, { useState, useContext } from "react";
import "../../styles/Booking2/QuantityPers.css";
import iconPerson from "../../Pictures/iconPerson.png";
import { SelectedServiceContext } from "../../ServicesContext.js";

const QuantityPers = () => {
  const { personCount, setPersonCount } = useContext(SelectedServiceContext);

  const handleIncrement = () => {
    setPersonCount(personCount + 1);
  };

  const handleDecrement = () => {
    if (personCount > 1) {
      setPersonCount(personCount - 1);
    }
  };

  return (
    <div className="Quantity-Container">
      <div className="age-label">
        <img src={iconPerson} alt="PersonIcon" className="personIcon" />
        Age 16+
      </div>
      <div className="counter-controls">
        <button onClick={handleDecrement} disabled={personCount === 1}>-</button>
        <span>{personCount}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

export default QuantityPers;