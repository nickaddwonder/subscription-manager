import Movie from '@/_types/tmdb/Movie';
import TvShow from '@/_types/tmdb/TvShow';

const date = (content: Movie | TvShow): Date => {
  if ('release_date' in content) {
    return new Date(content.release_date);
  } else if ('first_air_date' in content) {
    return new Date(content.first_air_date);
  } else {
    throw new Error(
      'Content Type does not contain a release date or a first air date'
    );
  }
};

export default date;
