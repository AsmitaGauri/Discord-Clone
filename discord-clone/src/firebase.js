//For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDHVo-niH2KvBf8KLoe7gj8hf2wcwwAeT0",
  authDomain: "discord-clone-e7fbb.firebaseapp.com",
  databaseURL: "https://discord-clone-e7fbb.firebaseio.com",
  projectId: "discord-clone-e7fbb",
  storageBucket: "discord-clone-e7fbb.appspot.com",
  messagingSenderId: "118332145977",
  appId: "1:118332145977:web:219799bf63fa5e279968e8",
  measurementId: "G-GPVMZQD98H"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();

const auth=firebase.auth();

const provider=new firebase.auth.GoogleAuthProvider();

export {auth,provider};

export default db;

