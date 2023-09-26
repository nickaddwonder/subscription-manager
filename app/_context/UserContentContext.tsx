'use client';

import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useAuth } from '@clerk/nextjs';
import documentExists from '@/_functions/documentExists/documentExists';
import authenticateUser from '@/_functions/authenticateUser';

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
  }, [getToken]);

  // useEffect(() => {
  //   const ram = async () => {
  //     if (await authenticateUser(token!)) {
  //       const ran = await documentExists('content_lists/M2TAeXMLWAXlbHVR5v6I');
  //     }
  //   }
  //   ram();
  // }, [token]);
  const value = { contentList, setContentList, token };
  return (
    <UserContentContext.Provider value={value}>
      {children}
    </UserContentContext.Provider>
  );
};
