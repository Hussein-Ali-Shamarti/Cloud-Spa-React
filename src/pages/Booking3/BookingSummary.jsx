import React, { useState, useContext, useEffect } from "react";
import "../../styles/Booking3/BookingSummary.css";
import CalenderIcon from "../../Pictures/CalenderIcon.png";
import { SelectedServiceContext } from "../../ServicesContext.js";
import getServicePrice from "./getServicePrice"; // Import getServicePrice function
import applyPromoCode from "./applyPromoCode"; // Import applyPromoCode function

const BookingSummary = ({ selectedDate }) => {
  const { selectedService, checkedList } = useContext(SelectedServiceContext);
  const [promoCode, setPromoCode] = useState("");
  const [totalSum, setTotalSum] = useState(0); // Initial total sum

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  useEffect(() => {
    if (selectedService && selectedService.length > 0) {
      // Calculate total sum based on selected services
      let sum = 0; // Base price
      selectedService.forEach((service) => {
        // Add price of each selected service
        // Adjust this logic based on how service prices are stored
        sum += getServicePrice(service);
      });

      // Apply promo code if valid
      // Adjust this logic based on how promo codes are applied
      sum = applyPromoCode(sum);

      // Update total sum
      setTotalSum(sum);
    } else {
      // If no services selected, reset total sum to base price
      setTotalSum(0);
    }
  }, [selectedService, promoCode]); // Recalculate when selected services or promo code change

  const services = Array.isArray(selectedService) ? selectedService : [];

  return (
    <div className="booking-summary-container booking-summary-div">
      <div className="booking-summary booking-summary-div">
        <h3 className="booking-summary-h3">
          <span className="booking-summary-span">your order</span>
        </h3>
        <div className="selected-choices booking-summary-div">
          <h4 className="booking-summary-h4">Selected Choices</h4>
          {services.map((item, index) => (
            <p className="booking-summary-p" key={index}>
              {item}
            </p>
          ))}
        </div>
        <div className="booking-summary-date booking-summary-div">
          <img src={CalenderIcon} />
          <p className="booking-summary-p">{selectedDate}</p>
          <h4>Change Date</h4>
        </div>
        <div className="booking-summary-promo-code booking-summary-div">
          <h4 className="booking-summary-h4">Promo Code</h4>
          <input
            type="text"
            value={promoCode}
            onChange={handlePromoCodeChange}
            placeholder="Promotion code"
          />
        </div>
        <div className="booking-summary-h3 booking-summary-div">
          <h3>
            <span className="booking-summary-span">summarization</span>
          </h3>
        </div>
        <div className="total booking-summary-div">
          <p className="white-text">Total</p>
          <p className="white-text">NOK {totalSum}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
