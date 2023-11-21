import Header from '@components/Header/Header';
import { SearchContentProvider } from '@context/SearchContentContext';
import SearchResults from '@components/SearchResults/SearchResults';
import SearchBar from '@components/SearchBar/SearchBar';
import SearchResult from '@components/SearchResult/SearchResult';
import { MediaType } from '@customTypes/tmdb/Multi';

// async function getLatestTvShows() {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}`,
//     { method: 'GET' }
//   );
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch TV');
//   }

//   return res.json();
// }

// async function getLatestMovies() {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`,
//     { method: 'GET' }
//   );
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch movies');
//   }

//   return res.json();
// }

const Home = async () => {
  // const tvShows = await getLatestTvShows();
  // const movies = await getLatestMovies();

  return (
    <main>
      <SearchContentProvider>
        <div className="container mx-auto">
          <SearchResults />
        </div>
      </SearchContentProvider>
    </main>
  );
};

export default Home;
