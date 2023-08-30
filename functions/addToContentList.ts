'use client';

import { Dispatch, SetStateAction } from 'react';
import TvShow from '@/app/types/TvShow';
import Movie from '@/app/types/Movie';

const addToContentList = (
  content: TvShow | Movie,
  setter: Dispatch<SetStateAction<TvShow[] | Movie[]>>
): void => {
  setter((list: any) => [...list, content]);
};

export default addToContentList;
