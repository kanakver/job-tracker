import { Metadata } from "next";
import SignupForm from "./components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up | Job Tracker",
  description: "Create a new account",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <SignupForm />
      </div>
    </div>
  );
} 