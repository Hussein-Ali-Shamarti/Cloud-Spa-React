import React from "react";
import FacialTreatmentImage from "../../Pictures/facialTreatment.jpg";
import "../../styles/ExtraTreatments/FacialTreatment.css";

function FacialTreatment({ id }) {
  return (
    <div className="facial-treatment-block" id={id}>
      <div className="facial-treatment-text-block">
        <h2 className="facial-treatment-h2">Facial Treatment</h2>
        <div className="facial-treatment-text">
          <p>
            {" "}
            Revitalize your skin and reveal your natural radiance with our
            Facial Treatment at Cloud Spa. Our expert aestheticians tailor each
            session to your skin's unique needs, utilizing premium products and
            advanced techniques to cleanse, exfoliate, and nourish. Step into
            luminosity and leave feeling refreshed, rejuvenated, and glowing
            from within.
          </p>
        </div>
      </div>
      <img src={FacialTreatmentImage} id="facialTreatment" alt="face" />
    </div>
  );
}

export default FacialTreatment;
