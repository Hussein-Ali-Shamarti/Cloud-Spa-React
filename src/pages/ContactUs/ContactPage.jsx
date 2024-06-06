import React from "react"; // Importerer React fra React-biblioteket
import ContactInfo from "./ContactInfo"; // Importerer ContactInfo-komponenten
import OpeningHours from "../../components/OpeningHours"; // Importerer OpeningHours-komponenten
import ContactContainer from "./ContactContainer"; // Importerer ContactContainer-komponenten
/* import "../../styles/ContactUs/ContactPage"; */ // Kommentarert ut import av CSS-stiler for ContactPage

import Footer from "../../components/footer"; // Importerer Footer-komponenten

const ContactPage = () => { // Definerer ContactPage-komponenten
  return ( // Returnerer JSX som representerer utseendet til kontaktssiden
    <main>
      <ContactInfo />
      <OpeningHours />
      <ContactContainer />
      <Footer />
    </main>
  );
};

export default ContactPage;
