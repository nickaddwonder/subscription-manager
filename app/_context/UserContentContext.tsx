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
import documentExists from '@/_functions/documentExists/documentExists';
import authenticateUser from '@/_functions/authenticateUser';
import { database } from '@/firebase';
import { query, where, collection, getDocs, addDoc } from 'firebase/firestore';
import addContentToDatabase from '@/_functions/addContentToDatabase/addContentToDatabase';
import addContentListToDatabase from '@/_functions/addContentListToDatabase/addContentListToDatabase';

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
  const [contentList, setContentList] = useState(
    []
  );
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
      const loadContentList = async () => {
        if (await authenticateUser(token)) {
          try {
            const contentListQuery = await query(collection(database, 'content_lists'), where('user_id', '==', user.id));
            const querySnapshot = await getDocs(contentListQuery);
            if (querySnapshot.size > 0) {
              querySnapshot.forEach(doc => {
                setContentListId(doc.id);
                setContentList(doc.data().content);
              });
            } else {
              const doc = await addContentListToDatabase({ user_id: user.id, content: [] });
              if (doc.success) {
                setContentListId(doc.docRef!.id);
              }
            }
          } catch (error) {
            console.error("Failed to get content list:", error);
          }
        }
      }
      loadContentList();
    }
  }, [token]);
  const value = { contentList, setContentList, contentListId, token };
  return (
    <UserContentContext.Provider value={value}>
      {children}
    </UserContentContext.Provider>
  );
};
