import React, { Profiler, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/layout";
import HomePage from "./pages/home/home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  getDatabase,
  ref,
  push,
  get,
  connectDatabaseEmulator
} from "firebase/database";
import "../src/firebase-config";
import spaServices from "../src/services.json";
import bookingTreatments from "../src/bookingtreatments.json";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import ContactPage from "./pages/ContactUs/ContactPage";
import ServicePage from "./pages/Services/ServicePage";
import Signup from "./pages/signup/signup";
import SignIn from "./pages/login/signin";
import PasswordReset from "./pages/passwordReset/passwordReset";
import Booking from "../src/pages/Booking/BookingTreatments";
import ExtraTreatmentsPage from "./pages/ExtraTreatments/ExtraTreatmentsPage";
import { SelectedServiceProvider } from "./ServicesContext";
import Profile from "./pages/Profile/profile";
import BookingPage2 from "./pages/Booking2/BookingPage2";
import Booking3Page from "./pages/Booking3/Booking3Page";
import OrderConfirmation from "./pages/Booking3/OrderConfirmation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const servicesRef = ref(db, "services");
    const bookingTreatmentsRef = ref(db, "bookingtreatments");
const auth = getAuth();

const unsubscribe = onAuthStateChanged(auth, (user) => {
  setUser(user);
});
    // Check if 'services' node exists
    get(servicesRef)
      .then((snapshot) => {
        console.log("Added before if:");
        if (!snapshot.exists()) {
          // 'services' node doesn't exist, upload the data
          console.log("Added document wit linje 26:");
          spaServices.forEach((service) => {
            push(servicesRef, service)
              .then((ref) => {
                console.log("Added document with ID:", ref.key);
              })
              .catch((error) => {
                console.error("Error adding document:", error);
              });
          });
        }
      }) // This was missing
      .catch((error) => {
        console.error("Error fetching services data:", error);
      });

      get(bookingTreatmentsRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          bookingTreatments.forEach((treatment) => {
            push(bookingTreatmentsRef, treatment)
              .catch((error) => {
                console.error("Error adding document:", error);
              });
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching booking treatments data:", error);
      });
      return () => unsubscribe();
    }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <SelectedServiceProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutUs" element={<AboutUsPage />}  />
            <Route path="/ContactUs" element={<ContactPage />} />
            <Route path="/Treatments" element={<ExtraTreatmentsPage />} />
            {!user && <Route path="/MyPage" element={<SignIn />} />}
            {user ? <Route path="/MyPage" element={<Profile />} /> : <Route path="/SignIn" element={<SignIn />} />}            <Route path="/Signup" element={<Signup />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/Services" element={<ServicePage />} />
            <Route path="/Booking" element={<Booking/>} />
            <Route path="/Booking2" element={<BookingPage2/>} />
            <Route path="/Booking3" element={<Booking3Page/>} />
            <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
            {<Route path="/profile" element={<Profile />} />}

            {<Route path="/Treatments/:serviceId" element={<ExtraTreatmentsPage />} />}

          </Routes>
          <Layout />
        </SelectedServiceProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
