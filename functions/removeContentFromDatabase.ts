import { deleteDoc, doc } from 'firebase/firestore/lite';
import { database } from '@/firebase';

const removeContentFromDatabase = async (
  id: number,
  collectionName: string
) => {
  try {
    //const docRef = doc(database, collectionName, id);
    // await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting documet:', error);
    return { success: false, error };
  }
};

export default removeContentFromDatabase;
