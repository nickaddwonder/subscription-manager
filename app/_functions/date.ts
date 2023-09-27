import Movie from '@customTypes/Movie';
import TvShow from '@customTypes/TvShow';

const date = (content: Movie | TvShow): Date => {
  if ('release_date' in content) {
    return new Date(content.release_date);
  } else if ('first_air_date' in content) {
    return new Date(content.first_air_date);
  } else {
    throw new Error(
      'Content Type does not contain a release dateor a first air date'
    );
  }
};

export default date;
