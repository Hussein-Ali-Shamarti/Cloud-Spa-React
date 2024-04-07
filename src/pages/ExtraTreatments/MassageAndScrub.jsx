import React from 'react';
import MassageAndScrubImage from '../public/assets/Pictures/massageAndScrub.jpg';
import '../public/assets/styles/ExtraTreatmentsPage.css';

function MassageAndScrub() {
    return (
        <div className="massage-and-scrub-block">
            <img src={MassageAndScrubImage} id="massageAndScrub" alt="ScrubBrush" />
            <h2>Massage and Scrub</h2>
            <div className="text-box">
                <p>Experience pure bliss with our Massage and Scrub treatment at Cloud Spa. 
                    Relax as skilled hands gently knead away tension with a soothing massage, 
                    followed by an invigorating scrub to exfoliate and renew your skin. 
                    Feel the stress melt away and emerge with a radiant glow, ready to embrace 
                    total relaxation.
                </p>
            </div>
        </div>
    );
}

export default MassageAndScrub;
