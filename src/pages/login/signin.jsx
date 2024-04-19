import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../firebase-config";
import "../../styles/SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const userSignedIn = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      console.log(userSignedIn);
      window.alert("Login successful!"); // Alert for successful login
      navigate("/profile"); // Navigate after the alert
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        window.alert("User not found"); // Alert specifically for user not found
      } else {
        window.alert("Login failed: " + error.message); // General login failure message
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <h2>Login</h2>
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
              placeholder="Email"
            />
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
              placeholder="Password"
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a className="forgotPsw" href="/PasswordReset">
              Forgot Password?
            </a>
          </div>
          <button type="button" onClick={handleSignIn} className="btn">
            Sign In
          </button>
          <div className="login-register">
            <p>
              Don't have an account yet?
              <a href="/SignUp" className="register-link">
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
