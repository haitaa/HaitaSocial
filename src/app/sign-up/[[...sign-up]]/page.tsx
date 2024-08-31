import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="h-[calc(100vh-96px)] flex items-center justify-center">
      <SignUp />
    </div>
  );
}
