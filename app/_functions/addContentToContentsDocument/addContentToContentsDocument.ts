import Movie from '@/_types/tmdb/Movie';
import TvShow from '@/_types/tmdb/TvShow';
import { database } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import FirestoreReturn from '@/_types/FirestoreReturn';

const addContentToContentsDocument = async (
  content: TvShow | Movie
): Promise<FirestoreReturn> => {
  try {
    const docRef = await addDoc(collection(database, 'contents'), content);
    return { success: true, docRef };
  } catch (error) {
    console.error('Error adding document:', error);
    return { success: false, error: error as Error };
  }
};

export default addContentToContentsDocument;
