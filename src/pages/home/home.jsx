import AboutUs from "../../components/aboutUs";
import Footer from "../../components/footer";
import HomePagePicture from "../../Pictures/homePage.jpg";
import EventCalendar from "./eventCalendar";
import ExtraTreatments from "./extraTreatments";
import Services from "./services";
import "../../styles/home.css";

const HomePage = () => {
  return (
    <>
      <div className="image-container">
        <img
          src={HomePagePicture}
          alt="Cloud Spa"
          className="background-image"
        />
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
