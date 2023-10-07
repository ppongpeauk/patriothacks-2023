import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMCsPixYSL_uADjdVafFfWzrcySCWQ4u0",
  authDomain: "peerport-fe46c.firebaseapp.com",
  projectId: "peerport-fe46c",
  storageBucket: "peerport-fe46c.appspot.com",
  messagingSenderId: "926750400001",
  appId: "1:926750400001:web:0c4bac1309c45305496a00",
  measurementId: "G-HXJ66YR994",
};

const app = () => {
  const apps = getApps();
  if (apps.length < 1) {
    initializeApp(firebaseConfig);
  }
  return apps[0];
};

const auth = getAuth(app());

export default app;
export const initFirebase = () => {
  return app();
};
export { auth };
