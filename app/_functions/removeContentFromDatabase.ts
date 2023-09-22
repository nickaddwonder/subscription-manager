import { deleteDoc, doc } from 'firebase/firestore/lite';
import { database } from '@/firebase';
import Movie from '@/app/_types/Movie';
import TvShow from '@/app/_types/TvShow';

const removeContentFromDatabase = async (
  content: (TvShow & { fid: string }) | (Movie & { fid: string }),
  collectionName: string
) => {
  try {
    const docRef = doc(database, collectionName, content.fid);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting documet:', error);
    return { success: false, error };
  }
};

export default removeContentFromDatabase;
