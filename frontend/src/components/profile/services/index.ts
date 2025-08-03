import type { Profile, User } from "@/common/types";
import { apiFetcher } from "@/utils/fetcher";
import { getSession } from "next-auth/react";

export const updateProfile = async (profile: Profile) => {
  const session = await getSession();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`;

  return apiFetcher<User>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(profile),
  });
};
