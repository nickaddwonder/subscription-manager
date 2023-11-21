import Multi from '@customTypes/tmdb/Multi';

export type TMDBDate = Date | 'N/A';

const date = (content: Multi): TMDBDate => {
  if ('release_date' in content && content.release_date !== '') {
    return new Date(content.release_date);
  } else if ('first_air_date' in content && content.first_air_date !== '') {
    return new Date(content.first_air_date);
  } else {
    return 'N/A';
  }
};

export default date;
