import { UpdateProfile } from "@/components/profile/UpdateProfile";
import { Page } from "@/components/common/Page";

export const metadata = {
  title: "Profile",
};

export default function Profile() {
  return (
    <Page>
      <UpdateProfile />
    </Page>
  );
}
