import { onUserCreate } from "firebase-functions/v2/auth";
import * as admin from "firebase-admin";

admin.initializeApp();

export const onusercreate = onUserCreate(async (event) => {
  const uid = event.data.uid;
  const userRef = admin.firestore().collection("users").doc(uid);

  return userRef.set(
    {
      role: "pending",
      probationaryStatus: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
});
