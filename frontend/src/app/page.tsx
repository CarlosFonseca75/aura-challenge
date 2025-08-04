import { LoginCard } from "@/components/login/LoginCard";
import { Banner } from "@/components/common/Banner";
import { Page } from "@/components/common/Page";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <Page isPublic>
      <Banner />
      <LoginCard />
    </Page>
  );
}
