import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase";


export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      console.log("user is authenticated, forwarding on");
      return NextResponse.next();
    }
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      console.log("user is not authenticated");
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Allow users visiting public routes to access them
    console.log("public route is being accessed");
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
