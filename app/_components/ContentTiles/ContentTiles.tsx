'use client';

import { FC } from 'react';
import { v4 as uuid } from 'uuid';
import title from '@functions/title';
import { useUserContent } from '@context/UserContentContext';
import authenticateUser from '@functions/authenticateUser';
import addContentToContentsDocument from '@functions/addContentToContentsDocument/addContentToContentsDocument';
import Tile from '@components/Tile/Tile';
import date from '@functions/date';
import addContentToContentListsDocument from '@functions/addContentToContentListsDocument/addContentToContentListsDocument';
import removeContentFromContentListsDocument from '@functions/removeContentFromContentListsDocument/removeContentFromContentListsDocument';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '@/firebase';
import Multi from '@customTypes/tmdb/Multi';
import FirestoreMulti from '@customTypes/FirestoreMulti';
import SearchResult from '@components/SearchResult/SearchResult';

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
    <div className="flex w-auto flex-wrap md:-mx-3">
      <ul className="relative w-full overflow-hidden rounded">
        {content.length > 0 ? (
          content
            .filter((c) => c.media_type === 'movie' || c.media_type === 'tv')
            .map((c) => (
              <li key={uuid()}>
                <SearchResult
                  title={title(c)}
                  contentType={c.media_type}
                  date={date(c)}
                  image={{
                    src: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL_BASE}/w500${c.poster_path}`,
                    alt: `${title(c)}`,
                    width: 500,
                    height: 500,
                  }}
                  mode={isInContentList(c) ? 'remove' : 'add'}
                  handleClick={() => {
                    isInContentList(c) ? handleRemove(c) : handleClick(c);
                  }}
                />
              </li>
            ))
        ) : (
          <div className="w-full p-10">Search something</div>
        )}
      </ul>
    </div>
  );
};

export default ContentTiles;
