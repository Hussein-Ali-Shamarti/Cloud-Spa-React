import React, { useState, useContext, useEffect } from "react";
import "../../styles/Booking3/BookingSummary.css";
import CalenderIcon from "../../Pictures/CalenderIcon.png";
import { SelectedServiceContext } from "../../ServicesContext.js";
import getServicePrice from "../Booking3/getServicePrice"; // Import getServicePrice function
import applyPromoCode from "../Booking3/applyPromoCode"; // Import applyPromoCode function
import { useLocation } from "react-router-dom";

const BookingSummary = () => {
  const { selectedService, selectedDate } = useContext(SelectedServiceContext);
  const [promoCode, setPromoCode] = useState("");
  const [totalSum, setTotalSum] = useState(0); // Initial total sum
  const location = useLocation();
  const { checkedList} = location.state || {};
  
  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  useEffect(() => {
    if (checkedList && checkedList.length > 0) {
      // Calculate total sum based on selected services
      let sum = 0; // Base price
      if (Array.isArray(checkedList))
        checkedList.forEach((service) => {
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
  }, [checkedList, promoCode]); // Recalculate when selected services or promo code change
  
  const services = checkedList || [];

  //Function to format the date to DD/MM/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0'); // Gets the day of the month as a two-digit string
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (adding 1 because months are zero-based) as a two-digit string
    const year = date.getFullYear(); // Gets the full year
    return `${day}.${month}.${year}`; // Sets the formating to DD.MM.YYYY
  };
  console.log("Services:", services);
console.log("Selected Date:", selectedDate);
console.log("Promo Code:", promoCode);
console.log("Total Sum:", totalSum);

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
          <p className="booking-summary-p">{selectedDate && formatDate(selectedDate)}</p>
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
//exports the function over to PaymentForm to format the selectedDate
export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0'); // Gets the day of the month as a two-digit string
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (adding 1 because months are zero-based) as a two-digit string
  const year = date.getFullYear(); // Gets the full year
  return `${day}.${month}.${year}`;
};
export default BookingSummary;
