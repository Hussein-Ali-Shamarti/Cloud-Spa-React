//Author: 7030

import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Booking2/BookingPath.css';
import { SelectedServiceContext } from '../../ServicesContext.js';

function BookingPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('');
  const [checkedList, setCheckedList] = useState(location.state ? location.state.checkedList || [] : []);
  const { selectedDate, isNextClicked } = useContext(SelectedServiceContext);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const handleLinkClick = (pathname) => {
    navigate(pathname, { state: { checkedList } });
  };

  return (
    <div className="booking-path">
      <div className="booking-step-indicator">
        <span
          className={`treatment-label ${currentPage === '/Booking' ? 'active-booking' : ''}`}
          onClick={() => handleLinkClick('/Booking')}
        >
          Treatments
        </span>
        <span
          className={`date-label ${currentPage === '/Booking2' ? 'active-booking' : ''}`}
          onClick={() => isNextClicked && handleLinkClick('/Booking2')} // Only allow navigation if Next is clicked
          style={{ cursor: isNextClicked ? 'pointer' : 'not-allowed' }} // Change cursor style based on Next button click
        >
          Date
        </span>
        <span
          className={`checkout-label ${currentPage === '/Booking3' ? 'active-booking' : ''}`}
          onClick={() => selectedDate && isNextClicked && handleLinkClick('/Booking3')} // Only allow checkout if date is selected
          style={{ cursor: selectedDate && isNextClicked ? 'pointer' : 'not-allowed' }} // Change cursor style based on selection
        >
          Check Out
        </span>
      </div>
    </div>
  );
}

export default BookingPath;
