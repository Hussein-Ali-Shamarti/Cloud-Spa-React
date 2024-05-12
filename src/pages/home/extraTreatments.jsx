import classicMassage from "../../Pictures/classicMassage.jpg";
import "../../styles/extraTreatments.css";
import React from 'react';
import { Link } from 'react-router-dom';

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
                  <Link to="/Treatments/ClassicMassage">Classic Massage</Link>
                </li>
                <li>
                  <Link to="/Treatments/Massage-and-scrub">Massage and Scrub</Link>
                </li>
                <li>
                  <Link to="/Treatments/hot-stone-massage">Hot Stone Massage</Link>
                </li>
                <li>
                  <Link to="/Treatments/facial-treatment">Facial Treatment</Link>
                </li>
                <li>
                  <Link to="/Treatments/steam-room">Steam Room</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="read-more-container">
            <Link to="/Treatments"className="read-more-btn-for-extra-treatments">
              Read more...
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExtraTreatments;
