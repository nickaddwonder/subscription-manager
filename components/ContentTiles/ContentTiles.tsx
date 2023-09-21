'use client';

import { FC, useReducer } from 'react';
import TvShow from '@/app/types/TvShow';
import Movie from '@/app/types/Movie';
import { v4 as uuid } from 'uuid';
import Card from '../Card/Card';
import title from '@/functions/title';
import { useUserContent } from '@/context/UserContentContext';
import addToContentList from '@/functions/addToContentList';
import removeFromContentList from '@/functions/removeFromContentList';
import { useAuth } from '@clerk/nextjs';
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { database } from "./../../firebase";

type Props = {
  content: TvShow[] | Movie[];
  cardAction?: 'add' | 'remove'
};

const ContentTiles: FC<Props> = ({ content, cardAction }) => {

  const { getToken } = useAuth();

  const { setContentList } = useUserContent();
  const handleClick = (c: TvShow | Movie) => {
    if (cardAction === 'add') {
      addToContentList(c, setContentList);
    } else if (cardAction === 'remove') {
      removeFromContentList(c, setContentList);
    }
  }

  const handleClickToo = async () => {
    const firebaseClerkToken = await getToken({ template: 'integration_firebase' }) as string;
    const auth = getAuth();
    await signInWithCustomToken(auth, firebaseClerkToken);

    const results = await addDoc(collection(database, 'contents'), { key: 'something2' });
  }

  return (
    <div className="flex w-full flex-wrap">
      <div className="w-full">
        <button onClick={handleClickToo}>Example Button</button>
      </div>
      {content.map((c) => (
        <div className="relative w-full lg:w-1/3 xl:w-1/4" key={uuid()}>
          <Card
            mode="button"
            title={title(c)}
            button={{ onClick: () => handleClick(c) }}
            img={{
              src: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL_BASE}/w500${c.backdrop_path}`,
              alt: `${title(c)}`,
              width: 500,
              height: 500,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ContentTiles;
