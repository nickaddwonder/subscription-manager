import { database } from '@/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

interface addContentToContentDocument {
  contentListId: string;
  contentId: string;
}
const addContentToContentList = async ({
  contentListId,
  contentId,
}: addContentToContentDocument) => {
  try {
    const docRef = await doc(database, `content_lists`, `${contentListId}`);
    updateDoc(docRef, { content: arrayUnion(contentId) });
  } catch (error) {
    console.error('Failed to add content to content list:', error);
  }
};

export default addContentToContentList;
