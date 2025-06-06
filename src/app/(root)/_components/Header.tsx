import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileButton from "./HeaderProfileButton";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  console.log({ convexUser });

  return (
    <div className="relative z-10">
      <div className="flex flex-wrap items-center gap-3 lg:justify-between md:justify-center bg-[#0a0a0f]/80 backdrop-blur-xl p-4 mb-4 rounded-lg">
        <div className="flex items-center gap-4 w-full md:w-auto justify-center">
          <Link
            href="/"
            className="flex items-center gap-3 group relative md:mt-4 lg:mt-1"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            <div className="relative hidden sm:block bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
              <img
                src="/Devium-logo.svg"
                alt="Devium-logo"
                className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col text-center">
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text hidden sm:block">
                Devium
              </span>
              <span className="text-xs text-blue-400/60 font-medium hidden sm:block">
                Code. Create. Conquer.
              </span>
            </div>
          </Link>
          <nav className="flex items-center space-x-1 mt-4 md:mt-4 lg:mt-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm hidden sm:block font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
          </nav>
          <div className="mt-4 md:mt-4 lg:mt-1">
            <ThemeSelector />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 md:mt-4 lg:mt-1 w-full md:w-auto justify-center">
          <div className="flex items-center gap-3 w-auto">
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          </div>
          {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )}
          <SignedIn>
            <RunButton />
          </SignedIn>
          <div className="pl-3 border-l border-gray-800">
            <HeaderProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
