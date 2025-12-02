import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();

export const onusercreate = onDocumentCreated("users/{uid}", (event) => {
  const uid = event.params.uid;
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
