"use client";

import { techStack } from "@/config/techs.config";
import { useState } from "react";

export default function BadgesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const badgesList = techStack.filter(t => {
    if (!t.badge) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(query) || 
      t.id.toLowerCase().includes(query) ||
      t.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-900 font-sans p-8">
      <main className="flex w-full max-w-6xl flex-col mt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">All Badges</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Browse all available SVGs. Use the <code>?techs=...</code> parameter to load these directly in the API.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-w-[250px]">
            <input
              type="text"
              placeholder="Search badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badgesList.map((item) => (
            <div key={item.id} className="flex flex-col p-5 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-zinc-200 truncate pr-2">{item.name}</h3>
                <code className="text-[10px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{item.id}</code>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {/* Default Theme */}
                <div className="flex items-center justify-between w-full h-12 px-4 bg-[#0d1117] rounded border border-zinc-800 group-hover:bg-[#161b22] transition-colors" title="Default Theme">
                  <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Default</span>
                  <img
                    src={`/badges/default/${item.badge}`}
                    alt={`${item.name} default`}
                    className="max-h-6 transition-transform group-hover:scale-105"
                  />
                </div>
                
                {/* Dark Theme */}
                <div className="flex items-center justify-between w-full h-12 px-4 bg-zinc-100 rounded border border-zinc-300 group-hover:bg-white transition-colors" title="Dark Theme (Best on Light Backgrounds)">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Dark</span>
                  <img
                    src={`/badges/dark/${item.badge}`}
                    alt={`${item.name} dark`}
                    className="max-h-6 transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Light Theme */}
                <div className="flex items-center justify-between w-full h-12 px-4 bg-zinc-950 rounded border border-black group-hover:bg-zinc-900 transition-colors" title="Light Theme (Best on Dark Backgrounds)">
                  <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Light</span>
                  <img
                    src={`/badges/light/${item.badge}`}
                    alt={`${item.name} light`}
                    className="max-h-6 transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
