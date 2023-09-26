import { database } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
const documentExists = async (path: string) => {
  const docReference = doc(database, path);
  const document = await getDoc(docReference);
  return document.exists() ? true : false;
};

export default documentExists;
