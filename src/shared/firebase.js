import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDtcPCko13-3NZOfnshyriRAL3tV3busJo',
  authDomain: 'soomgo-clone.firebaseapp.com',
  projectId: 'soomgo-clone',
  storageBucket: 'soomgo-clone.appspot.com',
  messagingSenderId: '641389472401',
  appId: '1:641389472401:web:9bb705edc42b112ae3ed30',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app;
