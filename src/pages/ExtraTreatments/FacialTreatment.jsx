import React from 'react';
import FacialTreatmentImage from '../../Pictures/facialTreatment.jpg';
import '../../styles/ExtraTreatments/FacialTreatment.css';

function FacialTreatment() {
    return (
        <div className="facial-treatment-block">
            <img src={FacialTreatmentImage} id="facialTreatment" alt="face" />
            <h2>Facial Treatment</h2>
            <div className="text-box">
                <p> Revitalize your skin and reveal your natural radiance with our 
                    Facial Treatment at Cloud Spa. Our expert aestheticians tailor each 
                    session to your skin's unique needs, utilizing premium products and advanced 
                    techniques to cleanse, exfoliate, and nourish. Step into luminosity and leave 
                    feeling refreshed, rejuvenated, and glowing from within.
                </p>
            </div>
        </div>
    );
}

export default FacialTreatment;