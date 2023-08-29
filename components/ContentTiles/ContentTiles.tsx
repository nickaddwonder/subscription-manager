'use client';
import TvShow from '@/app/types/TvShow';
import Movie from '@/app/types/Movie';
import { v4 as uuid } from 'uuid';
import Card from '../Card/Card';
import title from '@/functions/title';

type Props = {
  content: TvShow[] | Movie[];
};

export default function ContentTiles({ content }: Props) {
  return (
    <div className="flex w-full flex-wrap">
      {content.map((c) => (
        <div className="relative w-full lg:w-1/3 xl:w-1/4" key={uuid()}>
          <Card
            mode="button"
            title={title(c)}
            img={{
              src: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL_BASE}/w500${c.backdrop_path}`,
              alt: `${title(c)}`,
              width: 500,
              height: 500,
            }}
          />
        </div>
      ))}
    </div>
  );
}
