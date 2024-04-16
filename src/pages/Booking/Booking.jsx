import Booking1 from "../../Pictures/booking1.jpg";
import React, { useState } from "react";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { database, ref, push, set } from "../../../src/firebase-config.js";
import Layout from "../../components/layout";
import "../../styles/Booking1.css";
import "../../styles/BookingButtons.css";

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

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add checked items into checklist
      setCheckedList([...checkedList, value]);
    } else {
      // Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };
  const auth = getAuth();
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099/auth");
}

  //Function to store the selected treatments and the assigned ordernumber in the database
  const saveOrderToDatabase = () => {
    const newOrderRef = push(ref(database, "orders"));
    const orderNumber = generateOrderNumber();
    set(newOrderRef, {
      orderNumber: orderNumber,
      selectedTreatments: checkedList
    })
      .then(() => {
        console.log("Order stored successfully!");
      })
      .catch((error) => {
        console.error("Error in storing order", error);
      });
  };
  //Function to generate a  random Order Number for each booking
  const generateOrderNumber = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  //Function to verify that atleast one option is selected before continuing  with the booking process
  const handleNext = () => {
    if (checkedList.length == 0) {
      const userConfirmed = window.confirm(
        "Please select at least one treatment before proceeding. Click OK to go back to the Booking page."
      );
      if (userConfirmed) {
        window.location.href = "/Booking";
      }
    } else {
      saveOrderToDatabase();
      window.location.href = "/Booking2";
    }
  };

  return (
    <div className="booking-page">
      <>
        <div className="booking-img-container">
          <img src={Booking1} alt="bath" className="booking1-image" />
        </div>
        <div className="booking-path">
          <div className="booking-step-indicator">
            <span className="treatment-label">Treatments</span>
            <span className="date-label">Date</span>
            <span className="checkout-label">Check Out</span>
          </div>
        </div>
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
          <a href="/" class="booking-cancel-button">
            Cancel
          </a>
          <a class="booking-next-button" onClick={handleNext}>
            Next
          </a>
        </div>
      </>
    </div>
  );
};
<>
  <Booking />
  <Layout />
</>;
export default Booking;
