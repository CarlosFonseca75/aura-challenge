"use client";

import { signOut } from "next-auth/react";
import { Button } from "./Button";

const SignOutButton = () => {
  const handleSignOut = () => signOut();

  return (
    <Button size="sm" onClick={handleSignOut}>
      Log Out
    </Button>
  );
};

export { SignOutButton };
