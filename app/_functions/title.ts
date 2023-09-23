import Movie from '@customTypes/Movie';
import TvShow from '@customTypes/TvShow';

const title = (content: Movie | TvShow): string => {
  if ('name' in content) {
    return content.name;
  } else if ('title' in content) {
    return content.title;
  } else {
    throw new Error('Content Type does not contain a name or a title');
  }
};

export default title;
