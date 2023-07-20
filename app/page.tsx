import { UserButton, auth, currentUser } from "@clerk/nextjs"
import Movie from "./types/Movie"

async function getData() {
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=a480b2e0ff17e99449e682e5b40ebc1a', { method: 'GET' })
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
  const { userId } = auth();
  const user = await currentUser();
  const data = await getData();

  return (
    <main>
      <div className="w-full flex justify-between items-center p-2 bg-white"><UserButton afterSignOutUrl="/" /></div>
      <div className="text-white">User Id: {userId}</div>
      {!user ? <div>User not logged in:</div> : <div>Hello {user?.firstName}</div>}
      {(data.results as Movie[]).map((result, i) => <div key={i}>{result.title}</div>)}
    </main>
  )
}
