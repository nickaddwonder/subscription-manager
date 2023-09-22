import Movie from '@/app/types/Movie';
import TvShow from '@/app/types/TvShow';
import { database } from '@/firebase';
import { DocumentReference, addDoc, collection } from 'firebase/firestore/lite';

const addContentToDatabase = async (
  content: TvShow | Movie,
  collectionName: string
): Promise<{ success: Boolean; docRef?: DocumentReference; error?: Error }> => {
  try {
    const docRef = await addDoc(collection(database, collectionName), content);
    return { success: true, docRef };
  } catch (error) {
    console.error('Error adding document:', error);
    return { success: false, error: error as Error };
  }
};

export default addContentToDatabase;