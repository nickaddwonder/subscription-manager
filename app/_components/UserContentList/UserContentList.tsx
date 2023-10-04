'use client';
import { FC } from 'react';
import { useUserContent } from '@context/UserContentContext';
import TvShow from '@/_types/TvShow';
import Movie from '@/_types/Movie';
import authenticateUser from '@/_functions/authenticateUser';
import Tile from '../Tile/Tile';
import title from '@/_functions/title';
import date from '@/_functions/date';
import { v4 as uuid } from 'uuid';
import removeContentFromContentListsDocument from '@/_functions/removeContentFromContentListsDocument/removeContentFromContentLIstsDocument';

const UserContentList: FC = () => {
  const { token, activeContentList, setActiveContentList, contentListId } = useUserContent();

  const handleClick = async (c: TvShow & { fid: string } | Movie & { fid: string }) => {
    if (await authenticateUser(token)) {
      removeContentFromContentListsDocument({ contentId: c.fid, contentListId });
      //removeFromContentList(c, setContentList);
      setActiveContentList((list: (TvShow & { fid: string } | Movie & { fid: string })[]) => list.filter(l => l.id !== c.id));
    }
  }


  return (
    <div className="flex w-full flex-wrap -md:mx-3">
      {activeContentList.length > 0 ? activeContentList.map((c) => (
        <div className="relative w-full md:w-1/2 mb-3 md:mb-6 md:px-3" key={uuid()}>
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
                onClick: () => handleClick(c)
              }
            ]}
          />
        </div>
      )) : <div className="text-white text-center w-full">list is empty</div>}
    </div>
  );
};

export default UserContentList;
