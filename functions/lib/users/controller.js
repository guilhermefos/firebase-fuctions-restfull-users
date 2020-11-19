"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.patch = exports.get = exports.all = exports.create = exports.signin = void 0;
const admin = require("firebase-admin");
const firebase_1 = require("firebase");
async function signin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await firebase_1.default
            .auth()
            .signInWithEmailAndPassword(email, password);
        if (user) {
            return res.status(200).send(Object.assign({}, user));
        }
        return res.status(401).send({ message: "Not Authorized" });
    }
    catch (err) {
        return handleError(res, err);
    }
}
exports.signin = signin;
async function create(req, res) {
    try {
        const { displayName, password, email, role } = req.body;
        if (!displayName || !password || !email || !role) {
            return res.status(400).send({ message: "Missing fields" });
        }
        const { uid } = await admin.auth().createUser({
            displayName,
            password,
            email,
        });
        await admin.auth().setCustomUserClaims(uid, { role });
        return res.status(201).send({ uid });
    }
    catch (err) {
        return handleError(res, err);
    }
}
exports.create = create;
async function all(req, res) {
    try {
        const listUsers = await admin.auth().listUsers();
        const users = listUsers.users.map(mapUser);
        return res.status(200).send({ users });
    }
    catch (err) {
        return handleError(res, err);
    }
}
exports.all = all;
function mapUser(user) {
    const customClaims = (user.customClaims || { role: "" });
    const role = customClaims.role ? customClaims.role : "";
    return {
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        role,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime,
    };
}
async function get(req, res) {
    try {
        const { id } = req.params;
        const user = await admin.auth().getUser(id);
        return res.status(200).send({ user: mapUser(user) });
    }
    catch (err) {
        return handleError(res, err);
    }
}
exports.get = get;
async function patch(req, res) {
    try {
        const { id } = req.params;
        const { displayName, password, email, role } = req.body;
        if (!id || !displayName || !password || !email || !role) {
            return res.status(400).send({ message: "Missing fields" });
        }
        await admin.auth().updateUser(id, { displayName, password, email });
        await admin.auth().setCustomUserClaims(id, { role });
        const user = await admin.auth().getUser(id);
        return res.status(204).send({ user: mapUser(user) });
    }
    catch (err) {
        return handleError(res, err);
    }
}
exports.patch = patch;
async function remove(req, res) {
    try {
        const { id } = req.params;
        await admin.auth().deleteUser(id);
        return res.status(204).send({});
    }
    catch (err) {
        return handleError(res, err);
    }
}
exports.remove = remove;
function handleError(res, err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
//# sourceMappingURL=controller.js.map