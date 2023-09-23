'use client';

import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import Movie from '@customTypes/Movie';
import TvShow from '@customTypes/TvShow';
import { useAuth } from '@clerk/nextjs';

type Props = {
  children: ReactNode;
};

const UserContentContext = createContext<any | null>(null);

export const useUserContent = () => {
  return useContext(UserContentContext);
};

export const UserContentProvider: FC<Props> = ({ children }) => {

  const { getToken } = useAuth();
  const [contentList, setContentList] = useState(
    []
  );
  //<TvShow[] | Movie[]>
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken({ template: 'integration_firebase' });
        setToken(token);
      } catch (error) {
        console.error("Failed to get Clerk Token:", error);
      }
    }
    fetchToken();
  }, [getToken])
  const value = { contentList, setContentList, token };
  return (
    <UserContentContext.Provider value={value}>
      {children}
    </UserContentContext.Provider>
  );
};
