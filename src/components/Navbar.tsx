import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-zinc-100 font-bold text-lg tracking-tight hover:opacity-95 transition-opacity"
        >
          <Image
            src="/icon.svg"
            alt="Readme Stats Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg shadow-md shadow-blue-500/20 border border-zinc-800/80 group-hover:scale-105 transition-transform"
            priority
          />
          <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Readme Stats
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            v2.0
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/brands"
            className="px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 rounded-lg transition-colors"
          >
            Brands
          </Link>
          <Link
            href="/preview"
            className="px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 rounded-lg transition-colors"
          >
            Preview
          </Link>
          <Link
            href="/builder"
            className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg shadow-sm shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>API Builder</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
