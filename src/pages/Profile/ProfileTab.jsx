import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail
} from "firebase/auth";

import "../../styles/ProfileTab.css";

const ProfileTab = () => {
  const [user, setUser] = useState(null); // State to hold the current user
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Set the user and initial form values to the current user's profile data
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
        setEmail(currentUser.email || "");
      } else {
        // Handle the case where there is no user signed in
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    if (user) {
      const auth = getAuth();

      // Update the user's profile information
      updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL
      })
        .then(() => {
          // Profile updated successfully, now update email
          return updateEmail(auth.currentUser, email);
        })
        .then(() => {
          // Email updated successfully
        })
        .catch((error) => {
          // An error occurred while updating the profile or email, handle it here
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
          {/*
                    <img
            src={photoURL}
            alt="User Submitted"
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
          */}
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
    </div>
  );
};

export default ProfileTab;
