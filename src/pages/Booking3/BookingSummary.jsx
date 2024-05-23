//Author: 7030 and 7021

import React, { useState, useContext, useEffect } from "react";
import "../../styles/Booking3/BookingSummary.css";
import CalenderIcon from "../../Pictures/CalenderIcon.png";
import { SelectedServiceContext } from "../../ServicesContext.js";
import { useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue} from "firebase/database";

const BookingSummary = () => {
  const { selectedService, selectedDate, setSelectedDate, totalSum, setTotalSum, personCount } = useContext(SelectedServiceContext);
  const location = useLocation();
  const { checkedList } = location.state || {};
  const services = checkedList || [];
  const [listData, setListData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const navigate = useNavigate();
  const db = getDatabase();

  const changeDate = () => {
    // Go to booking2 to change date
    navigate("/Booking2", { state: { checkedList } });
  };

  //Function to access the database and get the information about bookingtreatments and services.
  useEffect(() => {
    const listDataRef = ref(db, "bookingtreatments");
    onValue(listDataRef, (snapshot) => {
      const data = snapshot.val() || {};
      const dataArray = Object.values(data);
      setListData(dataArray);
    });

    const servicesDataRef = ref(db, "services");
    onValue(servicesDataRef, (snapshot) => {
      const data = snapshot.val() || {};
      const dataArray = Object.values(data);
      setServicesData(dataArray);
    });
  }, [db]);

  //Function to take the price value from bookingtreatments and services and apply them to the results of the checkedList
  useEffect(() => {
    if (checkedList && checkedList.length > 0 && (listData.length > 0 || servicesData.length > 0)) {
      const combinedData = [...listData, ...servicesData];
      let sum = 0;
      if (Array.isArray(checkedList)) {
        checkedList.forEach((service) => {
          const serviceInfo = combinedData.find(item => item.value === service || item.Title === service);
          if (serviceInfo) {
            sum += parseFloat(serviceInfo.price);
          }
        });
      }
      setTotalSum(sum * personCount);
    } else {
      setTotalSum(0);
    }
  }, [checkedList, listData, servicesData, personCount, setTotalSum]); // Recalculate when selected services change


  useEffect(() => {
    // Retrieve selected date from localStorage on component mount
    const savedDate = localStorage.getItem('selectedDate');
    if (savedDate) {
      setSelectedDate(new Date(savedDate));
    }
  }, [setSelectedDate]);

  //Function to have the date persist through changes
  useEffect(() => {
    // Save selected date to localStorage whenever it changes
    if (selectedDate) {
      localStorage.setItem('selectedDate', selectedDate.toISOString());
    }
  }, [selectedDate]);

  //Function to format the date to DD/MM/YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0'); // Gets the day of the month as a two-digit string
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (adding 1 because months are zero-based) as a two-digit string
    const year = date.getFullYear(); // Gets the full year
    return `${day}.${month}.${year}`; // Sets the formating to DD.MM.YYYY
  };

  return (
    <div className="booking-summary-container booking-summary-div">
      <div className="booking-summary booking-summary-div">
        <h3 className="booking-summary-h3">
          <span className="booking-summary-span">your order</span>
        </h3>
        <div className="selected-choices booking-summary-div">
          <h4 className="booking-summary-h4">Selected Choices</h4>
          {services.map((item, index) => (
            <p className="booking-summary-p" key={index}>
              {item}
            </p>
          ))}
        </div>
        <div className="booking-summary-date booking-summary-div">
          <img src={CalenderIcon} />
          <p className="booking-summary-p">{selectedDate && formatDate(selectedDate)}</p>
          <button className="change-date-button" onClick={changeDate}>Change Date</button>
        </div>

        <div className="booking-summary-h3 booking-summary-div">
          <h3>
            <span className="booking-summary-span">summarization</span>
          </h3>
        </div>
        <div className="total booking-summary-div">
          <p className="white-text">Total</p>
          <p className="white-text">NOK {totalSum}</p>
        </div>
      </div>
    </div>
  );
};
//exports the function over to PaymentForm to format the selectedDate
export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0'); // Gets the day of the month as a two-digit string
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (adding 1 because months are zero-based) as a two-digit string
  const year = date.getFullYear(); // Gets the full year
  return `${day}.${month}.${year}`;
};
export default BookingSummary;
