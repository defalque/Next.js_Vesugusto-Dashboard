// This file defines a Next.js middleware that runs on every request (except for static assets and images).
// Its main purpose is to ensure the user's Supabase session is up-to-date and to handle authentication logic globally.
// If a user is not authenticated and tries to access a protected route, it can redirect them to the login page.

import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

// The middleware function is called on every matched request.
// It delegates session management and authentication checks to updateSession.
export async function proxy(request: NextRequest) {
  // console.log("Middleware triggered for:", request.nextUrl.pathname);
  return await updateSession(request);
}

// The config object specifies which routes the middleware should run on.
// It excludes static files, image optimization routes, and common image assets.
export const config = {
  matcher: ["/dashboard/:path*"],
};
