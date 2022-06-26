import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA6GwbTAqXIq8-f2JXHGo5w8Rf2Hjv8Me4",
    authDomain: "chat-app-390c3.firebaseapp.com",
    projectId: "chat-app-390c3",
    storageBucket: "chat-app-390c3.appspot.com",
    messagingSenderId: "533891402490",
    appId: "1:533891402490:web:2d1059dead5e0494645743"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const auth = getAuth();

export default app;

export { db, auth }