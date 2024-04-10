import React, { useState, useEffect } from "react";
import ourHistoryImage from "../../Pictures/ourHistory.jpg";
import "../../styles/OurStorySection.css";

const OurStorySection = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Side effect for managing click outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Get the modal element
      const storyEl = document.getElementById("story");
      // If modal is open and the clicked target is not inside the modal, close the modal
      if (isModalOpen && storyEl && !storyEl.contains(event.target)) {
        closeModal();
      }
    };

    // Add event listener when the modal is open
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or the modal is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]); // Dependency array ensures effect only runs if isModalOpen changes

  return (
    <div className="ourHistory-block">
      <img src={ourHistoryImage} alt="Our History" />
      <div id="our-story">
        <h1>Our story</h1>
        <div className="text-and-button">
          <p>
            At Cloud Spa, every tale is one of passion and dedication to
            wellness. Founded in 2024, we embraced a sanctuary where guests
            could escape the hustle and bustle of everyday life. Our journey is
            guided by passionate therapists providing exceptional treatments
            grounded...
          </p>
          <button onClick={openModal} id="button">
            Read more...
          </button>
        </div>
        {isModalOpen && (
          <div className="overlay" onClick={closeModal}>
            <div
              className="story"
              id="story"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="story-header">
                <h2 className="story-title">Our story</h2>
                <button onClick={closeModal} className="close-button">
                  &times;
                </button>
              </div>
              <div className="story-body">
                At Cloud Spa, our story is one of passion and dedication to
                wellness.<br></br> Founded in 2024, we envisioned a sanctuary where
                guests could escape the hustle and bustle of everyday life.<br></br> Our
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
