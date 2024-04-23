import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../../styles/Booking2/BookingPath.css';

function BookingPath() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className="booking-path">
      <div className="booking-step-indicator">
        <Link to="/Booking">
          <span className={`treatment-label ${currentPage === '/Booking' ? 'active' : ''}`}>Treatments</span>
        </Link>
        <Link to="/Booking2">
          <span className={`date-label ${currentPage === '/Booking2' ? 'active' : ''}`}>Date</span>
        </Link>
        <Link to="/Booking3">
          <span className={`checkout-label ${currentPage === '/Booking3' ? 'active' : ''}`}>Check Out</span>
        </Link>
      </div>
    </div>
  );
}

export default BookingPath;