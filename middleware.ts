import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  debug: false,
  afterAuth(auth, req, evt) {
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      console.log("user is logged in");
      return NextResponse.next();
    }
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      console.log("user is not authenticated, redirecting to login");
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Allow users visiting public routes to access them
    console.log("going to a public route");
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
