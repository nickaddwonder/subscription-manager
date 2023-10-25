import Movie from './Movie';
import TvShow from './TvShow';

export type MediaType = {
  media_type: 'tv' | 'movie' | 'person';
};

type Multi = (Movie | TvShow) & MediaType;

export default Multi;
