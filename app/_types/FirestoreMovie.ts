import FirestoreId from './FirestoreId';
import Movie from './tmdb/Movie';

type FirestoreMovie = FirestoreId & Movie;

export default FirestoreMovie;
