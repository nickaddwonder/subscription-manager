import { DocumentReference } from 'firebase/firestore';

type FirestoreReturn = {
  success: boolean;
  docRef?: DocumentReference;
  error?: Error;
};

export default FirestoreReturn;
