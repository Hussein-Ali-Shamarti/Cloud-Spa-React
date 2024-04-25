import React, { useContext } from "react";
import fullDaySpa from "../../Pictures/fullDaySpa.jpg";
//import "../../styles/Services/FdsBlock.css";
import { useNavigate } from "react-router-dom";
import { SelectedServiceContext } from "../../ServicesContext";

const FdsBlock = () => {
  const navigate = useNavigate(); // Bruk useNavigate hook for å få tilgang til navigere funksjonen
  
  const { setSelectedService } = useContext(SelectedServiceContext); // Tillater at man kan overføre inputs til andre filer
  const FDStitle = "Full Day Spa Retreat"; // Gjør tittelen til en constant som kan sendes til andre filer
  
  const handleBookNow = (service) => {
    setSelectedService(service);
    navigate("/Booking");
  };

  return (
    <div className="full-day-spa-container">
      <img src={fullDaySpa} alt="Full day Spa Retreat" />

      <div className="FDS-info">
        <h4 className="FDS-title" >{FDStitle}</h4>
        {"\n"}

        <p className="FDS-text-box">
          INCLUDED: Spa/gym access, all meal times, daily spa activities, tea &
          water, complimentary use of bathrobe and slippers.
        </p>
        {"\n"}
        <p className="FDS-price">Just for 1000kr</p>
        {"\n"}
        <button className="FDS-book-btn" 
          onClick={() =>handleBookNow(FDStitle)}
          >
            Book now
            </button>
      </div>
    </div>
  );
};

export default FdsBlock;
