import Movie from './types/Movie';
import TvShow from './types/TvShow';
import { v4 as uuid } from 'uuid';
import Card from '@/components/Card/Card';
import Header from '@/components/Header/Header';
import ContentTiles from '@/components/ContentTiles/ContentTiles';

async function getLatestTvShows() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}`,
    { method: 'GET' }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch TV');
  }

  return res.json();
}

async function getLatestMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`,
    { method: 'GET' }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch movies');
  }

  return res.json();
}

export default async function Home() {
  const tvShows = await getLatestTvShows();
  const movies = await getLatestMovies();

  return (
    <main>
      <Header />
      <div className="w-full text-center p-3 pt-8">
        <h2 className="text-white text-2xl font-bold">Latest TV Shows</h2>
      </div>
      <ContentTiles content={tvShows.results} />
      {/* <div className="w-full text-center p-3 pt-8">
        <h2 className="text-white text-2xl font-bold">Latest Movies</h2>
      </div>
      <ContentTiles content={movies.results} /> */}
    </main>
  );
}
