import React, { useState, useEffect, useRef, useContext } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import morningAwakeningSpa from "../../Pictures/morningAwakeningSpa.jpg";
import daytimeSpa from "../../Pictures/daytimeSpa.jpg";
import afternoonSpa from "../../Pictures/afternoonSpa.jpg";
import eveningSpa from "../../Pictures/eveningSpa.jpg";
import nightSpa from "../../Pictures/booking1.jpg";
import "../../styles/services.css";
import "../../../src/firebase-config";
import { SelectedServiceContext } from "../../ServicesContext";
import { useNavigate } from "react-router-dom";

const db = getDatabase();

const imageName = (title) => {
  switch (title) {
    case "Morning Awakening Spa":
      return morningAwakeningSpa;
    case "Daytime Spa":
      return daytimeSpa;
    case "Afternoon Spa":
      return afternoonSpa;
    case "Evening Spa":
      return eveningSpa;
    case "Night Spa":
      return nightSpa;
    default:
      return eveningSpa;
  }
};

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [services, setServices] = useState([]);
  const { setSelectedService } = useContext(SelectedServiceContext);
  const navigate = useNavigate();

  const handleBookNow = (service) => {
    setSelectedService(service);
    navigate("/Booking");
  };
  useEffect(() => {
    const servicesRef = ref(db, "services");
    get(servicesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setServices(Object.values(snapshot.val() || {}));
        } else {
          console.log("No services data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching services data:", error);
      });
  }, []);

  const updateTransform = () => {
    if (sliderRef.current && services.length > 0) {
      const cards = sliderRef.current.querySelectorAll(".service-card");
      const targetCard = cards[currentIndex];
      if (targetCard) {
        const newTransformValue = -targetCard.offsetLeft;
        sliderRef.current.style.transform = `translateX(0px)`;
      }
    }
  };

  useEffect(updateTransform, [currentIndex, services.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % services.length;
      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? services.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  return (
    <>
      <section className="our-services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-wrapper" style={{ alignItems: "center" }}>
            <div className="services-slider" ref={sliderRef}>
              {services.map((service, index) => (
                <div className="service-card" key={index}>
                  <div className="service-image" data-title={service.Title}>
                    <img
                      src={imageName(service.Title)}
                      alt="Morning Awakening Spa"
                    />
                  </div>
                  <div className="service-info">
                    <h5 className="service-title">{service.Title}</h5>
                    <p className="service-time">
                      From {service.startTime} to {service.endtime}
                      <br />
                      {service.age} years age restriction at the spa
                    </p>
                    <p className="service-includes">
                      INCLUDED: {service.included}
                    </p>
                    <p className="service-price">Just for {service.price}kr</p>
                    <button
                      className="service-book-btn"
                      onClick={() => handleBookNow(service.Title)}
                    >
                      Book now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <BiSolidLeftArrow className="prev-arrow" onClick={handlePrev} /> */}
          {/* <BiSolidRightArrow className="next-arrow" onClick={handleNext} /> */}
        </div>

        <div className="read-more-container">
          <button className="read-more-btn">Read more...</button>
        </div>
      </section>
    </>
  );
};

export default Services;
