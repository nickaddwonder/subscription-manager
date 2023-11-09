import { deleteDoc, doc } from 'firebase/firestore';
import { database } from '@/firebase';
import Movie from '@customTypes/tmdb/Movie';
import TvShow from '@customTypes/tmdb/TvShow';

const removeContentFromContentsDocument = async (
  content: (TvShow & { fid: string }) | (Movie & { fid: string })
) => {
  try {
    const docRef = doc(database, 'contents', content.fid);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting documet:', error);
    return { success: false, error };
  }
};

export default removeContentFromContentsDocument;
