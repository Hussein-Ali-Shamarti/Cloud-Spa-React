/*Author: 7032*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  connectAuthEmulator
} from "firebase/auth";
import "../../firebase-config";
import "../../styles/SignUp.css"; // Make sure the path is correct

// Initialize Firebase Auth and connect to the emulator
const auth = getAuth();
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099/auth");
}
const SignUp = () => {
  // State hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const validateForm = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      console.log("Vennligst fyll skjema");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          console.log("created");
          navigate("/Mypage"); // Navigate to SignIn page on success
        })
        .catch((error) => {
          // Handle errors here
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          alert(errorMessage);
        });
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form-box">
        <h2>Registration</h2>
        <form onSubmit={validateForm}>
          <div className="signup-input-box">
            <span className="icon">
              <ion-icon name="person"></ion-icon>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="First Name" // Placeholder added here
            />
          </div>

          <div className="signup-input-box">
            <span className="icon">
              <ion-icon name="person"></ion-icon>
            </span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name" // Placeholder added here
            />
          </div>

          <div className="signup-input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email" // Placeholder added here
            />
          </div>

          <div className="signup-input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password" // Placeholder added here
            />
          </div>
          <button type="submit" className="signup-btn">
            Register
          </button>
          <p>
            Already have an account?
            <a href="/MyPage" className="link-to-signin">
              Sign in now.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
