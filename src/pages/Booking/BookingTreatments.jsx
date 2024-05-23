//Author: 7030

import Booking1 from "../../Pictures/booking1.jpg";
import React, { useState, useContext, useEffect } from "react";
import { SelectedServiceContext } from "../../ServicesContext.js";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue} from "firebase/database";
import Layout from "../../components/layout.jsx";
import BookingPath from "../Booking2/BookingPath.jsx"
import "../../styles/Booking1.css";
import "../../styles/BookingButtons.css";
import '../../styles/Booking2/BookingPath.css';

const db = getDatabase();

const Booking = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [listData, setListData] = useState([]);
  const { selectedService, isNextClicked, setIsNextClicked } = useContext(SelectedServiceContext);
  const navigate = useNavigate();
  const location = useLocation();

//Function to access the database and get the information about bookingtreatments available and puts into a list.
useEffect(() => {
  const listDataRef = ref(db, "bookingtreatments");
  onValue(listDataRef, (snapshot) => {
    const data = snapshot.val() || {};
    const dataArray = Object.values(data);
    setListData(dataArray);
  });
}, []);

  // Function to handle the validation of selected services
  useEffect(() => {
  console.log("selectedService:", selectedService);
  console.log("checkedList:", checkedList);
    if (selectedService) {
      setCheckedList((prevList) =>[...prevList, selectedService]); // If selectedService has a value it is added to checkedList, checkedList is spread into an array
    };
  }, [selectedService]);

  // Function to handle the selection of treatment options
  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    console.log("Selected:", value, isChecked);
    if (isChecked) {
      // Add checked items into checklist
      setCheckedList((prevList) => [...prevList, value]);
    } else {
      // Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
    console.log("Updated checkedList", checkedList);
  };

  //Function to verify that at least one option is selected before continuing with the booking process
  const handleNext = () => {
    if (checkedList.length === 0) {
      const userConfirmed = window.confirm(
        "Please select at least one treatment before proceeding. Click OK to go back to the Booking page."
      );
      if (userConfirmed) {
        navigate("/Booking");
      }
    } else {
      setIsNextClicked(true);
      navigate("/Booking2", { state: { checkedList}});
    }
  };
  //Function to save the selected items when returning to the first step of the process
  useEffect(() => {
    if (location.state && location.state.checkedList) {
      setCheckedList(location.state.checkedList);
    }
  }, [location.state]);
  return (
    <div className="booking-page">
      <>
        <div className="booking-img-container">
          <img src={Booking1} alt="bath" className="booking1-image" />
        </div>
        <BookingPath checkedList={checkedList}/>
        <div className="booking-section">
          <div className="booking-card">
            <p className="booking-title">
              Indulge in extra treatments to elevate your Spa Experience:
            </p>
          </div>
          <div className="booking-card-body">
            <label className="selected-booking">You selected:</label>
            {checkedList.map((item, index) => {
              return (
                <div className="booking-chip" key={index}>
                  <p className="booking-chip-label">{item} </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="booking-body">
          {listData.map((item) => {
            return (
              <div key={item.id} className="booking-checkbox">
                <input
                  type="checkbox"
                  name="booking"
                  id={item.id}
                  value={item.value}
                  onChange={handleSelect}
                  checked={checkedList.includes(item.value)}
                />
                <label htmlFor={item.id}>{item.value}</label>
              </div>
            );
          })}
        </div>
        <div className="booking-buttons-treatments">
        <Link to="/" className="booking-cancel-button booking-cancel-button-treatments">
    Cancel
  </Link>
  <button className="booking-next-button booking-next-button-treatments" onClick={handleNext}>
    Next
  </button>
          
        </div>
      </>
    </div>
  );
};
<>
  <BookingPath />
  <Booking  />
  <Layout />
  
</>;
export default Booking;
