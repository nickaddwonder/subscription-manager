'use client';

import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import loadContentList from '@/_functions/loadContentList/loadContentList';
import TvShow from '@/_types/TvShow';
import Movie from '@/_types/Movie';

type Props = {
  children: ReactNode;
};

const UserContentContext = createContext<any | null>(null);

export const useUserContent = () => {
  return useContext(UserContentContext);
};

export const UserContentProvider: FC<Props> = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [contentListId, setContentListId] = useState('');
  const [contentList, setContentList] = useState<
    ((TvShow & { fid: string }) | (Movie & { fid: string }))[] | []
  >([]);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken({ template: 'integration_firebase' });
        setToken(token);
      } catch (error) {
        console.error('Failed to get Clerk Token:', error);
      }
    };
    fetchToken();
  }, [getToken]);

  useEffect(() => {
    if (token && user) {
      loadContentList({
        token,
        user,
        setContentListId,
        setContentList: setContentList,
      });
    }
  }, [token]);

  const value = {
    contentList,
    setContentList,
    contentListId,
    token,
  };
  return (
    <UserContentContext.Provider value={value}>
      {children}
    </UserContentContext.Provider>
  );
};
