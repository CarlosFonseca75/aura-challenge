import { Users } from "@/components/dashboard/Users";
import { Profile } from "@/components/dashboard/Profile";
import { Page } from "@/components/common/Page";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <Page>
      <Profile />
      <Suspense fallback="Loading...">
        <Users />
      </Suspense>
    </Page>
  );
}
