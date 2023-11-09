'use client';

import Movie from '@customTypes/tmdb/Movie';
import TvShow from '@customTypes/tmdb/TvShow';
import { FC, createContext, useContext, ReactNode, useState } from 'react';

const SearchContentContext = createContext<any | null>(null);

type Props = {
  children: ReactNode;
};

export const useSearchContext = () => {
  return useContext(SearchContentContext);
};

export const SearchContentProvider: FC<Props> = ({ children }) => {
  const [searchContent, setSearchContent] = useState<(Movie | TvShow)[] | []>(
    []
  );

  const value = { searchContent, setSearchContent };

  return (
    <SearchContentContext.Provider value={value}>
      {children}
    </SearchContentContext.Provider>
  );
};
