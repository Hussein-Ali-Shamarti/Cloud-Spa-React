import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail
} from "firebase/auth";

import "../../styles/ProfileTab.css";

const ProfileTab = () => {
  const [user, setUser] = useState(null); 
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState(""); // State for the update message

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
        setEmail(currentUser.email || "");
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (user) {
      const auth = getAuth();

      updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL
      })
        .then(() => {
          return updateEmail(auth.currentUser, email);
        })
        .then(() => {
          setUpdateMessage("Profile updated successfully!");
          setTimeout(() => setUpdateMessage(""), 3000); // Hide the message after 3 seconds
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("No authenticated user found.");
    }
  };

  return (
    <div className="profile-content">
      <h3>Personal info</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-groupProfile">
          <label className="form-label">Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-groupProfile">
          <label className="form-label">Photo URL:</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-groupProfile">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
      {updateMessage && (
        <div className="updateMessage">
          {updateMessage}
          <button onClick={() => setUpdateMessage("")}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
