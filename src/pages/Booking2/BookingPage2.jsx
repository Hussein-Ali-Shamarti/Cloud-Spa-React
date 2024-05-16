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

  const navigate = useNavigate();
  const handleNext2 = () => {
    navigate("/Booking3");
  };
  const handleBack2 = () => {
    navigate("/Booking");
  };

  const {checkedList} = useContext(SelectedServiceContext)

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
          <button className="booking-back-button" onClick={handleBack2}>
            Back
          </button>
          <button className="booking-next-button" onClick={handleNext2}>
             Next
          </button>
          
        </div>
          
        </div>
        
        
        
      </div>
    );
};
export default BookingPage2;