import type { SignupUser, User } from "@/common/types";
import { apiFetcher } from "@/utils/fetcher";

export const signup = (user: SignupUser) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`;

  return apiFetcher<User>(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};
