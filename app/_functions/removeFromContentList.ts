'use client';

import { Dispatch, SetStateAction } from 'react';
import TvShow from '@/_types/tmdb/TvShow';
import Movie from '@/_types/tmdb/Movie';

const removeFromContentList = (
  content: TvShow | Movie,
  setter: Dispatch<SetStateAction<TvShow[] | Movie[]>>
): void => {
  setter((list: any) =>
    list.filter((l: TvShow | Movie) => l.id !== content.id)
  );
};

export default removeFromContentList;
