import React from 'react';
import ClassicMassageImage from '../public/assets/Pictures/classicMassage.jpg';
import '../public/assets/styles/ExtraTreatmentsPage.css';

function ClassicMassage() {
    return (
        <div className="classic-massage-block">
            <img src={ClassicMassageImage} id="classicMassage" alt="shoulderMassage" />
            <h2>Classic Massage</h2>
            <div className="text-box">
                <p> Indulge in timeless relaxation with our Classic Massage treatment at Cloud Spa.
                    This traditional technique, tailored to your needs, soothes tired muscles,
                    relieves tension, and promotes overall well-being. Let our skilled therapists melt
                    away your stress, leaving you feeling refreshed, revitalized, and ready to take on
                    the world.
                </p>
            </div>
        </div>
    );
}

export default ClassicMassage;