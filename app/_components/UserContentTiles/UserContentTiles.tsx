'use client';
import { FC } from 'react';
import { useUserContent } from '@context/UserContentContext';
import TvShow from '@/_types/tmdb/TvShow';
import Movie from '@/_types/tmdb/Movie';
import authenticateUser from '@/_functions/authenticateUser';
import Tile from '../Tile/Tile';
import title from '@/_functions/title';
import date from '@/_functions/date';
import { v4 as uuid } from 'uuid';
import removeContentFromContentListsDocument from '@/_functions/removeContentFromContentListsDocument/tempName';
import FirestoreMovie from '@/_types/FirestoreMovie';
import FirestoreTvShow from '@/_types/FirestoreTvShow';

const UserContentTiles: FC = () => {
  const { token, contentList, setContentList, contentListId } =
    useUserContent();

  const handleClick = async (
    c: (TvShow & { fid: string }) | (Movie & { fid: string })
  ) => {
    if (await authenticateUser(token)) {
      removeContentFromContentListsDocument({
        contentId: c.fid,
        contentListId,
      });
      setContentList((list: (FirestoreMovie | FirestoreTvShow)[]) =>
        list.filter((l) => l.fid !== c.fid)
      );
    }
  };

  return (
    <div className="flex w-full flex-wrap -md:mx-3">
      {contentList.length > 0 ? (
        contentList.toReversed().map((c: FirestoreMovie | FirestoreTvShow) => (
          <div className="relative w-full p-3 mb-3 md:mb-0" key={uuid()}>
            <Tile
              title={title(c)}
              contentType={'Movie'}
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
        <div className="text-white text-center w-full">list is empty</div>
      )}
    </div>
  );
};

export default UserContentTiles;
