import React from "react";
import ContactInfo from "./ContactInfo";
import OpeningHours from "../../components/OpeningHours";
import ContactContainer from "./ContactContainer";
import "../../styles/AboutUs/ContactPage.css";
import Footer from "../../components/footer";

const ContactPage = () => {
  return (
    <main>
      <ContactInfo />
      <OpeningHours />
      <ContactContainer />
      <Footer />
    </main>
  );
};

export default ContactPage;
