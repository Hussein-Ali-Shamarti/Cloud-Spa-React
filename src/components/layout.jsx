import CloudSpaTransaprent from "../Pictures/CloudSpaTransaprent.png";
import { useState } from "react";

const hamburger = document.querySelector(".hamburger");
const navItems = document.querySelector(".nav-items");
const closeNavItems = document.querySelector(".close-nav-items");

const Layout = () => {
  const [toggle, setToggle] = useState(false);

  function toggleNav() {
    setToggle(!toggle);
    //navItems.classList.toggle("open");
  }
  return (
    <header>
      <nav className="navigation">
        <a href="/" className="logo-container">
          <img src={CloudSpaTransaprent} alt="imagelogo" className="logoo" />
        </a>

        <div className={`nav-items ${toggle ? "open" : ""}`}>
          <a href="/Services">Services</a>
          <a href="/Treatments">Treatments</a>
          <a href="/AboutUs" >About us</a>
          <a href="/ContactUs">Contact us</a>
          <a href="/MyPage">My page</a>
          <button className="btnLogin-popup">Book Now</button>
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
