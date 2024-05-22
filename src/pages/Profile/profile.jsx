/*Author: 7032*/

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "../../firebase-config";
import "../../styles/profile.css";
import ProfileTab from "../Profile/ProfileTab";
import AppointmentTab from "../Profile/AppointmentTab";
import HistoryTab from "../Profile/HistoryTab";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home or login page after logout
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  return (
    <div className="Profile-container">
      <a onClick={() => setTab(0)}>Appointments</a>
      <a onClick={() => setTab(1)}>Profile</a>
      <a onClick={() => setTab(2)}>History</a>
      {tab === 0 && <AppointmentTab />}
      {tab === 1 && <ProfileTab />}
      {tab === 2 && <HistoryTab />}
      <div className="logout-button-container">
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
