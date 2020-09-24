import * as firebase from "firebase";

import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyATaBiRFcBiCdAL-41QwRjM8Jy0hWRkEBc",
  authDomain: "scheduler-app-cde7c.firebaseapp.com",
  databaseURL: "https://scheduler-app-cde7c.firebaseio.com",
  projectId: "scheduler-app-cde7c",
  storageBucket: "scheduler-app-cde7c.appspot.com",
  messagingSenderId: "329742274927",
  appId: "1:329742274927:web:d8ffa8221cbb4df1c5d89a",
  measurementId: "G-DKRMLLZW3B",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
