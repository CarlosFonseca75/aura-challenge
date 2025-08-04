import type { User } from "@/common/types";
import { apiFetcher } from "@/utils/fetcher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/common/auth";

export const getUsers = async () => {
  const session = await getServerSession(authOptions);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;

  return apiFetcher<User[]>(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
};
