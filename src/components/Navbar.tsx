import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-zinc-100 flex items-center gap-2"
        >
          Readme Stats
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/brands"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Brands
          </Link>
          <Link
            href="/preview"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Preview
          </Link>
          <Link
            href="/docs"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/builder"
            className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded hover:bg-white transition-colors"
          >
            API Builder
          </Link>
        </div>
      </div>
    </nav>
  );
}
