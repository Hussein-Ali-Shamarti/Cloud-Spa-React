import React from "react";
import booking2 from "../../Pictures/booking2.jpg";
import "../../styles/Booking2/Pic.css";

import Layout from "../../components/layout";
import Calendar from "./Calendar";
import BookingPath from "./BookingPath";

const BookingPage2 = () => {

    return(
      <div className="Date">
         
        <div className="content">

          <div className="booking2-img-container">
      
          <img src={booking2} alt= "Bath tools" className= "booking2-pic"/> 
          </div>
          <Layout/> 
          <BookingPath/>
          <Calendar/>
          
        </div>
        
        
        
      </div>
    );
};
export default BookingPage2;