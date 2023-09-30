import { deleteDoc, doc } from 'firebase/firestore';
import { database } from '@/firebase';
import Movie from '@customTypes/Movie';
import TvShow from '@customTypes/TvShow';

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
