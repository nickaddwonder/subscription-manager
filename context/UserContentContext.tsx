'use client';

import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import Movie from '@/app/types/Movie';
import TvShow from '@/app/types/TvShow';

type Props = {
  children: ReactNode;
};

const UserContentContext = createContext<any | null>(null);

export const useUserContent = () => {
  return useContext(UserContentContext);
};

export const UserContentProvider: FC<Props> = ({ children }) => {
  const [contentList, setContentList] = useState<TvShow[] | Movie[]>(
    []
  );
  const value = { contentList, setContentList };
  return (
    <UserContentContext.Provider value={value}>
      {children}
    </UserContentContext.Provider>
  );
};
