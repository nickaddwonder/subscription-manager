'use client';
import { FC } from 'react';
import { useUserContent } from '@context/UserContentContext';
import authenticateUser from '@functions/authenticateUser';
import Tile from '../Tile/Tile';
import title from '@functions/title';
import date from '@functions/date';
import { v4 as uuid } from 'uuid';
import removeContentFromContentListsDocument from '@functions/removeContentFromContentListsDocument/removeContentFromContentListsDocument';
import FirestoreMulti from '@customTypes/FirestoreMulti';

const UserContentTiles: FC = () => {
  const { token, contentList, setContentList, contentListId } =
    useUserContent();

  const handleClick = async (c: FirestoreMulti) => {
    if (await authenticateUser(token)) {
      removeContentFromContentListsDocument({
        contentId: c.fid,
        contentListId,
      });
      setContentList((list: FirestoreMulti[]) =>
        list.filter((l) => l.fid !== c.fid)
      );
    }
  };

  return (
    <div className="flex w-full flex-wrap -md:mx-3">
      {contentList.length > 0 ? (
        contentList.toReversed().map((c: FirestoreMulti) => (
          <div className="relative w-full p-3 mb-3 md:mb-0" key={uuid()}>
            <Tile
              title={title(c)}
              contentType={c.media_type}
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
                  children: 'mark done',
                  onClick: () => handleClick(c),
                },
              ]}
            />
          </div>
        ))
      ) : (
        <div className="text-white text-center p-10 w-full">list is empty</div>
      )}
    </div>
  );
};

export default UserContentTiles;
