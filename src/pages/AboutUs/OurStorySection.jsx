import React, { useState } from "react";
import ourHistoryImage from "../public/assets/Pictures/ourHistory.jpg";
import "../public/assets/styles/AboutUs.css"; // Adjust path as necessary

const OurStorySection = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="ourHistory-block">
      <img src={ourHistoryImage} alt="Opening a book" />
      <div id="our-story">
        <h1>Our story</h1>
        <div className="text-and-button">
          <p>
            At Cloud Spa every tale is one of passion and dedication to
            wellness. Founded in 2024, we embraced a sanctuary where guests
            could escape the hustle and bustle of everyday life. Our journey is
            guided by passionate therapists providing exceptional treatments
            grounded...
          </p>
          <button onClick={toggleModal} id="button">
            Read more...
          </button>
        </div>
        {isModalOpen && (
          <div className="overlay" onClick={toggleModal}>
            <div
              className="story"
              id="story"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="story-header">
                <div className="story-title">Our story</div>
                <button onClick={toggleModal} className="close-button">
                  &times;
                </button>
              </div>
              <div className="story-body">
                At Cloud Spa, our story is one of passion and dedication to
                wellness. Founded in 2024, we envisioned a sanctuary where
                guests could escape the hustle and bustle of everyday life. Our
                journey is guided by a commitment to providing exceptional
                service, innovative treatments, and a serene atmosphere. Join us
                as we embark on a journey of relaxation and rejuvenation, high
                above the clouds.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurStorySection;
