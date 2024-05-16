import React, { useEffect } from "react";
import "../../styles/ContactUs/ContactContainer.css";
import { getDatabase, ref, push } from "firebase/database";

const ContactContainer = () => {
  useEffect(() => {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const db = getDatabase();
      const contactRef = ref(db, "contacts"); // Define a reference to the 'contacts' node

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
        alert("All fields are required.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Push data to Firebase Realtime Database
      push(contactRef, { name, email, message })
        .then(() => {
          alert("Thank you for your message! We will contact you soon.");
          form.reset(); // Reset the form after successful submission
        })
        .catch((error) => {
          alert("Failed to send message: " + error.message);
        });
    });

    return () => form.removeEventListener("submit"); // Clean up listener on component unmount
  }, []);

  return (
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
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};

export default ContactContainer;
