import morningAwakeningSpa from "../../Pictures/morningAwakeningSpa.jpg";
import daytimeSpa from "../../Pictures/daytimeSpa.jpg";
import afternoonSpa from "../../Pictures/afternoonSpa.jpg";
import evningSpa from "../../Pictures/eveningSpa.jpg";
import nightSpa from "../../Pictures/booking1.jpg";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import "../../styles/services.css";
import { getDatabase, ref, onValue, get, push } from "firebase/database";
import "../../../src/firebase-config";
import React from "react";

// Read data from the root of your database and log it
const db = getDatabase();

const fetchTestValue = () => {
  const testRef = ref(db, "/"); // Adjust the path according to your database structure

  get(testRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val()); // Logs the value of 'test'
      } else {
        console.log("No data available at ow_drop_down/test");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    });
};

function imageName(Title) {
  let img = "";
  switch (Title) {
    case "Morning Awakening Spa":
      return (img = morningAwakeningSpa);
    case "Daytime Spa":
      return (img = daytimeSpa);
    case "Afternoon Spa":
      return (img = afternoonSpa);
    case "Evening Spa":
      return (img = evningSpa);
    case "Night Spa":
      return (img = nightSpa);
    default:
      return (img = evningSpa);
  }
}
const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [services, setServices] = useState([]);

  function getServices() {
    const db = getDatabase();
    const servicesRef = ref(db, "services");

    // Check if 'services' node exists
    get(servicesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const servicesData = [];
          snapshot.forEach((childSnapshot) => {
            const service = childSnapshot.val(); // Get the actual data
            servicesData.push(service); // Add it to the servicesData array
          });
          // Assuming `services` is initially an object with Firebase-generated keys
          const servicesArray = Object.values(servicesData);

          setServices(servicesArray); // Update your state with the services data
          console.log("Lagt til", servicesData);
        } else {
          console.log("No services data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching services data:", error);
      });
  }

  useEffect(() => {
    getServices();
  }, []);

  const handleNext = () => {
    sliderRef.current &&
      setCurrentIndex((prevIndex) => {
        const totalCards =
          sliderRef.current.querySelectorAll(".service-card").length;
        let nextIndex = prevIndex < totalCards - 3 ? prevIndex + 1 : 0;
        return nextIndex;
      });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  useEffect(() => {
    fetchTestValue();
    if (sliderRef.current) {
      const serviceCard = sliderRef.current.querySelector(".service-card");
      if (serviceCard) {
        const cardWidth = serviceCard.clientWidth;
        const newTransformValue = -(cardWidth * currentIndex);
        sliderRef.current.style.transform = `translateX(${newTransformValue}px)`;
      }
    }
  }, [currentIndex, services]);

  return (
    <>
      <section className="our-services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-wrapper">
            <div className="services-slider" ref={sliderRef}>
              {services.map(
                (
                  service,
                  index // Note the corrected usage here
                ) => (
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
                      <p className="service-price">
                        Just for {service.price}kr
                      </p>
                      <button className="service-book-btn">Book now</button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <BiSolidLeftArrow className="prev-arrow" onClick={handlePrev} />
          <BiSolidRightArrow className="next-arrow" onClick={handleNext} />
        </div>

        <div className="read-more-container">
          <button className="read-more-btn">Read more...</button>
        </div>
      </section>
    </>
  );
};

export default Services;
