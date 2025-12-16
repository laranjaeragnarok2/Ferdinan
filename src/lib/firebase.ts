
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYS1IIt9Pc1_zoXRaGsv-u4sVdVN8vxbQ",
    authDomain: "ferdinan-a90a3.firebaseapp.com",
    projectId: "ferdinan-a90a3",
    storageBucket: "ferdinan-a90a3.firebasestorage.app",
    messagingSenderId: "11429967392",
    appId: "1:11429967392:web:639bae7456547f41bbae45",
    measurementId: "G-8DPGH3RSP7"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
