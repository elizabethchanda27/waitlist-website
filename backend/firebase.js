// backend/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbkIUZwItTR5OmTMJPZwkcKAiu62BKg2s",
  authDomain: "waitlist-website-6b95a.firebaseapp.com",
  projectId: "waitlist-website-6b95a",
  storageBucket: "waitlist-website-6b95a.appspot.com",
  messagingSenderId: "414717254432",
  appId: "1:414717254432:web:d9d17caf90b16270d91545",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Export the db instance
export { firestore };
