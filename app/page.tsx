import { UserButton, auth, currentUser } from "@clerk/nextjs"

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();
  return (
    <main>
      <div><UserButton afterSignOutUrl="/" /></div>
      <div className="text-white">User Id: {userId}</div>
      {!user ? <div>User not logged in:</div> : <div>Hello {user?.firstName}</div>}
    </main>
  )
}
