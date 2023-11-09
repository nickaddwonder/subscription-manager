import Movie from '@customTypes/tmdb/Movie';
import TvShow from '@customTypes/tmdb/TvShow';
import { database } from '@/firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import FirestoreReturn from '@/_types/FirestoreReturn';

const addContentToContentsDocument = async (
  content: TvShow | Movie
): Promise<FirestoreReturn> => {
  try {
    const contentQuery = query(
      collection(database, 'contents'),
      where('id', '==', content.id)
    );
    const querySnapshot = await getDocs(contentQuery);
    if (querySnapshot.empty) {
      const docRef = await addDoc(collection(database, 'contents'), content);
      return { success: true, docRef };
    } else {
      const docSnap = await doc(database, 'contents', querySnapshot.docs[0].id);
      return { success: true, docRef: docSnap };
    }
  } catch (error) {
    console.error('Error adding document:', error);
    return { success: false, error: error as Error };
  }
};

export default addContentToContentsDocument;
