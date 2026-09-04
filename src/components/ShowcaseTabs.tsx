"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CloudRain,
  Layers,
  Activity,
  Copy,
  Check,
  Sparkles,
  Sliders,
  TrendingUp,
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  label: string;
  endpoint: string;
  description: string;
  iconName: "rain" | "badge" | "icon" | "langs" | "stats";
  previewSrc: string;
  markdownSnippet: string;
  builderHref: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "rain",
    label: "Rainfall Banner",
    endpoint: "/api/tech-icon-rain",
    description: "Animated tech icons falling behind your name and bio.",
    iconName: "rain",
    previewSrc:
      "/api/tech-icon-rain?techs=react,nextjs,typescript,tailwindcss,nodejs,python,docker,postgresql,redis&name=Hi%2C%20I'm%20Hisham&fontSize=54&description=Full%20Stack%20Engineer%20specializing%20in%20modern%20web%20and%20cloud%20systems.&width=850&height=280&color=FFFFFF&bgcolor=transparent",
    markdownSnippet: `<p align="center">\n  <img src="https://readme-stats-theta-sepia.vercel.app/api/tech-icon-rain?techs=react,nextjs,typescript,tailwindcss,nodejs,python,docker,postgresql,redis&name=Hi%2C%20I'm%20YourName&fontSize=54&description=Full%20Stack%20Engineer&width=850&height=280&color=FFFFFF&bgcolor=transparent" alt="Profile Banner" width="100%" />\n</p>`,
    builderHref: "/builder",
  },
  {
    id: "badge-marquee",
    label: "Badge Marquee",
    endpoint: "/api/tech-badge-marquee",
    description:
      "Infinite smooth-scrolling marquee with official brand badges.",
    iconName: "badge",
    previewSrc:
      "/api/tech-badge-marquee?techs=react,nextjs,angular,typescript,javascript,html5,css3,tailwindcss,mui,redux,zustand,nodejs,python,postgresql,docker,aws&v=7",
    markdownSnippet: `<p align="center">\n  <img src="https://readme-stats-theta-sepia.vercel.app/api/tech-badge-marquee?techs=react,nextjs,typescript,tailwindcss,nodejs,python,postgresql,docker" alt="Tech Stack" width="850" />\n</p>`,
    builderHref: "/builder",
  },
  {
    id: "icon-marquee",
    label: "Themed Icon Marquee",
    endpoint: "/api/tech-icon-marquee",
    description: "Clean icons centered inside themed background blocks.",
    iconName: "icon",
    previewSrc:
      "/api/tech-icon-marquee?theme=bg&techs=nodejs,nestjs,python,django,fastapi,postgresql,mongodb,redis,docker,kubernetes,aws,linux,git,github&v=7",
    markdownSnippet: `<p align="center">\n  <img src="https://readme-stats-theta-sepia.vercel.app/api/tech-icon-marquee?theme=bg&techs=nodejs,nestjs,python,fastapi,docker,aws,linux,git" alt="Backend Stack" width="850" />\n</p>`,
    builderHref: "/builder",
  },
  {
    id: "top-langs",
    label: "Top Languages",
    endpoint: "/api/top-langs",
    description: "GitHub language distribution rendered with custom icons.",
    iconName: "langs",
    previewSrc: "/api/top-langs?username=hisham-pp&type=icon&v=2",
    markdownSnippet: `<p align="center">\n  <img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=your-username&type=icon" alt="Top Languages" />\n</p>`,
    builderHref: "/builder",
  },
  {
    id: "stats",
    label: "GitHub Stats Card",
    endpoint: "/api/stats",
    description: "Live statistics card summarizing stars, commits, and PRs.",
    iconName: "stats",
    previewSrc: "/api/stats?username=hisham-pp&theme=dark",
    markdownSnippet: `<p align="center">\n  <img src="https://readme-stats-theta-sepia.vercel.app/api/stats?username=your-username&theme=dark" alt="GitHub Stats" />\n</p>`,
    builderHref: "/docs",
  },
];

export default function ShowcaseTabs() {
  const [activeTabId, setActiveTabId] = useState("rain");
  const [copied, setCopied] = useState(false);

  const activeItem =
    SHOWCASE_ITEMS.find((i) => i.id === activeTabId) || SHOWCASE_ITEMS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeItem.markdownSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const renderIcon = (type: ShowcaseItem["iconName"]) => {
    switch (type) {
      case "rain":
        return <CloudRain className="w-4 h-4 text-cyan-400" />;
      case "badge":
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case "icon":
        return <Sparkles className="w-4 h-4 text-blue-400" />;
      case "langs":
        return <Activity className="w-4 h-4 text-purple-400" />;
      case "stats":
        return <TrendingUp className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Tabs Bar */}
      <div className="bg-zinc-900/90 border-b border-zinc-800 px-4 pt-3 flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 min-w-max pb-3">
          {SHOWCASE_ITEMS.map((item) => {
            const isActive = item.id === activeTabId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTabId(item.id);
                  setCopied(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                {renderIcon(item.iconName)}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 pb-3">
          <Link
            href={activeItem.builderHref}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition-colors"
          >
            <Sliders className="w-3 h-3 text-blue-400" />
            <span>Customize</span>
          </Link>
        </div>
      </div>

      {/* Info strip */}
      <div className="px-6 py-3 bg-zinc-900/40 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <code className="font-mono text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50 text-[11px]">
            {activeItem.endpoint}
          </code>
          <span className="text-zinc-400 hidden sm:inline">•</span>
          <span className="text-zinc-400">{activeItem.description}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">
                  Copied Markdown
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Preview Container */}
      <div className="p-6 md:p-10 bg-[#0d1117] flex flex-col items-center justify-center min-h-[320px] overflow-x-auto">
        <img
          src={activeItem.previewSrc}
          alt={activeItem.label}
          className="max-w-full h-auto rounded shadow-lg mx-auto"
        />
      </div>

      {/* Code Snippet Tray */}
      <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 font-mono text-[11px] text-zinc-400 bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 truncate">
          {activeItem.markdownSnippet.replace(/\n/g, " ")}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? "Copied!" : "Copy Markdown"}</span>
          </button>

          <Link
            href="/preview"
            className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition-colors"
          >
            All Previews →
          </Link>
        </div>
      </div>
    </div>
  );
}
