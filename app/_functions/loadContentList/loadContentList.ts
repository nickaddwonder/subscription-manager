import { Dispatch, SetStateAction } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import authenticateUser from '../authenticateUser';
import { database } from '@/firebase';
import { UserResource } from '@clerk/types';
import addContentList from '../addContentList/addContentList';

interface loadContentList {
  token: string;
  user: UserResource;
  setContentListId: Dispatch<SetStateAction<string>>;
  setContentList: Dispatch<SetStateAction<string[]>>;
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
          setContentList(doc.data().content);
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
