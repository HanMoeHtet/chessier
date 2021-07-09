import firebase from 'src/services/firebase.service';

const db = firebase.firestore();

export const addOrRetriveUser = async (id: string, user: any): Promise<any> => {
  let docRef = db.collection('users').doc(id);
  let doc = await docRef.get();
  if (doc.exists) {
    const data = doc.data();
    return data;
  } else {
    await docRef.set(user);
    return user;
  }
};
