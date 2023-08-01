import Image from "next/image";
import { UserButton } from "@clerk/nextjs"
import Movie from "./types/Movie"
import TvShow from "./types/TvShow";
import { v4 as uuid } from 'uuid';
import Card from "@/components/Card/Card";
import Header from "@/components/Header/Header";

async function getLatestTvShows() {
  const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}`, { method: 'GET' })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch TV')
  }

  return res.json()
}

async function getLatestMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`, { method: 'GET' })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch movies')
  }

  return res.json()
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
      <div className="flex w-full flex-wrap">
        {(tvShows.results as TvShow[]).map((tv) =>
          <div className="relative w-full lg:w-1/3 xl:w-1/4" key={uuid()}>
            <Card
              title={tv.name}
              img={
                {
                  src: `${process.env.TMDB_IMAGE_URL_BASE}/w500${tv.backdrop_path}`,
                  alt: `${tv.name}`,
                  width: 500,
                  height: 500
                }
              }
            />
          </div>)}
      </div>
      <div className="w-full text-center p-3 pt-8">
        <h2 className="text-white text-2xl font-bold">Latest Movies</h2>
      </div>
      <div className="flex w-full flex-wrap">
        {(movies.results as Movie[]).map((movie) =>
          <div className="relative w-full lg:w-1/3 xl:w-1/4 " key={uuid()}>
            <Card
              title={movie.title}
              img={
                {
                  src: `${process.env.TMDB_IMAGE_URL_BASE}/w500${movie.backdrop_path}`,
                  alt: `${movie.title}`,
                  width: 500,
                  height: 500
                }
              } />
          </div>)}
      </div>
    </main>
  )
}
