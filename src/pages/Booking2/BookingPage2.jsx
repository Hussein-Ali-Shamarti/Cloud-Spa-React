import React, { useContext } from 'react';
import booking2 from "../../Pictures/booking2.jpg";
import "../../styles/Booking2/BookingPage2.css";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import Calendar from "./Calendar";
import BookingPath from "./BookingPath";
import QuantityPers from "./QuantityPers";
import { SelectedServiceContext } from "../../ServicesContext.js";
import "../../styles/BookingButtons.css";

const BookingPage2 = () => {

  const { selectedDate, checkedList } = useContext(SelectedServiceContext);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selectedDate) {
      // Check if a date is selected
      alert("Please select a date before proceeding.");
    } else {
      // Redirects to the next step if a date is selected
      navigate("/Booking3", { state: { checkedList}});
    }
  };

  const handleBack = () => {
    // Always allow navigation back to /Booking
    navigate("/Booking");
  };

  return(
      <div className="Date">
         
        <div className="content">

          <div className="booking2-img-container">
      
          <img src={booking2} alt= "Bath tools" className= "booking2-pic"/> 
          </div>
          <Layout/> 
          <BookingPath checkedList={checkedList}/>
          <Calendar/>
          <QuantityPers/>

          <div className="booking-buttons">
          <button className="booking-back-button" onClick={handleBack}>
            Back
          </button>
          <button className="booking-next-button" onClick={handleNext}>
             Next
          </button>
          
        </div>
          
        </div>
        
        
        
      </div>
    );
};
export default BookingPage2;