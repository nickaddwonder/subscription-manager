import Header from '@/components/Header/Header';
import ContentTiles from '@/components/ContentTiles/ContentTiles';
import { UserContentProvider } from '@/context/UserContentContext';
import UserContentList from '@/components/UserContentList/UserContentList';
import { useUser } from '@clerk/nextjs';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';

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
      <UserContentProvider>
        <Header />
        <div className="w-full text-center p-3 pt-8">
          <h1 className="white">stuff from Firestore</h1>
          <button className="border border-solid border-white p-4 m-4 rounded">Send to db</button>
        </div>
        <div className="w-full text-center p-3 pt-8">
          <UserContentList />
        </div>
        <div className="w-full text-center p-3 pt-8">
          <h2 className="text-white text-2xl font-bold">Latest TV Shows</h2>
          <ContentTiles content={tvShows.results} cardAction={'add'} />
        </div>
        <div className="w-full text-center p-3 pt-8">
          <h2 className="text-white text-2xl font-bold">Latest Movies</h2>
        </div>
        <ContentTiles content={movies.results} cardAction={'add'} />
      </UserContentProvider>
    </main>
  );
}

export default Home;