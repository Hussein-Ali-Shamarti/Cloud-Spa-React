import React, { useState } from "react";
import "../../styles/HistoryTab.css"; // make sure this path is correct

const HistoryTab = () => {
  const history = [
    {
      OrderNr: 123,
      CustomerName: "Hussein",
      Date: "21.03.2024",
      Time: "17:00",
      Services: ["Evening Spa", "Classic Massage", "Steam Room"]
    },
    {
      OrderNr: 124,
      CustomerName: "Hussein",
      Date: "04.03.2024",
      Time: "10:30",
      Services: ["Evening Spa", "Classic Massage"]
    },
    {
      OrderNr: 125,
      CustomerName: "Hussein",
      Date: "10.03.2024",
      Time: "10:30",
      Services: ["Steam Room", "Classic Massage"]
    }
  ];

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <div className="history-container">
      <div className="history-list">
        <h1>Your Appointment History</h1>
        <div className="appointment-items">
          {history.map((item, index) => (
            <div
              key={index}
              className={`appointment-item ${
                selectedAppointment === item ? "selected" : ""
              }`}
              onClick={() => setSelectedAppointment(item)}
            >
              Appointment {item.Date}
            </div>
          ))}
        </div>
      </div>
      {selectedAppointment && (
        <div className="appointment-details">
          <h2>Appointment {selectedAppointment.Date}:</h2>
          <p>OrderNr: {selectedAppointment.OrderNr}</p>
          <p>Date: {selectedAppointment.Date}</p>
          <p>Time: {selectedAppointment.Time}</p>
          <p>Customer Name: {selectedAppointment.CustomerName}</p>
          <ul>
            <medium className="order-details-header">Order Details:</medium>
            {selectedAppointment.Services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
