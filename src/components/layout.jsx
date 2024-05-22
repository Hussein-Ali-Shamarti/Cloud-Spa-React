/*Author: 7032*/

import CloudSpaTransparent from "../Pictures/CloudSpaTransaprent.png";
import CloudLogoTransparent from "../Pictures/CloudSpaTransparent2.png";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  // Function to navigate and close the menu
  function handleNavClick(route) {
    navigate(route);
    setToggle(false); // This will close the navigation menu
  }

  return (
    <header>
      <nav className="navigation">
        <a
          href="/"
          className="logo-container"
          onClick={() => handleNavClick("/")}
        >
          <img
            src={CloudLogoTransparent}
            alt="Cloud Spa Logo"
            className="logoo"
          />
        </a>

        <div className={`nav-items ${toggle ? "open" : ""}`}>
          <a href="/Services" onClick={() => handleNavClick("/Services")}>
            Services
          </a>
          <a href="/Treatments" onClick={() => handleNavClick("/Treatments")}>
            Treatments
          </a>
          <a href="/AboutUs" onClick={() => handleNavClick("/AboutUs")}>
            About us
          </a>
          <a href="/ContactUs" onClick={() => handleNavClick("/ContactUs")}>
            Contact us
          </a>
          <a href="/MyPage" onClick={() => handleNavClick("/MyPage")}>
            My page
          </a>
          <button
            onClick={() => handleNavClick("/Services")} // Adjusted for navigation and closing menu
            className="btnLogin-popup"
          >
            Book Now
          </button>
        </div>
        {!toggle && (
          <button
            className="hamburger"
            aria-label="Open the menu"
            onClick={() => setToggle(true)}
          >
            &#9776;
          </button>
        )}
        {toggle && (
          <button className="close-nav-items" onClick={() => setToggle(false)}>
            &#10005;
          </button>
        )}
      </nav>
    </header>
  );
};

export default Layout;
