import { SignIn, SignedOut } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}
