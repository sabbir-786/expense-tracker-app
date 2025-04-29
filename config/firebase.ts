// 1. Firebase core
import { initializeApp, getApps, getApp } from "firebase/app";

// 2. React Native AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// 3. Auth + RN persistence helper
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBXBddayWGLbpIFX-vjM2WcVAjIY_ckRFE",
    authDomain: "expense-tracker-2d478.firebaseapp.com",
    projectId: "expense-tracker-2d478",
    storageBucket: "expense-tracker-2d478.appspot.com",
    messagingSenderId: "99051619087",
    appId: "1:99051619087:web:933aa8f7f5c69fd30fb47a",
};

// Initialize Firebase only if it's not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
export const firestore = getFirestore(app);
