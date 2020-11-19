"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const firebase_1 = require("firebase");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const routes_config_1 = require("./users/routes-config");
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
firebase_1.default.initializeApp(firebaseConfig);
admin.initializeApp();
const app = express();
app.use([express.json(), express.urlencoded()]);
app.use(cors({ origin: true }));
routes_config_1.routesConfig(app);
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map