import Footer from "../../components/footer";
import React from "react";
import booking2 from "../../Pictures/booking2.jpg";
import BookingPath from "./BookingPath";
import "../../styles/Booking2/Pic.css";

const BookingPage2 = () => {

    return(
      <div className="Date">
         
         <div className="content">
        <BookingPath/>
        <Footer/>
        </div>
        <div className="booking2-img-container">
      
           <img src={booking2} alt= "Bath tools" className= "booking2-pic"/>
        </div>
        
        
      </div>
    );
};
export default BookingPage2;