import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  connectAuthEmulator
} from "firebase/auth";
import "firebase/auth";
import "../../../src/firebase-config";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="wrapper">
      <div className="form-box login " style={{ marginTop: "300px" }}>
        <h2>login</h2>
        <form>
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
          <div className="remember-forgot">
            <label>
              {" "}
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/PasswordReset">Forgot Password?</a>
          </div>
          <button className="btn">Sign In</button>
          <div className="login-register">
            <p>
              Don't have an account yet?
              <a href="/Signup" className="register-link">
                Create one now.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
