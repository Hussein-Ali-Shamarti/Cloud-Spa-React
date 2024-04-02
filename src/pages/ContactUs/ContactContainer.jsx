import React, { useEffect } from "react";
import "../../styles/AboutUs/ContactPage.css";

const ContactContainer = () => {
  useEffect(() => {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents default form submission

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "") {
        alert("Please fill out your name.");
        return false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
      }

      if (message === "") {
        alert("Please write your message.");
        return false;
      }

      alert("Thank you for your message! We will contact you soon.");
      form.submit(); // Submit the form
    });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

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
