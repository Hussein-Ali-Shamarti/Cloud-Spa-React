import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Booking2/BookingPath.css';

function BookingPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('');
  const [checkedList, setCheckedList] = useState(location.state ? location.state.checkedList || [] : []);

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
          onClick={() => handleLinkClick('/Booking2')}
        >
          Date
        </span>
        <span
          className={`checkout-label ${currentPage === '/Booking3' ? 'active-booking' : ''}`}
          onClick={() => handleLinkClick('/Booking3')}
        >
          Check Out
        </span>
      </div>
    </div>
  );
}

export default BookingPath;
