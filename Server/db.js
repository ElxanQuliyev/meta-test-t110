const { initializeApp }= require("firebase/app");
const { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED  }=require('firebase/firestore');
const config=require('./config');

const app = initializeApp(config.firebaseConfig);
const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  });

module.exports=db
