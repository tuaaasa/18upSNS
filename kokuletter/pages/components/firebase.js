import firebase from 'firebase';
import CONFIG from './config.js';

const config = {
    apiKey: CONFIG.API_KEY,
    authDomain: CONFIG.AUTH_DOMAIN,
    databaseURL: CONFIG.DATABASE_URL,
    projectId: CONFIG.PROJECT_ID,
    storageBucket: CONFIG.STORAGE_BUCKET,
    messagingSenderId: CONFIG.MESSAGING_SENDER_ID,
};
firebase.initializeApp(config)

export default firebase;
