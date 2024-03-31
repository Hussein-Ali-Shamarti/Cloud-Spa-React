import React from 'react';
import aboutUsImage from '../../public/assets/Pictures/aboutUs.jpg';
import '../../public/assets/styles/AboutUs.css'; // Adjust path as necessary

const AboutUsBlock = () => {
    return (
        <div className="about-us-block">
            <img src={aboutUsImage} alt="Holding flowers" />
            <div id="about-us">
                <h1>About us</h1>
                <div className="text-box">
                    <p>Welcome to Cloud Spa, where tranquility meets innovation...</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsBlock;
