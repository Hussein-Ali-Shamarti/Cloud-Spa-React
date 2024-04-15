import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

// Use window.location to address ESLint's no-restricted-globals rule
const hostname = window.location.hostname;
const search = window.location.search;

// Determine the environment and set the databaseURL accordingly
const isDevelopment = hostname === "localhost";
const databaseURL = isDevelopment
  ? "http://127.0.0.1:4000"
  : "https://cloudspa-262a4-default-rtdb.firebaseio.com";

const firebaseConfig = {
  apiKey: "AIzaSyBNVgEqytqMzyE7t-xXHaNS1l7aIoIrwR0",
  authDomain: "cloudspa-262a4.firebaseapp.com",
  projectId: "cloudspa-262a4",
  storageBucket: "cloudspa-262a4.appspot.com",
  messagingSenderId: "560380076593",
  appId: "1:560380076593:web:fd22240e4d6beae732ab10",
  measurementId: "G-43X0MGCPMW",
  databaseURL: databaseURL
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Optionally connect to the emulator if in development environment
if (isDevelopment) {
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
  console.log("Connected to the Firebase Emulator");
} else {
  console.log("Connected to the Firebase Realtime Database");
}

export { app, database };
