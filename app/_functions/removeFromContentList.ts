'use client';

import { Dispatch, SetStateAction } from 'react';
import TvShow from '@/app/_types/TvShow';
import Movie from '@/app/_types/Movie';

const removeFromContentList = (
  content: TvShow | Movie,
  setter: Dispatch<SetStateAction<TvShow[] | Movie[]>>
): void => {
  setter((list: any) =>
    list.filter((l: TvShow | Movie) => l.id !== content.id)
  );
};

export default removeFromContentList;
