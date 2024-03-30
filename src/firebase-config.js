// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBNVgEqytqMzyE7t-xXHaNS1l7aIoIrwR0",
  authDomain: "cloudspa-262a4.firebaseapp.com",
  projectId: "cloudspa-262a4",
  storageBucket: "cloudspa-262a4.appspot.com",
  messagingSenderId: "560380076593",
  appId: "1:560380076593:web:fd22240e4d6beae732ab10",
  measurementId: "G-43X0MGCPMW",
};

const app = initializeApp(firebaseConfig);

// Initialize services like Database, Auth, etc. here
const database = getDatabase(app);

export { app, database };
// Initialize Firebase
