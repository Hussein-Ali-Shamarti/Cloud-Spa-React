import React from "react";
import ContactInfo from "./ContactInfo";
import OpeningHours from "./OpeningHours";
import ContactContainer from "./ContactContainer";
import "../../styles/AboutUs/ContactPageç.css";

const ContactPage = () => {
  return (
    <main>
      <ContactInfo />
      <OpeningHours />
      <ContactContainer />
    </main>
  );
};

export default ContactPage;
