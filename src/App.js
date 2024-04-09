import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/layout";
import HomePage from "./pages/home/home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { getDatabase, ref, push, get } from "firebase/database";
import "../src/firebase-config";
import spaServices from "../src/services.json"; // Assuming this is a JSON file now
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import ContactPage from "./pages/ContactUs/ContactPage";
import Signup from "./pages/login/signup";

function App() {
  useEffect(() => {
    const db = getDatabase();
    const servicesRef = ref(db, "services");

    // Check if 'services' node exists
    get(servicesRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          // 'services' node doesn't exist, upload the data
          spaServices.forEach((service) => {
            push(servicesRef, service)
              .then((ref) => {
                console.log("Added document with ID:", ref.key);
              })
              .catch((error) => {
                console.error("Error adding document:", error);
              });
          });
        } else {
          console.log("Services data already exists in the database.");
        }
      })
      .catch((error) => {
        console.error("Error fetching services data:", error);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/ContactUs" element={<ContactPage />} />
          <Route path="/MyPage" element={<Signup />} />
        </Routes>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
