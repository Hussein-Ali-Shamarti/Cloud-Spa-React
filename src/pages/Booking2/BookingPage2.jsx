import Footer from "../../components/footer";
import React from "react";
import booking2 from "../../Pictures/booking2.jpg";
import BookingPath from "./BookingPath";
import "../../styles/Booking2/pic.css";

const BookingPage2 = () => {

    return(
      <div>
        <div className= "booking2-pic">
           <img src={booking2} alt= "Booking 2 picture"/>
        </div> 
        
        <Footer/>
        <BookingPath/>
      </div>
    );
};
export default BookingPage2;