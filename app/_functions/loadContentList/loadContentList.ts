import { Dispatch, SetStateAction } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import authenticateUser from '@functions/authenticateUser';
import { database } from '@/firebase';
import { UserResource } from '@clerk/types';
import addContentList from '@functions/addContentList/addContentList';
import loadContentToContentList from '@functions/loadContentToContentList/loadContentToContentList';

interface loadContentList {
  token: string;
  user: UserResource;
  setContentListId: Dispatch<SetStateAction<string>>;
  setContentList: any;
}
const loadContentList = async ({
  token,
  user,
  setContentListId,
  setContentList,
}: loadContentList) => {
  if (await authenticateUser(token)) {
    try {
      const contentListQuery = await query(
        collection(database, 'content_lists'),
        where('user_id', '==', user.id)
      );
      const querySnapshot = await getDocs(contentListQuery);
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          setContentListId(doc.id);
          //setContentList(doc.data().content);
          loadContentToContentList({
            contentIds: doc.data().content,
            setContentList,
          });
        });
      } else {
        const doc = await addContentList({
          user_id: user.id,
          content: [],
        });
        if (doc.success) {
          setContentListId(doc.docRef!.id);
        }
      }
    } catch (error) {
      console.error('Failed to load content list:', error);
    }
  }
};

export default loadContentList;
