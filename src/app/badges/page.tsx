"use client";

import { techStack } from "@/config/techs.config";
import { useState } from "react";
import { THEMES, Theme } from "@/types/github.types";

export default function BadgesPage() {
  const [theme, setTheme] = useState<Theme>("default");

  const badgesList = techStack.filter(t => t.badge);

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-900 font-sans p-8">
      <main className="flex w-full max-w-5xl flex-col mt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">All Badges</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Browse all available badge SVGs. 
            </p>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Preview Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
            >
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {badgesList.map((item) => (
            <div key={item.id} className="flex flex-col items-center justify-center p-4 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group">
              <div className="h-8 flex items-center justify-center mb-3">
                <img
                  src={`/badges/${theme}/${item.badge}`}
                  alt={item.name}
                  className="max-h-full transition-transform group-hover:scale-105"
                />
              </div>
              <code className="text-[10px] text-zinc-500 truncate max-w-full" title={item.id}>
                {item.name}
              </code>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
