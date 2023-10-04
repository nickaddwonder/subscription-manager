import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { database } from '@/firebase';

interface removeContentFromContentListsDocument {
  contentListId: string;
  contentId: string;
}

const removeContentFromContentListsDocument = async ({
  contentListId,
  contentId,
}: removeContentFromContentListsDocument) => {
  try {
    const docRef = await doc(database, `content_lists`, `${contentListId}`);
    updateDoc(docRef, { content: arrayRemove(contentId) });
  } catch (error) {
    console.error('Failed to remov content from content list:', error);
  }
};

export default removeContentFromContentListsDocument;
