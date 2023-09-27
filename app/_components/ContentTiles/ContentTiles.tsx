'use client';

import { FC } from 'react';
import TvShow from '@customTypes/TvShow';
import Movie from '@customTypes/Movie';
import { v4 as uuid } from 'uuid';
import title from '@functions/title';
import { useUserContent } from '@context/UserContentContext';
import addToContentList from '@functions/addToContentList';
import removeFromContentList from '@functions/removeFromContentList';
import authenticateUser from '@functions/authenticateUser';
import addContentToDatabase from '@functions/addContentToDatabase/addContentToDatabase';
import removeContentFromDatabase from '@functions/removeContentFromDatabase';
import Tile from '@components/Tile/Tile';
import ContentType from '@customTypes/ContentType';
import date from '@functions/date';

type Props = {
  content: TvShow[] | Movie[];
  contentType?: ContentType;
  cardAction?: 'add' | 'remove'
};

const ContentTiles: FC<Props> = ({ content, contentType, cardAction }) => {

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
    <div className="flex w-full flex-wrap -md:mx-3">
      {content.map((c) => (
        <div className="relative w-full md:w-1/2 mb-3 md:mb-6 md:px-3" key={uuid()}>
          <Tile
            title={title(c)}
            contentType={contentType ?? 'Movie'}
            date={date(c)}
            description={c.overview}
            image={{
              src: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL_BASE}/w500${c.poster_path}`,
              alt: `${title(c)}`,
              width: 500,
              height: 500,
            }}
            buttons={[
              {
                buttonType: 'primary',
                children: 'add',
                onClick: () => handleClick(c)
              }
            ]}
          />
        </div>
      ))}
    </div>
  );
}

export default ContentTiles;
