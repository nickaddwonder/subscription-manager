'use client';

import { FC } from 'react';
import { useSearchContext } from '@context/SearchContentContext';
import ContentTiles from '../ContentTiles/ContentTiles';
import SearchBar from '@components/SearchBar/SearchBar';

const SearchResults: FC = () => {
  const { searchContent } = useSearchContext();
  return (
    <div className="container mx-auto w-full p-3 pt-8 text-center">
      <SearchBar />
      <ContentTiles content={searchContent} />
    </div>
  );
};

export default SearchResults;
