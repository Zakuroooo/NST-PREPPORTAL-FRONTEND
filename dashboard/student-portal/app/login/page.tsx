import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-700 rounded px-2 py-1 text-white font-bold text-sm">NST</div>
        <span className="font-bold text-gray-900 text-base">PlacePrep</span>
      </div>

      <SignIn
        routing="hash"
        forceRedirectUrl="/dashboard"
        appearance={{

          elements: {
            rootBox: "w-full max-w-md",
            card: "shadow-sm border border-gray-200 rounded-2xl",
            headerTitle: "text-xl font-bold text-gray-900",
            headerSubtitle: "text-sm text-gray-500",
            formButtonPrimary:
              "bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors",
            footerActionLink: "text-blue-600 font-medium hover:underline",
          },
        }}
      />
    </div>
  );
}
