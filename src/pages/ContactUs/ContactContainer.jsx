import React, { useEffect } from "react"; // Importer React og useEffect fra React-biblioteket
import "../../styles/ContactUs/ContactContainer.css"; // Importer CSS-stiler
import { getDatabase, ref, push } from "firebase/database"; // Importer funksjoner fra Firebase Database-biblioteket

const ContactContainer = () => { // Definer ContactContainer-komponenten
  function sendForm() { // Definer sendForm-funksjonen for å håndtere form-submitteringen
    const form = document.getElementById("contact-form"); // Hent skjemaet med ID "contact-form"
    form.addEventListener("submit", function (event) { // Legg til en event listener for submit-hendelsen
      event.preventDefault(); // Forhindre standard handling på skjemaet

      const db = getDatabase(); // Få referanse til Firebase-databasen
      const contactRef = ref(db, "contacts"); // Definer en referanse til "contacts"-noden i databasen

      const name = document.getElementById("name").value.trim(); // Hent og trim verdien av navnefeltet
      const email = document.getElementById("email").value.trim(); // Hent og trim verdien av e-postfeltet
      const message = document.getElementById("message").value.trim(); // Hent og trim verdien av meldingsfeltet

      if (name === "" || email === "" || message === "") { // Sjekk om noen av feltene er tomme
        alert("All fields are required."); // Vis en alert hvis noen av feltene er tomme
        return; // Avbryt funksjonen
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Definer et regex-mønster for å validere e-postadresser
      if (!emailPattern.test(email)) { // Sjekk om e-postadressen er gyldig
        alert("Please enter a valid email address."); // Vis en alert hvis e-postadressen ikke er gyldig
        return; // Avbryt funksjonen
      }

      // Push data til Firebase Realtime Database
      push(contactRef, { name, email, message }) // Send dataen til Firebase
        .then(() => { // Håndter suksess
          alert("Thank you for your message! We will contact you soon."); // Vis en suksessmelding
          form.reset(); // Tilbakestill skjemaet etter vellykket innsending
        })
        .catch((error) => { // Håndter feil
          alert("Failed to send message: " + error.message); // Vis en feilmelding
        });
    });

    return () => form.removeEventListener("submit"); // Fjern event listener når komponenten avmonteres
  }

  return ( // Returner JSX som representerer utseendet til kontaktskjemaet
    <div className="contact-container">
      <div className="contact-header">
        <h2>Have more questions?</h2>
        <p>Send the question you have here!</p>
      </div>
      <section className="contact-form">
        <form id="contact-form">
          <div className="input-row">
            <div className="form-group1">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group1">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="form-group1">
            <label htmlFor="message">Your message...</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" onClick={sendForm}>
            Send
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactContainer; // Eksporter ContactContainer som standard
