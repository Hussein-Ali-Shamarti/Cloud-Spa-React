/*Author: 7032*/
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  getDatabase,
  connectDatabaseEmulator,
  ref,
  set,
  push,
  get,
  update,
  remove
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBNVgEqytqMzyE7t-xXHaNS1l7aIoIrwR0",
  authDomain: "cloudspa-262a4.firebaseapp.com",
  projectId: "cloudspa-262a4",
  storageBucket: "cloudspa-262a4.appspot.com",
  messagingSenderId: "560380076593",
  appId: "1:560380076593:web:fd22240e4d6beae732ab10",
  measurementId: "G-43X0MGCPMW",
  databaseURL: "http://127.0.0.1:4000/"
};
const app = initializeApp(firebaseConfig);
// Initialize services like Database, Auth, etc. here
const database = getDatabase(app);
connectDatabaseEmulator(database, "127.0.0.1", 9000);
export { app, database, ref, set, push, get, update, remove };
// Initialize Firebase
