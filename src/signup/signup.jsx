import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  connectAuthEmulator
} from "firebase/auth";
import "firebase/auth";
import "../../src/firebase-config";
import { useState } from "react";

const auth = getAuth();
connectAuthEmulator(auth, "http://127.0.0.1:9099/auth");
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  function validateform(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      console.log("Vennligst fyll skjema");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          console.log("created");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          alert(errorMessage);
          // ..
        });
    }
  }

  return (
    <div className="form-box register" style={{ marginTop: "500px" }}>
      <h2>Registration</h2>
      <form id="registration-form">
        <div className="input-box">
          <span className="icon">
            <ion-icon name="person"></ion-icon>
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>First Name</label>
        </div>

        <div className="input-box">
          <span className="icon">
            <ion-icon name="person"></ion-icon>
          </span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Last Name</label>
        </div>

        <div className="input-box">
          <span className="icon">
            <ion-icon name="mail"></ion-icon>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-box">
          <span className="icon">
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button className="btn" onClick={validateform}>
          Register
        </button>
        <p>
          Already have an account?
          <a href="/MyPage" className="rform-box login">
            Sign in now.
          </a>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
