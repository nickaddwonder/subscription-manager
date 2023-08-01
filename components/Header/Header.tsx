import { UserButton } from "@clerk/nextjs"

export default function Header() {
  return (
    <div className="w-full flex justify-between items-center p-2 bg-white text-black">
      <span>logo</span>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
};