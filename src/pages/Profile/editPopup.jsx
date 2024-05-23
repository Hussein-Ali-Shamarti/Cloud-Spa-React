/* Author: 7032 */

import "../../styles/editPopup.css";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";

const db = getDatabase();

const EditPopup = ({ orderIdToEdit, onClose, refreshAppointments }) => {
  orderIdToEdit = orderIdToEdit.toString();
  const [services, setServices] = useState([]);
  const [listData, setListData] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [extraTreatments, setExtraTreatments] = useState([]);
  const [oldOrder, setOldOrder] = useState(null);
  const [date, setDate] = useState("");
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const servicesRef = ref(db, "services");
    const listDataRef = ref(db, "bookingtreatments");

    onValue(servicesRef, (snapshot) => {
      if (snapshot.exists()) {
        setServices(Object.values(snapshot.val() || {}));
      } else {
        console.log("No services data available.");
      }
    });

    onValue(listDataRef, (snapshot) => {
      const data = snapshot.val() || {};
      setListData(Object.values(data));
    });

    onValue(ref(db, `orders/${orderIdToEdit}`), (snapshot) => {
      const data = snapshot.val();
      if (data && data.OrderDetails) {
        setOldOrder(data);
        setDate(convertDateFormat(data.OrderDetails.selectedDate));
        setSelectedService(data.OrderDetails.SelectedService || "");
        setExtraTreatments(data.OrderDetails.SelectedTreatments || []);
        setTotalSum(data.OrderDetails.totalSum || 0);
      } else {
        console.log("No order data available or OrderDetails missing.");
      }
    });
  }, [orderIdToEdit]);

  useEffect(() => {
    let sum = 0;
    if (selectedService) {
      const serviceInfo = services.find(
        (item) => item.Title === selectedService
      );
      if (serviceInfo) {
        sum += parseFloat(serviceInfo.price);
      }
    }
    extraTreatments.forEach((treatment) => {
      const treatmentInfo = listData.find((item) => item.value === treatment);
      if (treatmentInfo) {
        sum += parseFloat(treatmentInfo.price);
      }
    });
    setTotalSum(sum);
  }, [selectedService, extraTreatments, services, listData]);

  const handleSelectService = (event) => {
    setSelectedService(event.target.value);
  };

  const handleSelectTreatment = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setExtraTreatments((prevList) => [...prevList, value]);
    } else {
      setExtraTreatments((prevList) =>
        prevList.filter((item) => item !== value)
      );
    }
  };

  const editAppointment = () => {
    if (!selectedService) {
      alert("Please select a service");
      return;
    }

    const newOrder = {
      OrderDetails: {
        ...oldOrder.OrderDetails, // Copy existing details
        SelectedService: selectedService, // Update selected service
        SelectedTreatments: extraTreatments, // Update selected treatments
        selectedDate: date.toString(),
        totalSum: totalSum // Include the updated totalSum
      }
    };
    const orderRef = ref(db, `orders/${orderIdToEdit}`);

    update(orderRef, newOrder)
      .then(() => {
        console.log("Order updated successfully.");
        if (refreshAppointments) refreshAppointments(); // Refresh appointments in parent component
        if (onClose) onClose(); // Close the modal after successful update
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  const convertDateFormat = (dateStr) => {
    const [day, month, year] = dateStr.split(".");
    return `${year}-${month}-${day}`;
  };

  const CancelAppointmentChange = () => {
    if (onClose) onClose(); // Close the modal without making any changes
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="">
          <input
            type="date"
            placeholder="appointment date"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
            min={getCurrentDate()}
          />
        </div>
        <div className="">
          <label htmlFor="services">Services</label>
          <select
            name="services"
            id="services"
            onChange={handleSelectService}
            value={selectedService || "0"}
          >
            <option value="0" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.Title} value={service.Title}>
                {service.Title}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          {listData.map((item) => (
            <div key={item.id} className="">
              <input
                type="checkbox"
                name="booking"
                id={item.id}
                value={item.value}
                onChange={handleSelectTreatment}
                checked={extraTreatments.includes(item.value)}
              />
              <label htmlFor={item.id}>{item.value}</label>
            </div>
          ))}
        </div>
        <div className="Buttons-onModal">
          <button onClick={editAppointment}>Edit</button>
          <button onClick={CancelAppointmentChange}>Cancel</button>
        </div>
        <div className="total booking-summary-div">
          <p className="white-text">Total</p>
          <p className="white-text">NOK {totalSum}</p>
        </div>
        <p>Pay the difference on arrival or receive a refund for reductions.</p>
      </div>
    </div>
  );
};

export default EditPopup;
