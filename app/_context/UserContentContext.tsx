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
import { doc, getDoc } from 'firebase/firestore';
import { database } from '@/firebase';
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
  const [contentListLoaded, setContentListLoaded] = useState(false);
  const [contentListId, setContentListId] = useState('');
  const [contentList, setContentList] = useState<string[]>(
    []
  );
  const [activeContentList, setActiveContentList] = useState<(TvShow & { fid: string } | Movie & { fid: string })[] | null[] | any[]>([]);
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
  }, [getToken]);

  useEffect(() => {
    if (token && user) {
      loadContentList({ token, user, setContentListId, setContentList: setActiveContentList });
    }
  }, [token]);

  // useEffect(() => {
  //   const loadCurrentContentList = async () => {
  //     if (contentList.length > 0) {
  //       contentList.forEach(async (content: string) => {
  //         const docRef = doc(database, 'contents', content);
  //         const docSnap = await getDoc(docRef);
  //         setActiveContentList(list => [...list, { fid: content, ...docSnap.data() }]);
  //       });
  //     }
  //   };
  //   loadCurrentContentList();
  // }, [contentList]);
  const value = { contentList, setContentList, contentListId, activeContentList, setActiveContentList, token };
  return (
    <UserContentContext.Provider value={value}>
      {children}
    </UserContentContext.Provider>
  );
};
