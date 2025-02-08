// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzi3HSEvBzklbofsy5Wz1NMnhp_Ptf2ZY",
  authDomain: "bookmytable-1.firebaseapp.com",
  projectId: "bookmytable-1",
  storageBucket: "bookmytable-1.firebasestorage.app",
  messagingSenderId: "327560994169",
  appId: "1:327560994169:web:47dc51631942bc9a9463a8",
  measurementId: "G-J1K1DEP2LR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function storeBooking(data) {
  try {
    const docRef = await addDoc(collection(db, "booking"), data);
    return "Document written with ID: " + docRef.id;
  } catch (e) {
    return "Error adding document: " + e;
  }
}

async function getBooking() {
  try {
    const bookingCol = collection(db, "booking");
    const bookingSnapshot = await getDocs(bookingCol);
    const bookingList = bookingSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return bookingList;
  } catch (e) {
    return "Error getting documents: " + e;
  }
}

async function deleteBooking(bookingId) {
  try {
    await deleteDoc(doc(db, "booking", bookingId));
    console.log("Booking deleted successfully:", bookingId);
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
}

export { storeBooking, getBooking, deleteBooking };
