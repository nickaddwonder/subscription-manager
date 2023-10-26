'use client';

import { FC } from 'react';
import { useSearchContext } from '@context/SearchContentContext';
import ContentTiles from '../ContentTiles/ContentTiles';

const SearchResults: FC = () => {
  const { searchContent } = useSearchContext();
  return (
    <>
      <div className="w-full container text-center mx-auto p-3 pt-8">
        <ContentTiles content={searchContent} />
      </div>
    </>
  );
};

export default SearchResults;
