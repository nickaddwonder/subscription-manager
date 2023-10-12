import { Dispatch, SetStateAction } from 'react';
import TvShow from '@/_types/tmdb/TvShow';
import Movie from '@/_types/tmdb/Movie';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '@/firebase';

interface loadContentToContentList {
  contentIds: string[];
  setContentList: Dispatch<
    SetStateAction<((TvShow & { fid: string }) | (Movie & { fid: string }))[]>
  >;
}

const loadContentToContentList = ({
  contentIds,
  setContentList,
}: loadContentToContentList) => {
  if (contentIds.length > 0) {
    contentIds.forEach(async (content) => {
      const docRef = doc(database, 'contents', content);
      const docSnap = await getDoc(docRef);
      setContentList((list) => [
        ...list,
        { fid: content, ...(docSnap.data() as TvShow | Movie) },
      ]);
    });
  }
};

export default loadContentToContentList;
