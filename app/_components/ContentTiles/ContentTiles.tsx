'use client';

import { FC } from 'react';
import TvShow from '@/app/_types/TvShow';
import Movie from '@/app/_types/Movie';
import { v4 as uuid } from 'uuid';
import Card from '../Card/Card';
import title from '@/app/_functions/title';
import { useUserContent } from '@/app/_context/UserContentContext';
import addToContentList from '@/app/_functions/addToContentList';
import removeFromContentList from '@/app/_functions/removeFromContentList';
import authenticateUser from '@/app/_functions/authenticateUser';
import addContentToDatabase from '@/app/_functions/addContentToDatabase/addContentToDatabase';
import removeContentFromDatabase from '@/app/_functions/removeContentFromDatabase';

type Props = {
  content: TvShow[] | Movie[];
  cardAction?: 'add' | 'remove'
};

const ContentTiles: FC<Props> = ({ content, cardAction }) => {

  const { token, setContentList } = useUserContent();
  const handleClick = async (c: TvShow | Movie) => {
    if (await authenticateUser(token)) {
      if (cardAction === 'add') {
        const doc = addContentToDatabase(c, 'contents');
        addToContentList({ ...c, fid: (await doc).docRef?.id as string }, setContentList);
      } else if (cardAction === 'remove') {
        removeContentFromDatabase((c as ((TvShow & { fid: string }) | Movie & { fid: string })), 'contents');
        removeFromContentList(c, setContentList);
      }
    }
  }

  return (
    <div className="flex w-full flex-wrap">
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
