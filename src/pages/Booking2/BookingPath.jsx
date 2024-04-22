import React from "react";
import "../../styles/Booking2/BookingPath.css";

const BookingPath = () => {

    return(
        <div className="booking-path">
          <div className="booking-step-indicator">
            <span className="treatment-label">Treatments</span>
            <span className="date-label">Date</span>
            <span className="checkout-label">Check Out</span>
          </div>
        </div>
    );
};
export default BookingPath;