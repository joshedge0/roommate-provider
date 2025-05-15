"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <button className="cursor-pointer" onClick={() => signIn()}>
          Sign In
        </button>
      </>
    );
  }

  return (
    <>
      <button className="cursor-pointer" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
}
