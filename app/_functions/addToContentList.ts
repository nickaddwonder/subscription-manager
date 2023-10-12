'use client';

import { Dispatch, SetStateAction } from 'react';
import TvShow from '@/_types/tmdb/TvShow';
import Movie from '@/_types/tmdb/Movie';

const addToContentList = async (
  content: (TvShow & { fid: string }) | (Movie & { fid: string }),
  setter: Dispatch<SetStateAction<TvShow[] | Movie[]>>
) => {
  setter((list: any) => [...list, content]);
};

export default addToContentList;
