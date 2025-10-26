import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthForm() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (session) {
    return (
      <div className="p-4">
        <p>Signed in as {session.user?.email}</p>
        <button className="btn" onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) setError(res.error);
  };

  return (
    <form className="p-4" onSubmit={handleSignIn}>
      <h2 className="mb-2">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="input mb-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input mb-2"
        required
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button className="btn" type="submit">Sign In</button>
      <button className="btn ml-2" type="button" onClick={() => signIn("google")}>Sign in with Google</button>
    </form>
  );
}
