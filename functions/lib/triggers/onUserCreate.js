"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUserCreate = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.onUserCreate = functions.firestore
    .document('users/{uid}')
    .onCreate(async (snap, context) => {
    const uid = context.params.uid;
    const userRef = admin.firestore().collection('users').doc(uid);
    return userRef.set({
        role: 'pending',
        probationaryStatus: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
});
//# sourceMappingURL=onUserCreate.js.map