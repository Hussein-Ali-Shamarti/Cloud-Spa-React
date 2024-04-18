import React, { useEffect } from "react";
import "../../styles/ContactUs/ContactContainer.css";

const ContactContainer = () => {   // Definerer en React funksjonell komponent kalt ContactContainer
  useEffect(() => {                 // useEffect krok for å kjøre side-effekter etter komponenten renders
    const form = document.getElementById("contact-form");  // Finner skjemaet i DOM-en ved bruk av dets ID
    form.addEventListener("submit", function (event) {      // Legger til en 'submit'-lytter på skjemaet
      event.preventDefault(); // Hindrer standard innsendingsatferd for skjemaet

      const name = document.getElementById("name").value.trim();  // Henter og trimmer navnverdien fra skjemaet
      const email = document.getElementById("email").value.trim();  // Henter og trimmer epostverdien fra skjemaet
      const message = document.getElementById("message").value.trim();  // Henter og trimmer meldingsverdien fra skjemaet

      if (name === "") {  // Sjekker om navn-feltet er tomt
        alert("Please fill out your name.");  // Viser en advarsel hvis navn-feltet er tomt
        return false;  // Avbryter funksjonen
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regulært uttrykk for å validere e-postadresser
      if (!emailPattern.test(email)) {  // Sjekker om e-postadressen matcher det regulære uttrykket
        alert("Please enter a valid email address.");  // Viser en advarsel hvis e-posten er ugyldig
        return false;  // Avbryter funksjonen
      }

      if (message === "") {  // Sjekker om meldings-feltet er tomt
        alert("Please write your message.");  // Viser en advarsel hvis meldings-feltet er tomt
        return false;  // Avbryter funksjonen
      }

      alert("Thank you for your message! We will contact you soon.");  // Viser en takkemelding
      form.submit(); // Sender skjemaet
    });
  }, []);  // En tom avhengighetsliste i useEffect betyr at effekten bare kjører en gang etter den første renderingen

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Have more questions?</h2>
        <p>Send the question you have here!</p>
      </div>
      <section className="contact-form">
        <form id="contact-form" action="submit_form.php" method="post">
          <div className="input-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Your message...</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};

export default ContactContainer;
