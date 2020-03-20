import config from './firebaseServiceConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


firebase.initializeApp(config);
firebase.firestore().settings({
    timestampsInSnapshots: true
  })
// this.db = firebase.database();
// this.auth = firebase.auth();


export const Firebase = firebase;
export const FireStore = firebase.firestore();
export const Storage = firebase.storage();
// export const  GOOGLE_APPLICATION_CREDENTIALS="./firebaseService/marcustest-db4c8-firebase-adminsdk-dmvrt-78b77f9fab.json"
