import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../firebase-config";
import "../../styles/SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load the stored email if remember is true
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const userSignedIn = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      console.log(userSignedIn);
      window.alert("Login successful!");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        window.alert("User not found");
      } else {
        window.alert("Login failed: " + error.message);
      }
    }
  };

  const handleRememberMe = (e) => {
    setRemember(e.target.checked);
    if (e.target.checked) {
      // Save email to localStorage
      localStorage.setItem("email", email);
    } else {
      // Remove email from localStorage
      localStorage.removeItem("email");
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
              <input
                type="checkbox"
                checked={remember}
                onChange={handleRememberMe}
              />{" "}
              Remember Me
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
              <br/>Create one now
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
