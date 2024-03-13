import {applicationDefault, initializeApp} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const defaultApp = initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://babelon-mvp-default-rtdb.firebaseio.com',
});

export const db = getFirestore()