import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfigData from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId
};

const app = initializeApp(firebaseConfig);

// Specify the database ID when initializing Firestore if needed
// However, getFirestore only takes the app, we can use initializeFirestore to pass databaseId if necessary, 
// but typically the default db is fine unless we used a specific databaseId.
// Let's check if the databaseId is default. The config says "ai-studio-resolvea-d0a970f6-0833-4783-b625-430c883a52c0".
// We need to use initializeFirestore or getFirestore(app, databaseId).
export const db = getFirestore(app, firebaseConfigData.firestoreDatabaseId);
export const auth = getAuth(app);
