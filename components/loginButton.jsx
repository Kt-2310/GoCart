"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Hello {session.user.name}</p>
        <button onClick={() => signOut()}>
          Logout
        </button>
      </>
    );
  }

  return (
    <button onClick={() => signIn("google")}>
      Login with Google
    </button>
  );
}