import { useSession, signIn } from "next-auth/react";
import AuthForm from "../components/Auth/AuthForm";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <h2>Sign in to access your dashboard</h2>
        <AuthForm />
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user?.email}</h1>
      <p>This is your personal dashboard.</p>
      {/* Dashboard content goes here */}
    </div>
  );
}
