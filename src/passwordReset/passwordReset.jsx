import React, { useState } from "react"; // Import useState here
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../../src/firebase-config";

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
    <div>
      <div className="input-box" style={{ marginTop: "300px" }}>
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
      <button onClick={handlePasswordReset}>Reset Password</button>
      <p>
        Go Back To:
        <a href="/MyPage" className="rform-box login">
          Sign in.
        </a>
      </p>
    </div>
  );
};

export default PasswordReset;
