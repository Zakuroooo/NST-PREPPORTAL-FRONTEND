import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const _isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register(.*)",
]);

export default clerkMiddleware(async (_auth, _req) => {
  // EMERGENCY DEMO MODE: Bypassing Clerk protection so teachers can view the Vercel link!
  // if (!isPublicRoute(req)) {
  //   await auth.protect();
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
