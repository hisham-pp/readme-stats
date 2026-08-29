"use client";

import { useState, useMemo, useEffect } from "react";
import TechSelect from "@/components/TechSelect";
import { techStack } from "@/config/techs.config";
import { THEMES, Theme } from "@/types/github.types";

type ApiType = "tech-icon-marquee" | "tech-badge-marquee" | "top-langs" | "stats";

export default function BuilderPage() {
  const [apiType, setApiType] = useState<ApiType>("tech-icon-marquee");
  const [theme, setTheme] = useState<Theme>("default");
  const [selectedTechs, setSelectedTechs] = useState<{value: string, label: string, icon?: string}[]>([]);
  const [width, setWidth] = useState("850");
  const [hasBg, setHasBg] = useState(false);
  const [username, setUsername] = useState("hisham-pp");
  const [topLangsType, setTopLangsType] = useState("default");

  // Options for React Select, grouped by category
  const techOptions = useMemo(() => {
    // Group technologies by category
    const grouped = techStack.reduce((acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push({
        value: tech.id,
        label: tech.name,
        icon: tech.icon // Pass icon for the custom component
      });
      return acc;
    }, {} as Record<string, {value: string, label: string, icon: string}[]>);

    // Format for react-select grouped options
    return Object.entries(grouped)
      .map(([category, options]) => ({
        label: category,
        options: options.sort((a, b) => a.label.localeCompare(b.label))
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // Build the URL based on selections
  const generatedUrl = useMemo(() => {
    const params = new URLSearchParams();
    
    if (apiType === "tech-icon-marquee" || apiType === "tech-badge-marquee") {
      if (selectedTechs.length > 0) {
        params.set("techs", selectedTechs.map(t => t.value).join(","));
      }
      if (theme !== "default") params.set("theme", theme);
      if (width && width !== "850") params.set("width", width);
      if (apiType === "tech-icon-marquee" && hasBg) params.set("hasbg", "true");
    } 
    else if (apiType === "top-langs") {
      if (username) params.set("username", username);
      if (theme !== "default") params.set("theme", theme);
      if (topLangsType !== "default") params.set("type", topLangsType);
    }
    else if (apiType === "stats") {
      if (username) params.set("username", username);
      if (theme !== "default") params.set("theme", theme);
    }

    const qs = params.toString();
    return `${baseUrl}/api/${apiType}${qs ? `?${qs}` : ""}`;
  }, [apiType, theme, selectedTechs, width, hasBg, username, topLangsType, baseUrl]);

  const markdownCode = `[![Readme Stats](${generatedUrl})](${generatedUrl})`;
  const htmlCode = `<img src="${generatedUrl}" alt="Readme Stats" />`;

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-900 font-sans p-8">
      <main className="flex w-full max-w-6xl flex-col mt-4 gap-8 lg:flex-row">
        
        {/* Left: Configuration Form */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 bg-zinc-950 p-6 rounded-xl border border-zinc-800 h-fit">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 mb-1">API Builder</h2>
            <p className="text-xs text-zinc-400">Configure parameters to generate your URL</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">Type</label>
            <select
              value={apiType}
              onChange={(e) => setApiType(e.target.value as ApiType)}
              className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:border-zinc-500"
            >
              <option value="tech-icon-marquee">Icon Marquee</option>
              <option value="tech-badge-marquee">Badge Marquee</option>
              <option value="top-langs">Top Languages</option>
              <option value="stats">GitHub Stats</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:border-zinc-500"
            >
              {THEMES.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          {(apiType === "tech-icon-marquee" || apiType === "tech-badge-marquee") && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">Technologies</label>
                <TechSelect
                  isMulti
                  options={techOptions}
                  value={selectedTechs}
                  onChange={(val: any) => setSelectedTechs(val)}
                  placeholder="Select technologies..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">ViewBox Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {apiType === "tech-icon-marquee" && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="hasBg"
                    checked={hasBg}
                    onChange={(e) => setHasBg(e.target.checked)}
                    className="w-4 h-4 rounded bg-zinc-900 border-zinc-800"
                  />
                  <label htmlFor="hasBg" className="text-sm font-medium text-zinc-300">
                    Include Icon Backgrounds
                  </label>
                </div>
              )}
            </>
          )}

          {(apiType === "top-langs" || apiType === "stats") && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">GitHub Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:border-zinc-500"
                placeholder="e.g. hisham-pp"
              />
            </div>
          )}

          {apiType === "top-langs" && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">Style Type</label>
              <select
                value={topLangsType}
                onChange={(e) => setTopLangsType(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:border-zinc-500"
              >
                <option value="default">Default Dots</option>
                <option value="icon">Icons</option>
                <option value="badge">Badges</option>
                <option value="treemap_icon">Treemap Icons</option>
                <option value="treemap_badge">Treemap Badges</option>
              </select>
            </div>
          )}

        </div>

        {/* Right: Preview and Code */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          <div className="w-full bg-zinc-950 p-6 rounded-xl border border-zinc-800 h-fit">
            <h3 className="text-lg font-bold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">Live Preview</h3>
            <div className="w-full bg-[#0d1117] p-8 rounded-lg flex items-center justify-center overflow-x-auto min-h-[200px] border border-zinc-800">
              {baseUrl ? (
                <img src={generatedUrl} alt="Preview" className="max-w-full" />
              ) : (
                <span className="text-zinc-500">Loading preview...</span>
              )}
            </div>
          </div>

          <div className="w-full bg-zinc-950 p-6 rounded-xl border border-zinc-800 h-fit flex flex-col gap-4">
            <h3 className="text-lg font-bold text-zinc-100 border-b border-zinc-800 pb-2">Generated Code</h3>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-medium text-zinc-400 uppercase">Direct URL</label>
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedUrl)}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded hover:bg-zinc-700"
                >
                  Copy
                </button>
              </div>
              <input 
                readOnly 
                value={generatedUrl} 
                className="w-full bg-zinc-900 text-zinc-300 px-3 py-2 rounded font-mono text-xs border border-zinc-800" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-medium text-zinc-400 uppercase">Markdown</label>
                <button 
                  onClick={() => navigator.clipboard.writeText(markdownCode)}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded hover:bg-zinc-700"
                >
                  Copy
                </button>
              </div>
              <textarea 
                readOnly 
                value={markdownCode} 
                className="w-full bg-zinc-900 text-zinc-300 px-3 py-2 rounded font-mono text-xs border border-zinc-800 resize-none h-16" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-medium text-zinc-400 uppercase">HTML</label>
                <button 
                  onClick={() => navigator.clipboard.writeText(htmlCode)}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded hover:bg-zinc-700"
                >
                  Copy
                </button>
              </div>
              <textarea 
                readOnly 
                value={htmlCode} 
                className="w-full bg-zinc-900 text-zinc-300 px-3 py-2 rounded font-mono text-xs border border-zinc-800 resize-none h-16" 
              />
            </div>
            
          </div>
        </div>

      </main>
    </div>
  );
}
