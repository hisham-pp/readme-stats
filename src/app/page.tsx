import Link from "next/link";
import ShowcaseTabs from "@/components/ShowcaseTabs";
import {
  CloudRain,
  Layers,
  Sparkles,
  Activity,
  ArrowRight,
  Sliders,
  FileCode2,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start font-sans p-4 sm:p-8 pt-10 sm:pt-14 text-zinc-100">
      <main className="flex w-full max-w-5xl flex-col items-center justify-center mb-16">
        {/* Hero Section */}
        <section className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dynamic GitHub Profile SVG Generator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4 leading-tight">
            Supercharge Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              GitHub Profile README
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Generate animated tech marquees, rainfall banners, top language
            visualizations, and activity stats as lightweight vector SVGs. Ready
            to copy-paste directly into your profile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25"
            >
              <Sliders className="w-4 h-4" />
              <span>Open API Builder</span>
            </Link>

            <Link
              href="/preview"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm rounded-xl border border-zinc-700 transition-all"
            >
              <FileCode2 className="w-4 h-4 text-blue-400" />
              <span>Browse Previews</span>
            </Link>

            <Link
              href="/brands"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors"
            >
              <span>Explore Brands</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-zinc-800/80 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>280+ Tech Icons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>480+ Official Badges</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Pure SVG (No JS)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>GitHub Dark & Light Compatible</span>
            </div>
          </div>
        </section>

        {/* Live Interactive Showcase */}
        <section className="w-full mb-16">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-100">
                Live Component Showcase
              </h2>
              <p className="text-xs text-zinc-400">
                Switch components below to preview live SVGs and copy markdown
                snippets.
              </p>
            </div>
            <Link
              href="/preview"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <span>Open in Full Previewer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ShowcaseTabs />
        </section>

        {/* Core Endpoints & Capabilities Grid */}
        <section className="w-full mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">
              Everything You Need For Your Profile
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Each endpoint serves a self-contained SVG with pure CSS keyframe
              animations that work seamlessly inside GitHub README markdown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="group relative bg-zinc-950/60 hover:bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <code className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                    /api/tech-icon-rain
                  </code>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-1.5 group-hover:text-cyan-300 transition-colors">
                  Tech Rainfall Banner
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  A high-impact header banner featuring animated technology
                  icons raining down behind your personalized name, tagline, and
                  custom dimensions.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Custom bio & title</span>
                <Link
                  href="/preview?file=tech-icon-rain"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-zinc-950/60 hover:bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <code className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                    /api/tech-badge-marquee
                  </code>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-1.5 group-hover:text-emerald-300 transition-colors">
                  Tech Badge Marquee
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Smooth, infinitely scrolling marquee of official brand badges
                  with crisp logos and labels. Perfect for organizing frontend,
                  backend, or cloud tools.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  480+ official brand badges
                </span>
                <Link
                  href="/preview?file=badge-marquee"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-zinc-950/60 hover:bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <code className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                    /api/tech-icon-marquee
                  </code>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-1.5 group-hover:text-blue-300 transition-colors">
                  Themed Icon Marquee
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Minimalist icon marquees available with transparent
                  backgrounds or encased in themed container blocks (
                  <code className="text-zinc-300">?theme=bg</code>).
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  Dark, Light & Themed styles
                </span>
                <Link
                  href="/preview?file=icon-marquee"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-zinc-950/60 hover:bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <code className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                    /api/top-langs
                  </code>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-1.5 group-hover:text-purple-300 transition-colors">
                  Languages & Stats
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Real-time GitHub stats and language distribution with
                  customizable visual styles including colored dots, custom tech
                  icons, full badges, and treemaps.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  Live GitHub API integration
                </span>
                <Link
                  href="/preview?file=top-langs"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group relative bg-zinc-950/60 hover:bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <code className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                    /api/snake
                  </code>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-1.5 group-hover:text-emerald-300 transition-colors">
                  Contribution Snake
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Dynamic animated SVG that crawls through your real GitHub
                  activity squares, eating contribution dots in real-time.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Zero setup required</span>
                <Link
                  href="/preview?file=snake"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 6 */}
            <div className="group relative bg-zinc-950/60 hover:bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <code className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                    GitHub Actions
                  </code>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-1.5 group-hover:text-indigo-300 transition-colors">
                  Pre-Generation Pipeline
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pre-generate all your profile SVGs on a scheduled cron and
                  deploy to an output branch for instant loading with zero cold
                  starts.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500">Zero cold-start speed</span>
                <Link
                  href="/preview?file=pipeline"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step How It Works */}
        <section className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-zinc-100 mb-2">
                Ready to customize your profile?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Use our visual API builder to select technologies, customize
                colors and themes, and generate copy-pasteable Markdown in
                seconds.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/builder"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors shadow"
              >
                Launch Builder
              </Link>
              <Link
                href="/brands"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs rounded-lg border border-zinc-800 transition-colors"
              >
                Browse Brands
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
