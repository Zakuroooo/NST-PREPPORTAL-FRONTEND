import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = req.nextUrl.clone();

  // Not signed in → redirect to /login (except public routes)
  if (!userId && !isPublicRoute(req)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Signed in + onboarding not done + not on onboarding page → redirect to onboarding
  if (
    userId &&
    !isOnboardingRoute(req) &&
    !isPublicRoute(req) &&
    !(sessionClaims?.publicMetadata as { onboarding_done?: boolean })?.onboarding_done
  ) {
    // Allow access to dashboard if they've been through onboarding
    // Skip this redirect if we haven't set the metadata yet (first time users)
    // This prevents an infinite redirect — new users won't have the flag at all
    const meta = (sessionClaims?.publicMetadata as { onboarding_done?: boolean });
    if (meta && meta.onboarding_done === false) {
      url.pathname = "/onboarding/step1";
      return NextResponse.redirect(url);
    }
  }

  // Signed in + on /login or /register → redirect to dashboard
  if (userId && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    const meta = (sessionClaims?.publicMetadata as { onboarding_done?: boolean });
    if (meta?.onboarding_done === false) {
      url.pathname = "/onboarding/step1";
    } else {
      url.pathname = "/dashboard";
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
