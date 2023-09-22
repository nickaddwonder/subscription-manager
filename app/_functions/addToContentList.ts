'use client';

import { Dispatch, SetStateAction } from 'react';
import TvShow from '@/app/_types/TvShow';
import Movie from '@/app/_types/Movie';

const addToContentList = async (
  content: (TvShow & { fid: string }) | (Movie & { fid: string }),
  setter: Dispatch<SetStateAction<TvShow[] | Movie[]>>
) => {
  setter((list: any) => [...list, content]);
};

export default addToContentList;
