import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../../firebase-config";
import "../../styles/profile.css";
import ProfileTab from "../Profile/ProfileTab";
import AppointmentTab from "../Profile/AppointmentTab";
import HistoryTab from "../Profile/HistoryTab";

const Profile = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="Profile-container">
      <a
        onClick={() => {
          setTab(0);
        }}
      >
        Appiontments
      </a>
      <a
        onClick={() => {
          setTab(1);
        }}
      >
        Profile
      </a>
      <a
        onClick={() => {
          setTab(2);
        }}
      >
        History
      </a>
      {tab === 0 && <AppointmentTab />}
      {tab === 1 && <ProfileTab />}
      {tab === 2 && <HistoryTab />}
    </div>
  );
};

export default Profile;
