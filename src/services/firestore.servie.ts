import app from 'src/services/firebase.service';
import { GameDataStatus } from 'src/types';

const db = app.firestore();
const games = new Map<string, () => void>();
let waitingRooms = new Map<string, () => void>();

export const addOrRetriveUser = async (
  id: string,
  user?: any
): Promise<any> => {
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

export const updateUser = async (id: string, user: any) => {
  await db.collection('users').doc(id).update(user);
};

export const findInWaitingRooms = async (
  findFun: (data: any) => boolean
): Promise<any> => {
  const roomsRef = await db.collection('waiting_rooms').get();
  const roomRef = roomsRef.docs.find((doc) => findFun(doc.data()));
  if (!roomRef) return;
  return {
    id: roomRef.id,
    ...roomRef.data(),
  };
};

export const addWaitingRoom = async (playerId: string): Promise<string> => {
  let docRef = await db.collection('waiting_rooms').add({ playerId });
  return docRef.id;
};

export const updateWaitingRoom = async (id: string, data: any) => {
  await db
    .collection('waiting_rooms')
    .doc(id)
    .update({ ...data });
};

export const deleteWaitingRoom = async (id: string) => {
  await db.collection('waiting_rooms').doc(id).delete();
};

export const watchWaitingRoom = (id: string, cb: (roomData: any) => void) => {
  const unsubscribe = db
    .collection('waiting_rooms')
    .doc(id)
    .onSnapshot((snapshot) => {
      cb(snapshot.data());
    });
  waitingRooms.set(id, unsubscribe);
};

export const unsbuscribeWaitingRoom = (id: string) => {
  const fun = waitingRooms.get(id);
  if (fun) {
    fun();
    waitingRooms.delete(id);
  }
};

export const createNewGame = async (gameData: any) => {
  const docRef = await db.collection('games').add(gameData);
  return docRef.id;
};

export const watchGame = (id: string, cb: (gameData: any) => void) => {
  const unsubscribe = db
    .collection('games')
    .doc(id)
    .onSnapshot((snapshot) => {
      cb(snapshot.data());
    });
  games.set(id, unsubscribe);
};

export const unsubscribeGame = (id: string) => {
  const fun = games.get(id);
  if (fun) {
    fun();
    games.delete(id);
  }
};

export const updateGame = async (id: string, data: any) => {
  await db.collection('games').doc(id).update(data);
};

export const addGameMove = async (id: string, state: any) => {
  const docRef = db.collection('games').doc(id);
  const data = (await docRef.get()).data();
  if (data) {
    const history = data.history as [];
    docRef.update({
      status: GameDataStatus.MADE_MOVE,
      history: [...history, state],
    });
  }
};
