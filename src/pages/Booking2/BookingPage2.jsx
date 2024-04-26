import React from "react";
import booking2 from "../../Pictures/booking2.jpg";
import "../../styles/Booking2/Pic.css";
import BookingPath2 from "./BookingPath2";
import Layout from "../../components/layout";
import Calendar from "./Calendar"

const BookingPage2 = () => {

    return(
      <div className="Date">
         
        <div className="content">

          <div className="booking2-img-container">
      
          <img src={booking2} alt= "Bath tools" className= "booking2-pic"/> |
          </div>
          <Layout/> 
          <BookingPath2/>
          <Calendar/>
          
        </div>
        
        
        
      </div>
    );
};
export default BookingPage2;