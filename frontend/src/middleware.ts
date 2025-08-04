import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

const publicPaths = ["/", "/signup"];

// * Guard for routes protection.
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (publicPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!publicPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/signup"],
};
