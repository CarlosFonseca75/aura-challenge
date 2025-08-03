import type { User } from "@/common/types";
import { apiFetcher } from "@/utils/fetcher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getUsers = async () => {
  const session = await getServerSession(authOptions);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;

  return apiFetcher<User[]>(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
};
