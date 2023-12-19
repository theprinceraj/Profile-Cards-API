import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// import dotenv from 'dotenv';
// dotenv.config();
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Updates the database with a new link pair.
 *
 * @param {string} originalUrl - The original URL to be stored in the database.
 * @param {string} shortUrl - The short URL to be stored in the database.
 * @return {Promise<void>} - A promise that resolves when the database is successfully updated.
 */
export default async function updateDatabase(originalUrl, shortUrl) {
    try {
        const docRef = await addDoc(collection(db, "LinkPairs"), {
            longForm: originalUrl,
            shortForm: shortUrl,
        })
        console.log("Document updated with ID: ", docRef.id);
    } catch (e) { console.error(e); }
}
// updateDatabase("lol", "lallu");

export async function fetchLongUrl(shortUrl) {
    try {
        const querySnapshot = await getDocs(collection(db, "LinkPairs"));
        for (let doc of querySnapshot.docs) {
            const DOC_DATA = doc.data();
            if (shortUrl === DOC_DATA.shortForm) {
                return DOC_DATA.longForm;
            }
        }
    } catch (error) { console.error(error); }
}
// console.log(await fetchLongUrl("lallu"));