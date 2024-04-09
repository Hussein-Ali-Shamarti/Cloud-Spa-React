import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../../../src/firebase-config";

const Signup = () => {
  const auth = getAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  function validateform(email, password) {
    if (email === "" || password == "") {
      return false;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error: ", errorCode, "-", errorMessage);
          // ..
        });
      return true;
    }
  }

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
            <a href="#">Forgot Password?</a>
          </div>
          <button className="btn" onClick={validateform}>
            Sign In
          </button>
          <div className="login-register">
            <p>
              Don't have an account yet?
              <a href="#" className="register-link">
                Create one now.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
