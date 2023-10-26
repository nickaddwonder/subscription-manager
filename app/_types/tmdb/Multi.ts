import Movie from './Movie';
import TvShow from './TvShow';

export type MediaType = 'tv' | 'movie' | 'person';

export type MediaTypes = {
  media_type: MediaType;
};

type Multi = (Movie | TvShow) & MediaTypes;

export default Multi;
