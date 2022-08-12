import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
    apiKey: "AIzaSyC9-zRqoM8hT76L62W1M6my5h8bArtzE7w",
    authDomain: "srms-91a09.firebaseapp.com",
    databaseURL: "https://srms-91a09-default-rtdb.firebaseio.com",
    projectId: "srms-91a09",
    storageBucket: "srms-91a09.appspot.com",
    messagingSenderId: "340128942885",
    appId: "1:340128942885:web:7fc3e7384da759b29ae8cc",
    measurementId: "G-10NKKERQYT"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Get a reference to the database service
// const database = getDatabase(app);
export default app;

