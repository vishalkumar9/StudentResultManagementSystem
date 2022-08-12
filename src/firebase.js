import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Get a reference to the database service
// const database = getDatabase(app);
export default app;

