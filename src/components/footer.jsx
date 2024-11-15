/*Author: 7032*/

import CloudSpaTransparent from "../Pictures/CloudSpaTransaprent.png";
import CloudLogoTransparent from "../Pictures/CloudSpaTransparent2.png";
import React from "react";

const Footer = () => {
  return (
    <section>
      <footer className="flex-container">
        <div className="box box1">
          <img src={CloudLogoTransparent} alt="Cloud Spa Logo" />
          <ul className="listItems">
            <li>
              <a href="/"> Home</a>
            </li>
            <li>
              <a href="/Services"> Services</a>
            </li>
            <li>
              <a href="/Treatments">Treatments</a>
            </li>
            <li>
              <a href="/AboutUs"> About Us</a>
            </li>
            <li>
              <a href="/ContactUs">Contact Us</a>
            </li>
            <li>
              <a href="/MyPage">My Page</a>
            </li>
          </ul>
        </div>
        <div className="box box2">
          <ul className="listItems">
            <li>Opening hours</li>
            <li>Weekdays: 08:00 - 22:00</li>
            <li>Weekend: 10:00 - 23:00</li>
          </ul>
        </div>
        <div className="box box3">
          <ul className="listItems">
            <li>
              <i className="fas fa-phone"></i>{" "}
              <a href="tel:+4733265734">+47 332 65 734</a>
            </li>
            <li>
              <i className="far fa-envelope"></i>{" "}
              <a href="mailto:CloudSpa@spa.com">CloudSpa@spa.com</a>
            </li>
          </ul>
        </div>
        <div className="box box4">
          <ul className="socialMediaLinks">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
          <ul className="listItems">
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
