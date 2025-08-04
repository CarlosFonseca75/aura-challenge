"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Card } from "@/components/common/Card";
import styles from "./styles/Profile.module.scss";

const Profile = () => {
  const { data: session, status } = useSession();

  // TODO: Improve the design of error and loading states.
  // TODO: Close the session properly in case of an error.

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>You are not logged in.</p>;

  const { email, firstName, lastName } = session.user;

  return (
    <Card className={styles.card}>
      <Card.Title title="Profile! 🚀" />

      <Card.Text>
        Update your profile{" "}
        <Link href="/dashboard/profile" className={styles.link}>
          here!
        </Link>
      </Card.Text>

      <Card.Item label="Email:" text={email} />
      <Card.Item label="First Name:" text={firstName} />
      <Card.Item label="Last Name:" text={lastName} />
    </Card>
  );
};

export { Profile };
