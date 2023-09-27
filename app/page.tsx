import Header from '@/app/_components/Header/Header';
import ContentTiles from '@/app/_components/ContentTiles/ContentTiles';
import { UserContentProvider } from '@/app/_context/UserContentContext';
import UserContentList from '@/app/_components/UserContentList/UserContentList';
import Tile from './_components/Tile/Tile';

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

const Home = async () => {
  const tvShows = await getLatestTvShows();
  const movies = await getLatestMovies();

  return (
    <main>

      <Header />
      <UserContentProvider>
        <div className="w-full container text-center mx-auto p-3 pt-8">
          <UserContentList />
        </div>
        <div className="w-full container text-center mx-auto p-3 pt-8">
          <h2 className="text-white text-2xl font-bold">Latest TV Shows</h2>
          <ContentTiles contentType='TV' content={tvShows.results} cardAction={'add'} />
        </div>
        <div className="w-full container text-center mx-auto p-3 pt-8">
          <h2 className="text-white text-2xl font-bold">Latest Movies</h2>
        </div>
        <div className="w-full container text-center mx-auto p-3 pt-8">
          <ContentTiles contentType='Movie' content={movies.results} cardAction={'add'} />
        </div>
      </UserContentProvider>
    </main>
  );
}

export default Home;