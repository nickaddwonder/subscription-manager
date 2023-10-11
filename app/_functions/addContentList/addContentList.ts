import ContentList from '@/_types/ContentList';
import FirestoreReturn from '@/_types/FirestoreReturn';
import { database } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

const addContentList = async (
  content_list: ContentList
): Promise<FirestoreReturn> => {
  try {
    const docRef = await addDoc(
      collection(database, 'content_lists'),
      content_list
    );
    return { success: true, docRef };
  } catch (error) {
    console.error('Error adding document,:', error);
    return { success: false, error: error as Error };
  }
};

export default addContentList;
