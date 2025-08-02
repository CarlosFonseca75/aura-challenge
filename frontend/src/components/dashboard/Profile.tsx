"use client";

import { useSession } from "next-auth/react";
import { Card } from "@/components/common/Card";

const Profile = () => {
  const { data: session, status } = useSession();

  // TODO: Add a nice skeleton loader.
  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>You are not logged in.</p>;

  const { email, firstName, lastName } = session.user;

  return (
    <Card>
      <Card.Title title="Profile! 🚀" />
      <Card.Item label="Email:" text={email} />
      <Card.Item label="First Name:" text={firstName} />
      <Card.Item label="Last Name:" text={lastName} />
    </Card>
  );
};

export { Profile };
