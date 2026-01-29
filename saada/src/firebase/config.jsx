
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyD66WUwqhG1ISpllsPSJfb_zvBVUrTiOQg",
  authDomain: "saada-946fa.firebaseapp.com",
  projectId: "saada-946fa",
  storageBucket: "saada-946fa.firebasestorage.app",
  messagingSenderId: "119246142074",
  appId: "1:119246142074:web:6c29c7c1b992685e7999c3",
  measurementId: "G-BKGFVXSH5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);


export { analytics };
