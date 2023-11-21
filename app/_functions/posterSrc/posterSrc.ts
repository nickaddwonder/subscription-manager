import Multi from '@customTypes/tmdb/Multi';

export type PosterSrc = string;

const posterSrc = (content: Multi): PosterSrc => {
  if (content.poster_path) {
    return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL_BASE}/w500${content.poster_path}`;
  } else {
    return '/images/default_poster.jpg';
  }
};

export default posterSrc;
