import { HttpStatus } from "@/common/enums";
import type { ApiResponse } from "@/common/types";
import { Dayjs } from "@/utils/date";

export async function apiFetcher<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, options);
    const data: ApiResponse<T> = await res.json();

    if (!res.ok) throw new Error(data.message || "Request failed");

    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
      status: HttpStatus.InternalServerError,
      timestamp: Dayjs.nowUtc(),
    };
  }
}
