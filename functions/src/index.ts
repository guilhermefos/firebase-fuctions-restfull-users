import firebase from "firebase";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

import { routesConfig } from "./users/routes-config";

const firebaseConfig = {
  apiKey: "AIzaSyAcKGLplFfFIZClanyJEJZVNn2NkM--ZpU",
  authDomain: "study-fe281.firebaseapp.com",
  databaseURL: "https://study-fe281.firebaseio.com",
  projectId: "study-fe281",
  storageBucket: "study-fe281.appspot.com",
  messagingSenderId: "934900281528",
  appId: "1:934900281528:web:573a83b870d6b5a8",
  measurementId: "G-HEXPC4SXQL",
};

firebase.initializeApp(firebaseConfig);

admin.initializeApp();

const app = express();

app.use([express.json(), express.urlencoded()]);
app.use(cors({ origin: true }));

routesConfig(app);

export const api = functions.https.onRequest(app);
