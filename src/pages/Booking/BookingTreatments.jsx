import Booking1 from "../../Pictures/booking1.jpg";
import React, { useState, useContext, useEffect } from "react";
import { SelectedServiceContext } from "../../ServicesContext.js";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { database, ref, push, set } from "../../firebase-config.js";
import Layout from "../../components/layout.jsx";
import BookingPath from "../Booking2/BookingPath.jsx"
import "../../styles/Booking1.css";
import "../../styles/BookingButtons.css";
import '../../styles/Booking2/BookingPath.css';

//The list of options for the user to select
const LIST_DATA = [
  { id: "1", value: "Classic Massage" },
  { id: "2", value: "Massage and Scrub" },
  { id: "3", value: "Hot stone massage" },
  { id: "4", value: "Facial Massage" },
  { id: "5", value: "Steam room" }
];
//Function to add the selected treatments to a list that confirms the selected choices.
const Booking = () => {
  const [checkedList, setCheckedList] = useState([]);
  const { selectedService } = useContext(SelectedServiceContext);
  const navigate = useNavigate(); // Bruk useNavigate-hook for å få tilgang til navigasjonsfunksjonalitet

  useEffect(() => {
  console.log("selectedService:", selectedService);
  console.log("checkedList:", checkedList);
    if (selectedService) {
      setCheckedList((prevList) => [...prevList, selectedService])
    }
  }, [selectedService]);

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

//  const auth = getAuth();
//if (process.env.NODE_ENV === "development") {
//  connectAuthEmulator(auth, "http://127.0.0.1:9099/auth");
//}

  //Function to store the selected treatments and the assigned ordernumber in the database
  //const saveOrderToDatabase = () => {
  //  const newOrderRef = push(ref(database, "orders"));
  //  const orderNumber = generateOrderNumber();
  //  set(newOrderRef, {
  //    orderNumber: orderNumber,
  //    selectedTreatments: checkedList
  //  })
  //    .then(() => {
  //      console.log("Order stored successfully!");
  //    })
  //    .catch((error) => {
  //      console.error("Error in storing order", error);
  //    });
  //};
  ////Function to generate a  random Order Number for each booking
  //const generateOrderNumber = () => {
  //  return Date.now() + Math.floor(Math.random() * 1000);
  //};

  
  //Function to verify that atleast one option is selected before continuing with the booking process
  const handleNext = () => {
    if (checkedList.length === 0) {
      const userConfirmed = window.confirm(
        "Please select at least one treatment before proceeding. Click OK to go back to the Booking page."
      );
      if (userConfirmed) {
        // Redirects to the page if no options are checked.
        navigate("/Booking");
      }
    } else {
      // Redirects to the next step if options are checked and the list is populated.
      navigate("/Booking2", { state: { checkedList}});
    }
  };

  return (
    <div className="booking-page">
      <>
        <div className="booking-img-container">
          <img src={Booking1} alt="bath" className="booking1-image" />
        </div>
        <BookingPath/>
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
          {LIST_DATA.map((item) => {
            return (
              <div key={item.id} className="booking-checkbox">
                <input
                  type="checkbox"
                  name="booking"
                  id={item.id}
                  value={item.value}
                  onChange={handleSelect}
                />
                <label htmlFor={item.id}>{item.value}</label>
              </div>
            );
          })}
        </div>
        <div className="booking-buttons">
        <Link to="/" className="booking-cancel-button">
    Cancel
  </Link>
  <button className="booking-next-button" onClick={handleNext}>
    Next
  </button>
          
        </div>
      </>
    </div>
  );
};
<>
  <BookingPath />
  <Booking />
  <Layout />
  
</>;
export default Booking;
