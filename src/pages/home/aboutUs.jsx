import aboutUs from "../../Pictures/aboutUs.jpg";
import "../../styles/AboutUs.css";
import React from "react";

const AboutUs = () => {
  return (
    <section>
      <div className="home-about-us-section">
        <div className="home-about-us-content">
          <h2>About Us</h2>
          <p>
            Our expert therapists provide personalized experiences for your
            relaxation needs.
          </p>
          <a
            href="link-to-more-information.html"
            className="home-read-more-button-for-about-us"
          >
            Read more...
          </a>
        </div>
        <div className="home-about-us-image">
          <img src={aboutUs} alt="Hands holding a flower" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
