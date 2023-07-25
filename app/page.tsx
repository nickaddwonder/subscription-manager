import Image from "next/image";
import { UserButton } from "@clerk/nextjs"
import Movie from "./types/Movie"
import { v4 as uuid } from 'uuid';

async function getData() {
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`, { method: 'GET' })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <div className="w-full flex justify-between items-center p-2 bg-white">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="w-full text-center p-3"><h2 className="text-white text-2xl font-bold">Latest Movies</h2></div>
      <div className="flex w-full flex-wrap">
        {(data.results as Movie[]).map((result) =>
          <div className="relative w-full lg:w-1/4 aspect-video flex justify-center items-center text-center" key={uuid()}>
            <h2 className="text-white absolute z-10 text-xl font-semibold">{result.title}</h2>
            <Image className="z-0 min-w-full min-h-full object-cover relative" src={`${process.env.TMDB_IMAGE_URL_BASE}w780${result.backdrop_path}`} alt={`${result.title} image`} width={500} height={500} />
          </div>)}
      </div>
    </main>
  )
}
