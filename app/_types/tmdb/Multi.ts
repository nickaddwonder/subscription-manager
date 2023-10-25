import Movie from './Movie';
import TvShow from './TvShow';

type Multi = (Movie | TvShow) & {
  media_type: 'tv' | 'movie' | 'person';
};

export default Multi;
