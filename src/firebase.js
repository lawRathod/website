import * as firebase from "firebase/app";
import "firebase/firestore";

export default class fb {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: "AIzaSyDR76tdFD_pDba_Oenk9fLIuGkOFi08jBI",
        authDomain: "lawrathod.firebaseapp.com",
        databaseURL: "https://lawrathod.firebaseio.com",
        projectId: "lawrathod",
        storageBucket: "lawrathod.appspot.com",
        messagingSenderId: "130799637580",
        appId: "1:130799637580:web:3f98fbc62b9290745f10e9",
        measurementId: "G-7S5EDWH6BD",
      });
    }
  }
  getDb = () => {
    return firebase.firestore();
  };
}
