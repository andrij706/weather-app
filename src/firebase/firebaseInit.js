import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAFCKXiSEnm_aZxsJl4rqxdxkbRqIJfUEA",
    authDomain: "weatherapp-c5d71.firebaseapp.com",
    projectId: "weatherapp-c5d71",
    storageBucket: "weatherapp-c5d71.appspot.com",
    messagingSenderId: "939559448736",
    appId: "1:939559448736:web:b68624f43be002908099c5"
  }

  const app = initializeApp(firebaseConfig)

  const db = getFirestore(app)

  export default db