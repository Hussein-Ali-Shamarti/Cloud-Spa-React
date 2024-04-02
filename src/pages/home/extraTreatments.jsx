import classicMassage from "../../Pictures/classicMassage.jpg";
import "../../styles/extraTreatments.css";
import React from 'react';

const ExtraTreatments = () => {
  return (
    <>
      <section id="extra-treatments">
        <div className="container">
          <h2>Extra Treatments</h2>
          <div className="treatments-content">
            <div className="treatment-image">
              <img src={classicMassage} alt="Classic Massage" />
            </div>
            <div className="treatments-list">
              <ul>
                <li>
                  <a href="/classic-massage">Classic Massage</a>
                </li>
                <li>
                  <a href="/massage-and-scrub">Massage and Scrub</a>
                </li>
                <li>
                  <a href="/hot-stone-massage">Hot Stone Massage</a>
                </li>
                <li>
                  <a href="/facial-treatment">Facial Treatment</a>
                </li>
                <li>
                  <a href="/steam-room">Steam Room</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="read-more-container">
            <button className="read-more-btn-for-extra-treatments">
              Read more...
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExtraTreatments;
