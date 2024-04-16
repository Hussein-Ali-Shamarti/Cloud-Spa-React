import CloudSpaTransaprent from "../Pictures/CloudSpaTransaprent.png";
import CloudLogoTransparent from "../Pictures/CloudSpaTransparent2.png";
import { useState } from "react";
import React from "react";
import { redirect, Route, useNavigate } from "react-router-dom";

const hamburger = document.querySelector(".hamburger");
const navItems = document.querySelector(".nav-items");
const closeNavItems = document.querySelector(".close-nav-items");

const Layout = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  function redirectToBooking() {
    console.log("redirected to booking page");
    navigate("/booking");
  }
  function toggleNav() {
    setToggle(!toggle);
    //navItems.classList.toggle("open");
  }
  return (
    <header>
      <nav className="navigation">
        <a href="/" className="logo-container">
          <img src={CloudLogoTransparent} alt="imagelogo" className="logoo" />
        </a>

        <div className={`nav-items ${toggle ? "open" : ""}`}>
          <a href="/Services">Services</a>
          <a href="/Treatments">Treatments</a>
          <a href="/AboutUs">About us</a>
          <a href="/ContactUs">Contact us</a>
          <a href="/MyPage">My page</a>
          <button
            onClick={() => {
              redirectToBooking();
            }}
            className="btnLogin-popup"
          >
            Book Now
          </button>
        </div>
        {!toggle && (
          <button
            className="hamburger"
            aria-label="Open the menu"
            onClick={toggleNav}
          >
            &#9776;
          </button>
        )}
        {toggle && (
          <button className="close-nav-items" onClick={toggleNav}>
            &#10005;
          </button>
        )}
      </nav>
    </header>
  );
};

export default Layout;
