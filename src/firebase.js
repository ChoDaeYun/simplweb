import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
const config = {
  apiKey: "<apiKey>",
  authDomain: "<>authDomain",
  databaseURL: "<databaseURL>",
  projectId: "<projectId>",
  storageBucket: "<storageBucket>",
  messagingSenderId: "<messagingSenderId>"
};
firebase.initializeApp(config);
const settings = {timestampsInSnapshots: true};
// firebase.firestore().settings(settings);

export const db = firebase.database()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export default firebase;