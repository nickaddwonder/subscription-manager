import Movie from '@/app/_types/Movie';
import TvShow from '@/app/_types/TvShow';

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
