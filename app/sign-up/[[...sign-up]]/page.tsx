import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp signInUrl="/sign-in" forceRedirectUrl="/new-user" />
    </div>
  );
}
