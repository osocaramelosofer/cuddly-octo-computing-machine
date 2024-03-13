import {applicationDefault, initializeApp, cert} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import dotenv from 'dotenv'

dotenv.config()
const credentialsBase64 = process.env.FIREBASE_CREDENTIALS_BASE64;
if (!credentialsBase64) {
    throw new Error('The env variable "FIREBASE_CREDENTIALS_BASE64" is not defined');
}
const credentialsJson = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('ascii'));

const defaultApp = initializeApp({
    credential: cert(credentialsJson),
    databaseURL: 'https://babelon-mvp-default-rtdb.firebaseio.com',
});

export const db = getFirestore()