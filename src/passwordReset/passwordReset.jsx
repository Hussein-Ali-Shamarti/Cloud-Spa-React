import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../../src/firebase-config";
import "../../src/styles/passwordReset.css";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // ...
      });
  };

  return (
    <div className="passwordContainer">
      <div className="passwordInputBox">
        <p>You Will Recive An Email To Reset Your Password.</p>
        <span className="passwordIcon">
          <ion-icon name="mail"></ion-icon>
        </span>
        <input
          type="email"
          id="emailInput"
          className="passwordInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <button className="passwordButton" onClick={handlePasswordReset}>
          Reset Password
        </button>
        <p>
          Go Back To:
          <a href="/MyPage" className="passwordFormBoxLogin">
            Sign in.
          </a>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
