import React from "react";
import booking2 from "../../Pictures/booking2.jpg";
import "../../styles/Booking2/Pic.css";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/layout";
import Calendar from "./Calendar";
import BookingPath from "./BookingPath";
import QuantityPers from "./QuantityPers";
import "../../styles/BookingButtons.css";

const BookingPage2 = () => {

  const navigate = useNavigate();
  const handleNext2 = () => {
    navigate("/Booking3");
  };

    return(
      <div className="Date">
         
        <div className="content">

          <div className="booking2-img-container">
      
          <img src={booking2} alt= "Bath tools" className= "booking2-pic"/> 
          </div>
          <Layout/> 
          <BookingPath/>
          <Calendar/>
          <QuantityPers/>

          <div className="booking-buttons">
          <Link to="/" className="booking-cancel-button">
            Cancel
          </Link>
          <button className="booking-next-button" onClick={handleNext2}>
             Next
          </button>
          
        </div>
          
        </div>
        
        
        
      </div>
    );
};
export default BookingPage2;