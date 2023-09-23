'use client';

import { Dispatch, SetStateAction } from 'react';
import TvShow from '@customTypes/TvShow';
import Movie from '@customTypes/Movie';

const addToContentList = async (
  content: (TvShow & { fid: string }) | (Movie & { fid: string }),
  setter: Dispatch<SetStateAction<TvShow[] | Movie[]>>
) => {
  setter((list: any) => [...list, content]);
};

export default addToContentList;
