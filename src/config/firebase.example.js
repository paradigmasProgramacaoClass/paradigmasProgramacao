// Firebase Web Config — preencha com as chaves do projeto Firebase
// Copie este arquivo para firebase.js e substitua os valores

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "COLE_AQUI_SUA_API_KEY",
  authDomain: "paradigmas-8f1cb.firebaseapp.com",
  projectId: "paradigmas-8f1cb",
  storageBucket: "paradigmas-8f1cb.firebasestorage.app",
  messagingSenderId: "1072534030681",
  appId: "COLE_AQUI_SEU_APP_ID",
  measurementId: "COLE_AQUI_SEU_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);