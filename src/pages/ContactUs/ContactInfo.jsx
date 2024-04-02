import React from "react";
import "../../styles/AboutUs/ContactPage.css";
import ContactUsImage from "../../Pictures/contactUs.jpg"; 

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h1>Contact us</h1>
      <p>
        Feel free to give us a call or send an email if you have any questions!
      </p>
      <p>
        Phone: <a href="tel:+4733265734">+47 332 65 734</a>
      </p>
      <p>
        Email: <a href="mailto:CloudSpa@spa.com">CloudSpa@spa.com</a>
      </p>
      <p>Address: Ravieien 215, 3184 Borre</p>
      <div className="contact-image">
        <img
          src={ContactUsImage}
          alt="Contact Us Image"
          width="400"
          height="500"
          style={{ float: "right" }} 
        />
      </div>
    </div>
  );
};

export default ContactInfo;
