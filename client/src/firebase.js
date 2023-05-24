import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey:"AIzaSyDsYuGsqx2z39Fcxit907k80LuaAMw0Bkc",
    authDomain:"pfe-project-2eea4.firebaseapp.com",
    projectId:"pfe-project-2eea4",
    storageBucket: "pfe-project-2eea4.appspot.com",
    messagingSenderId:"163194433907",
    appId:"1:163194433907:web:04dd83e5880bc598ec5506"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app,"gs://pfe-project-2eea4.appspot.com");

export default storage










// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDsYuGsqx2z39Fcxit907k80LuaAMw0Bkc",
//   authDomain: "pfe-project-2eea4.firebaseapp.com",
//   projectId: "pfe-project-2eea4",
//   storageBucket: "pfe-project-2eea4.appspot.com",
//   messagingSenderId: "163194433907",
//   appId: "1:163194433907:web:04dd83e5880bc598ec5506",
//   measurementId: "G-1BZWBK91SV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);