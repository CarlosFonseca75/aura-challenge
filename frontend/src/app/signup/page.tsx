import { SignupCard } from "@/components/signup/SignupCard";
import { Banner } from "@/components/common/Banner";
import { Page } from "@/components/common/Page";

export default function Signup() {
  return (
    <Page isPublic>
      <Banner />
      <SignupCard />
    </Page>
  );
}
