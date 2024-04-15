import React, { useEffect, useState } from "react";
import AboutUs from "./aboutUs";
import Footer from "../../components/footer";
import HomePagePicture from "../../Pictures/homePage.jpg";
import HomePagePicture2 from "../../Pictures/homePage2.png";
import HomePagePicture3 from "../../Pictures/homePage3.png";
import HomePagePicture4 from "../../Pictures/homePage4.png";
import HomePagePicture5 from "../../Pictures/homePage5.png";
import EventCalendar from "./eventCalendar";
import ExtraTreatments from "./extraTreatments";
import Services from "./services";
import "../../styles/home.css";

const images = [
  HomePagePicture,
  HomePagePicture2,
  HomePagePicture3,
  HomePagePicture4,
  HomePagePicture5
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const preloadImages = images.map((image) => {
      const img = new Image();
      img.src = image;
      return img;
    });

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="home-image-container">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Cloud Spa ${index + 1}`}
            className={`background-image ${
              index === currentImageIndex ? "visible" : "hidden"
            }`}
          />
        ))}
        <div className="centered-text">Cloud Spa</div>
        <div className="subtitle-text">
          Welcome to your oasis in the clouds.
        </div>
      </div>
      <Services />
      <ExtraTreatments />
      <AboutUs />
      <EventCalendar />
      <Footer />
    </>
  );
};

export default HomePage;
