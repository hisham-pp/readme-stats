"use client";

import { techStack } from "@/config/techs.config";
import { useState } from "react";

export default function BadgesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const badgesList = techStack.filter((t) => {
    if (!t.badge) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(query) ||
      t.id.toLowerCase().includes(query) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex flex-col min-h-screen items-center bg-transparent font-sans p-4 sm:p-8">
      <main className="flex w-full max-w-6xl flex-col mt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800/80 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              All Badges
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Browse all available SVGs. Use the{" "}
              <code className="text-zinc-300 font-mono bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                ?techs=...
              </code>{" "}
              parameter to load these directly in the API.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-w-[250px]">
            <input
              type="text"
              placeholder="Search badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2.5 bg-zinc-950/70 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all w-full text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badgesList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col p-5 bg-zinc-950/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-all group shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-zinc-200 truncate pr-2 group-hover:text-zinc-100">
                  {item.name}
                </h3>
                <code className="text-[10px] text-zinc-400 bg-zinc-900/80 px-1.5 py-0.5 rounded border border-zinc-800 font-mono">
                  {item.id}
                </code>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* Brand Theme */}
                <div
                  className="flex items-center justify-between w-full h-12 px-4 bg-[#0d1117] rounded border border-zinc-800 group-hover:bg-[#161b22] transition-colors cursor-pointer group/badge"
                  title="Click to copy: Brand Badge"
                  onClick={() => copyToClipboard(item.id)}
                >
                  <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover/badge:text-zinc-300">
                    Brand
                  </span>
                  <img
                    src={`/badges/brand/${item.badge}`}
                    alt={`${item.name} brand`}
                    className="max-h-6 transition-transform group-hover/badge:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toast Notification */}
        {copied && (
          <div className="fixed bottom-6 right-6 bg-zinc-100 text-zinc-900 px-4 py-2 rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied {copied}
          </div>
        )}
      </main>
    </div>
  );
}
