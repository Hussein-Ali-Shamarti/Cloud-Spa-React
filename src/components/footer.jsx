import CloudSpaTransparent from "../Pictures/CloudSpaTransaprent.png";
import React from 'react';

const Footer = () => {
  return (
    <section>
      <footer className="flex-container">
        <div className="box1 box">
          <img src={CloudSpaTransparent} alt="" />
          <ul className="subpages listItems">
            <li>
              <a href="#index.html"> Home</a>
            </li>
            <li>
              <a href="#Services.html"> Services</a>
            </li>
            <li>
              <a href="#Treatments.html">Treatments</a>
            </li>
            <li>
              <a href="#AboutUs.html"> About Us</a>
            </li>
            <li>
              <a href="#ContactUs.html">Contact Us</a>
            </li>
            <li>
              <a href="#mypage">My Page</a>
            </li>
          </ul>
        </div>
        <div className="box2 box">
          <ul className="subpages listItems">
            <li>Opening hours</li>
            <li>Weekdays: 08:00 - 22:00</li>
            <li>Weekend: 10:00 - 23:00</li>
          </ul>
        </div>
        <div className="box3 box">
          <ul className="contactUs listItems">
            <li>
              <i className="fas fa-phone"></i> <a href="#">+47 332 65 734</a>
            </li>
            <li>
              <i className="far fa-envelope"></i>{" "}
              <a href="#">CloudSpa@spa.com</a>
            </li>
          </ul>
        </div>
        <div className="box4 box">
          <ul id="socialMediaLinks">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-x-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <a href="#">Raveien 215, 3184 Borre</a>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
