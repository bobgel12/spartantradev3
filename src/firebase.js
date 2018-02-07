import firebase from 'firebase';


// Initialize Firebase
const config = {
  apiKey: "AIzaSyCuRETZyaUdJV2eH36781iTl93xz2_Gr-w",
  authDomain: "spantantrade.firebaseapp.com",
  databaseURL: "https://spantantrade.firebaseio.com",
  projectId: "spantantrade",
  storageBucket: "spantantrade.appspot.com",
  messagingSenderId: "697800608507"
};
firebase.initializeApp(config);



export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();


export default firebase;
