import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onUserCreate = functions.firestore
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
