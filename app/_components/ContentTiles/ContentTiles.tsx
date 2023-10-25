'use client';

import { FC } from 'react';
import TvShow from '@/_types/tmdb/TvShow';
import Movie from '@/_types/tmdb/Movie';
import { v4 as uuid } from 'uuid';
import title from '@functions/title';
import { useUserContent } from '@context/UserContentContext';
import authenticateUser from '@functions/authenticateUser';
import addContentToContentsDocument from '@/_functions/addContentToContentsDocument/addContentToContentsDocument';
import Tile from '@components/Tile/Tile';
import date from '@functions/date';
import addContentToContentListsDocument from '@/_functions/addContentToContentListsDocument/addContentToContentListsDocument';
import removeContentFromContentListsDocument from '@/_functions/removeContentFromContentListsDocument/removeContentFromContentListsDocument';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '@/firebase';
import Multi, { MediaType } from '@customTypes/tmdb/Multi';
import FirestoreMulti from '@customTypes/FirestoreMulti';

type Props = {
  content: Multi[];
};

const ContentTiles: FC<Props> = ({ content }) => {
  const { token, contentList, setContentList, contentListId } =
    useUserContent();
  const handleClick = async (c: Multi) => {
    if (await authenticateUser(token)) {
      const doc = await addContentToContentsDocument(c);
      if (doc.success && doc.docRef) {
        addContentToContentListsDocument({
          contentListId,
          contentId: doc.docRef.id,
        });
        setContentList((list: FirestoreMulti[]) => [
          ...list,
          { ...c, fid: doc.docRef?.id },
        ]);
      }
    }
  };

  const handleRemove = async (c: Multi) => {
    if (await authenticateUser(token)) {
      const contentQuery = query(
        collection(database, 'contents'),
        where('id', '==', c.id)
      );
      const querySnapshot = await getDocs(contentQuery);
      const contentId = querySnapshot.docs[0].id;
      await removeContentFromContentListsDocument({
        contentListId,
        contentId,
      });
      setContentList((list: FirestoreMulti[]) =>
        list.filter((l) => l.fid !== contentId)
      );
    }
  };

  const isInContentList = (c: Multi) => {
    const matchingContent = contentList.filter(
      (content: FirestoreMulti) => content.id === c.id
    );

    return !(matchingContent.length === 0);
  };

  return (
    <div className="flex w-full flex-wrap -md:mx-3">
      {content.length > 0 ? (
        content.map((c) => (
          <div
            className="relative w-full md:w-1/2 mb-3 md:mb-6 md:px-3"
            key={uuid()}
          >
            <Tile
              title={title(c)}
              contentType={
                (c.media_type === 'tv' || 'movie') &&
                (c.media_type as MediaType)
              }
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
                  buttonType: isInContentList(c) ? 'tertiary' : 'primary',
                  children: isInContentList(c)
                    ? 'in watchlist'
                    : 'add to watchlist',
                  onClick: () =>
                    isInContentList(c) ? handleRemove(c) : handleClick(c),
                },
              ]}
            />
          </div>
        ))
      ) : (
        <div className="w-full">Nothing here</div>
      )}
    </div>
  );
};

export default ContentTiles;
