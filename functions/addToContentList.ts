'use client';

import { Dispatch, SetStateAction } from 'react';
import TvShow from '@/app/types/TvShow';
import Movie from '@/app/types/Movie';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { database } from '../firebase';
import { useUser } from '@clerk/nextjs';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

const addToContentList = (
  content: TvShow | Movie,
  setter: Dispatch<SetStateAction<TvShow[] | Movie[]>>
): void => {
  setter((list: any) => [...list, content]);
};

export default addToContentList;
