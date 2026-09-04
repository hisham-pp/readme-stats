"use client";

import { useState, useMemo, useEffect } from "react";
import TechSelect from "@/components/TechSelect";
import { techStack } from "@/config/techs.config";

export type ApiType =
  | "tech-icon-marquee"
  | "tech-badge-marquee"
  | "tech-icon-rain"
  | "activity-graph"
  | "streak"
  | "stats"
  | "top-langs"
  | "terminal"
  | "pin"
  | "icon"
  | "badge";

const API_OPTIONS: { value: ApiType; label: string; category: string }[] = [
  { value: "tech-icon-marquee", label: "Icon Marquee", category: "Marquees" },
  { value: "tech-badge-marquee", label: "Badge Marquee", category: "Marquees" },
  { value: "tech-icon-rain", label: "Rainfall Banner", category: "Banners" },
  {
    value: "activity-graph",
    label: "Activity Graph",
    category: "Stats & Metrics",
  },
  { value: "streak", label: "GitHub Streak", category: "Stats & Metrics" },
  { value: "stats", label: "GitHub Stats", category: "Stats & Metrics" },
  { value: "top-langs", label: "Top Languages", category: "Stats & Metrics" },
  { value: "terminal", label: "Typing Terminal", category: "Animations" },
  { value: "pin", label: "Pinned Repositories", category: "Repositories" },
  { value: "icon", label: "Single Icon", category: "Tech Stack" },
  { value: "badge", label: "Single Badge", category: "Tech Stack" },
];

const EXTENDED_THEMES = [
  "brand",
  "dark",
  "matrix",
  "dracula",
  "monokai",
  "light",
  "transparent",
  "bg",
] as const;

export default function BuilderPage() {
  const [apiType, setApiType] = useState<ApiType>("tech-icon-marquee");
  const [theme, setTheme] = useState<string>("brand");
  const [selectedTechs, setSelectedTechs] = useState<
    { value: string; label: string; icon?: string }[]
  >([]);
  const [width, setWidth] = useState("850");
  const [username, setUsername] = useState("hisham-pp");

  // Top Langs
  const [topLangsType, setTopLangsType] = useState("default");

  // Tech Icon Rain
  const [rainName, setRainName] = useState("Hi, I'm Hisham");
  const [rainDesc, setRainDesc] = useState(
    "Full Stack Engineer & Open Source Creator",
  );
  const [rainHeight, setRainHeight] = useState("300");
  const [rainColor, setRainColor] = useState("#FFFFFF");
  const [rainBgColor, setRainBgColor] = useState("transparent");
  const [rainFontSize, setRainFontSize] = useState("54");

  // Activity Graph
  const [graphDays, setGraphDays] = useState("365");
  const [graphLineColor, setGraphLineColor] = useState("");
  const [graphAreaColor, setGraphAreaColor] = useState("");
  const [graphHideTitle, setGraphHideTitle] = useState(false);
  const [graphHideMetrics, setGraphHideMetrics] = useState(false);

  // Terminal
  const [terminalTitle, setTerminalTitle] = useState("bash — 80x24");
  const [terminalPrompt, setTerminalPrompt] = useState("➜ ~");
  const [terminalLines, setTerminalLines] = useState(
    "whoami:Principal Engineer;git status:100% test coverage;echo $GOAL:Build scalable web systems",
  );

  // Pin
  const [pinRepos, setPinRepos] = useState("readme-stats");
  const [pinCols, setPinCols] = useState("2");
  const [pinShowOwner, setPinShowOwner] = useState(false);
  const [pinDesc, setPinDesc] = useState("");

  // Single Icon / Badge
  const [singleTech, setSingleTech] = useState("react");
  const [singleIconSize, setSingleIconSize] = useState("48");
  const [singleBadgeHeight, setSingleBadgeHeight] = useState("20");

  // URL Encoder / Decoder Tool State
  const [encoderInput, setEncoderInput] = useState("");
  const [encoderMode, setEncoderMode] = useState<"encode" | "decode">("encode");
  const [copiedEncoder, setCopiedEncoder] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Base URL
  const [baseUrl, setBaseUrl] = useState("");

  // Options for React Select, grouped by category
  const techOptions = useMemo(() => {
    const grouped = techStack.reduce(
      (acc, tech) => {
        if (!acc[tech.category]) {
          acc[tech.category] = [];
        }
        acc[tech.category].push({
          value: tech.id,
          label: tech.name,
          icon: tech.icon,
          tags: tech.tags,
        });
        return acc;
      },
      {} as Record<
        string,
        { value: string; label: string; icon: string; tags?: string[] }[]
      >,
    );

    return Object.entries(grouped)
      .map(([category, options]) => ({
        label: category,
        options: options.sort((a, b) => a.label.localeCompare(b.label)),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  // Hydrate state from URL query parameters (shareable link loader)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBaseUrl(window.location.origin);

    if (typeof window !== "undefined" && window.location.search) {
      try {
        const p = new URLSearchParams(window.location.search);
        const t = p.get("type") as ApiType;
        if (t && API_OPTIONS.some((opt) => opt.value === t)) {
          setApiType(t);
        }
        const th = p.get("theme");
        if (th) setTheme(th);
        const u = p.get("username") || p.get("user");
        if (u) setUsername(u);
        const w = p.get("width");
        if (w) setWidth(w);

        const techsParam = p.get("techs");
        if (techsParam) {
          const ids = techsParam.split(",").map((s) => s.trim().toLowerCase());
          const matched = ids.map((id) => {
            const found = techStack.find((item) => item.id === id);
            return {
              value: id,
              label: found?.name || id,
              icon: found?.icon,
            };
          });
          setSelectedTechs(matched);
        }

        const lType = p.get("langs_type") || p.get("type");
        if (
          lType &&
          [
            "default",
            "icon",
            "badge",
            "treemap_icon",
            "treemap_badge",
          ].includes(lType)
        ) {
          setTopLangsType(lType);
        }

        const rName = p.get("name");
        if (rName) setRainName(rName);
        const rDesc = p.get("description");
        if (rDesc) setRainDesc(rDesc);
        const rBg = p.get("bgcolor");
        if (rBg) setRainBgColor(rBg);

        const gDays = p.get("days");
        if (gDays) setGraphDays(gDays);
        const gLine = p.get("line_color");
        if (gLine) setGraphLineColor(gLine);
        const gArea = p.get("area_color");
        if (gArea) setGraphAreaColor(gArea);

        const termTitle = p.get("title");
        if (termTitle) setTerminalTitle(termTitle);
        const termLines = p.get("lines");
        if (termLines) setTerminalLines(termLines);

        const pRepos = p.get("repos") || p.get("repo");
        if (pRepos) setPinRepos(pRepos);

        const sTech = p.get("tech") || p.get("tech_name");
        if (sTech) setSingleTech(sTech);
      } catch (err) {
        console.error("Failed to hydrate builder state from URL:", err);
      }
    }
  }, []);

  // Compute live URL-encoded output for the Quick URL Encoder
  const encoderOutput = useMemo(() => {
    if (!encoderInput) return "";
    try {
      if (encoderMode === "encode") {
        return encodeURIComponent(encoderInput);
      } else {
        return decodeURIComponent(encoderInput);
      }
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }, [encoderInput, encoderMode]);

  // Build the generated URL with automatic parameter encoding
  const generatedUrl = useMemo(() => {
    const params = new URLSearchParams();

    if (apiType === "tech-icon-marquee" || apiType === "tech-badge-marquee") {
      if (selectedTechs.length > 0) {
        params.set("techs", selectedTechs.map((t) => t.value).join(","));
      }
      if (apiType !== "tech-badge-marquee" && theme !== "brand") {
        params.set("theme", theme);
      }
      if (width && width !== "850") params.set("width", width);
    } else if (apiType === "tech-icon-rain") {
      if (selectedTechs.length > 0) {
        params.set("techs", selectedTechs.map((t) => t.value).join(","));
      }
      if (rainName) params.set("name", rainName);
      if (rainDesc) params.set("description", rainDesc);
      if (theme !== "brand") params.set("theme", theme);
      if (rainBgColor) params.set("bgcolor", rainBgColor);
      if (rainColor && rainColor !== "#FFFFFF") params.set("color", rainColor);
      if (width && width !== "850") params.set("width", width);
      if (rainHeight && rainHeight !== "300") params.set("height", rainHeight);
      if (rainFontSize && rainFontSize !== "54")
        params.set("fontSize", rainFontSize);
    } else if (apiType === "activity-graph") {
      if (username) params.set("username", username);
      if (theme !== "brand") params.set("theme", theme);
      if (graphDays && graphDays !== "365") params.set("days", graphDays);
      if (graphLineColor) params.set("line_color", graphLineColor);
      if (graphAreaColor) params.set("area_color", graphAreaColor);
      if (graphHideTitle) params.set("hide_title", "true");
      if (graphHideMetrics) params.set("hide_metrics", "true");
    } else if (apiType === "streak") {
      if (username) params.set("username", username);
      if (theme !== "brand") params.set("theme", theme);
    } else if (apiType === "stats") {
      if (username) params.set("username", username);
      if (theme !== "brand") params.set("theme", theme);
    } else if (apiType === "top-langs") {
      if (username) params.set("username", username);
      if (theme !== "brand") params.set("theme", theme);
      if (topLangsType !== "default") params.set("type", topLangsType);
    } else if (apiType === "terminal") {
      if (username) params.set("username", username);
      if (terminalTitle && terminalTitle !== "bash — 80x24") {
        params.set("title", terminalTitle);
      }
      if (terminalPrompt && terminalPrompt !== "➜ ~") {
        params.set("prompt", terminalPrompt);
      }
      if (theme !== "brand") params.set("theme", theme);
      if (terminalLines) params.set("lines", terminalLines);
      if (width && width !== "850") params.set("width", width);
    } else if (apiType === "pin") {
      if (username) params.set("username", username);
      if (pinRepos) params.set("repos", pinRepos);
      if (pinCols && pinCols !== "2") params.set("cols", pinCols);
      if (theme !== "brand") params.set("theme", theme);
      if (pinShowOwner) params.set("show_owner", "true");
      if (pinDesc) params.set("description", pinDesc);
    } else if (apiType === "icon") {
      params.set("name", singleTech);
      if (theme !== "brand") params.set("theme", theme);
      if (singleIconSize && singleIconSize !== "48")
        params.set("size", singleIconSize);
    } else if (apiType === "badge") {
      params.set("name", singleTech);
      if (singleBadgeHeight && singleBadgeHeight !== "20") {
        params.set("height", singleBadgeHeight);
      }
    }

    const qs = params.toString();
    return `${baseUrl}/api/${apiType}${qs ? `?${qs}` : ""}`;
  }, [
    apiType,
    theme,
    selectedTechs,
    width,
    username,
    topLangsType,
    rainName,
    rainDesc,
    rainHeight,
    rainColor,
    rainBgColor,
    rainFontSize,
    graphDays,
    graphLineColor,
    graphAreaColor,
    graphHideTitle,
    graphHideMetrics,
    terminalTitle,
    terminalPrompt,
    terminalLines,
    pinRepos,
    pinCols,
    pinShowOwner,
    pinDesc,
    singleTech,
    singleIconSize,
    singleBadgeHeight,
    baseUrl,
  ]);

  // Shareable link that encodes all builder form parameters into URL query
  const shareableUrl = useMemo(() => {
    if (!baseUrl) return "";
    const params = new URLSearchParams();
    params.set("type", apiType);
    if (theme) params.set("theme", theme);
    if (username) params.set("username", username);
    if (selectedTechs.length > 0) {
      params.set("techs", selectedTechs.map((t) => t.value).join(","));
    }
    if (apiType === "top-langs" && topLangsType !== "default") {
      params.set("langs_type", topLangsType);
    }
    if (apiType === "tech-icon-rain") {
      if (rainName) params.set("name", rainName);
      if (rainDesc) params.set("description", rainDesc);
      if (rainBgColor) params.set("bgcolor", rainBgColor);
    }
    if (apiType === "activity-graph") {
      if (graphDays !== "365") params.set("days", graphDays);
      if (graphLineColor) params.set("line_color", graphLineColor);
      if (graphAreaColor) params.set("area_color", graphAreaColor);
    }
    if (apiType === "terminal") {
      if (terminalTitle) params.set("title", terminalTitle);
      if (terminalLines) params.set("lines", terminalLines);
    }
    if (apiType === "pin" && pinRepos) {
      params.set("repos", pinRepos);
    }
    if (apiType === "icon" || apiType === "badge") {
      params.set("tech", singleTech);
    }

    return `${baseUrl}/builder?${params.toString()}`;
  }, [
    baseUrl,
    apiType,
    theme,
    username,
    selectedTechs,
    topLangsType,
    rainName,
    rainDesc,
    rainBgColor,
    graphDays,
    graphLineColor,
    graphAreaColor,
    terminalTitle,
    terminalLines,
    pinRepos,
    singleTech,
  ]);

  const handleCopyShare = () => {
    if (!shareableUrl) return;
    navigator.clipboard.writeText(shareableUrl);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleCopyEncoder = () => {
    if (!encoderOutput) return;
    navigator.clipboard.writeText(encoderOutput);
    setCopiedEncoder(true);
    setTimeout(() => setCopiedEncoder(false), 2000);
  };

  const markdownCode = `[![Readme Stats](${generatedUrl})](${generatedUrl})`;
  const htmlCode = `<img src="${generatedUrl}" alt="Readme Stats" />`;

  return (
    <div className="flex flex-col min-h-screen items-center font-sans p-4 sm:p-6 lg:p-8">
      {/* Top Banner & Header */}
      <div className="w-full max-w-[1600px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 flex items-center gap-2.5">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              API Builder & URL Encoder
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Configure parameters, preview live SVGs, and encode string queries
            for seamless URL sharing.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleCopyShare}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold transition-all shadow-sm active:scale-95"
            title="Copies a shareable URL containing your exact builder configuration"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>
              {copiedShare ? "✓ Share Link Copied!" : "Share Configuration"}
            </span>
          </button>
        </div>
      </div>

      <main className="flex w-full max-w-[1600px] flex-col gap-8 lg:flex-row">
        {/* Left: Configuration Form */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 bg-zinc-950/70 backdrop-blur-md p-6 rounded-2xl border border-zinc-800/80 shadow-xl h-fit">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div>
              <h2 className="text-lg font-bold text-zinc-100">Parameters</h2>
              <p className="text-xs text-zinc-400">
                Select endpoint and fine-tune attributes
              </p>
            </div>
          </div>

          {/* API Type Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
              API Endpoint
            </label>
            <select
              value={apiType}
              onChange={(e) => setApiType(e.target.value as ApiType)}
              className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
            >
              {API_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.category})
                </option>
              ))}
            </select>
          </div>

          {/* Theme Selector (for applicable endpoints) */}
          {apiType !== "tech-badge-marquee" && apiType !== "badge" && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              >
                {EXTENDED_THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t === "bg"
                      ? "Transparent (bg)"
                      : t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Username Input for Profile/Stats endpoints */}
          {[
            "top-langs",
            "stats",
            "streak",
            "activity-graph",
            "terminal",
            "pin",
          ].includes(apiType) && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                GitHub Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                placeholder="e.g. hisham-pp"
              />
            </div>
          )}

          {/* Technologies Multi-select (for Marquees and Rainfall) */}
          {[
            "tech-icon-marquee",
            "tech-badge-marquee",
            "tech-icon-rain",
          ].includes(apiType) && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Technologies
                </label>
                {selectedTechs.length > 0 && (
                  <button
                    onClick={() => setSelectedTechs([])}
                    className="text-[10px] text-zinc-400 hover:text-zinc-200"
                  >
                    Clear all ({selectedTechs.length})
                  </button>
                )}
              </div>
              <TechSelect
                isMulti
                options={techOptions}
                value={selectedTechs}
                onChange={(val) =>
                  setSelectedTechs(
                    val as { value: string; label: string; icon?: string }[],
                  )
                }
                placeholder="Search technologies (e.g. React, Next.js, Python)..."
              />
            </div>
          )}

          {/* Tech Icon Rain Specific Parameters */}
          {apiType === "tech-icon-rain" && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Title Name
                </label>
                <input
                  type="text"
                  value={rainName}
                  onChange={(e) => setRainName(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  placeholder="e.g. Hi, I'm Hisham"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Subtitle Description
                </label>
                <input
                  type="text"
                  value={rainDesc}
                  onChange={(e) => setRainDesc(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  placeholder="e.g. Full Stack Engineer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    Background Color
                  </label>
                  <input
                    type="text"
                    value={rainBgColor}
                    onChange={(e) => setRainBgColor(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                    placeholder="transparent or #0D1117"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    Height
                  </label>
                  <input
                    type="number"
                    value={rainHeight}
                    onChange={(e) => setRainHeight(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    Text Color
                  </label>
                  <input
                    type="text"
                    value={rainColor}
                    onChange={(e) => setRainColor(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                    placeholder="#FFFFFF"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    Title Font Size
                  </label>
                  <input
                    type="number"
                    value={rainFontSize}
                    onChange={(e) => setRainFontSize(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                    placeholder="54"
                  />
                </div>
              </div>
            </>
          )}

          {/* Activity Graph Specific Parameters */}
          {apiType === "activity-graph" && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Timeline Days
                </label>
                <select
                  value={graphDays}
                  onChange={(e) => setGraphDays(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                >
                  <option value="365">365 Days (Full Year)</option>
                  <option value="180">180 Days (Half Year)</option>
                  <option value="90">90 Days (Quarter)</option>
                  <option value="30">30 Days (Month)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    Custom Line Color
                  </label>
                  <input
                    type="text"
                    value={graphLineColor}
                    onChange={(e) => setGraphLineColor(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                    placeholder="e.g. #ec4899"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    Custom Area Color
                  </label>
                  <input
                    type="text"
                    value={graphAreaColor}
                    onChange={(e) => setGraphAreaColor(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                    placeholder="e.g. #ec4899"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 select-none">
                  <input
                    type="checkbox"
                    checked={graphHideTitle}
                    onChange={(e) => setGraphHideTitle(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-800 text-blue-600 focus:ring-0"
                  />
                  <span>Hide Title Header</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 select-none">
                  <input
                    type="checkbox"
                    checked={graphHideMetrics}
                    onChange={(e) => setGraphHideMetrics(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-800 text-blue-600 focus:ring-0"
                  />
                  <span>Hide Top Metrics (Total, Weekly Avg, Peak)</span>
                </label>
              </div>
            </>
          )}

          {/* Terminal Parameters */}
          {apiType === "terminal" && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Window Title
                </label>
                <input
                  type="text"
                  value={terminalTitle}
                  onChange={(e) => setTerminalTitle(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  placeholder="e.g. bash — 80x24"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Shell Prompt Symbol
                </label>
                <input
                  type="text"
                  value={terminalPrompt}
                  onChange={(e) => setTerminalPrompt(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  placeholder="➜ ~"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Command:Output Lines (semicolon-separated)
                </label>
                <textarea
                  value={terminalLines}
                  onChange={(e) => setTerminalLines(e.target.value)}
                  rows={3}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 font-mono text-xs focus:outline-none focus:border-zinc-500"
                  placeholder="whoami:Engineer;cat bio.txt:Awesome systems"
                />
              </div>
            </>
          )}

          {/* Pinned Repos Parameters */}
          {apiType === "pin" && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Repository Name(s)
                </label>
                <input
                  type="text"
                  value={pinRepos}
                  onChange={(e) => setPinRepos(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  placeholder="e.g. repo1 or repo1,repo2"
                />
                <span className="text-[11px] text-zinc-500">
                  Separate with comma for multi-repo grid (e.g. repo1,repo2)
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Grid Columns
                </label>
                <select
                  value={pinCols}
                  onChange={(e) => setPinCols(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                >
                  <option value="1">1 Column</option>
                  <option value="2">2 Columns</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Custom Description Override (optional)
                </label>
                <input
                  type="text"
                  value={pinDesc}
                  onChange={(e) => setPinDesc(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  placeholder="Custom repo description"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 select-none pt-1">
                <input
                  type="checkbox"
                  checked={pinShowOwner}
                  onChange={(e) => setPinShowOwner(e.target.checked)}
                  className="rounded bg-zinc-900 border-zinc-800 text-blue-600 focus:ring-0"
                />
                <span>Show Owner in Title (owner/repo)</span>
              </label>
            </>
          )}

          {/* Single Icon & Badge Parameters */}
          {(apiType === "icon" || apiType === "badge") && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Technology
                </label>
                <input
                  type="text"
                  value={singleTech}
                  onChange={(e) => setSingleTech(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  placeholder="e.g. react, typescript, python, docker"
                />
              </div>

              {apiType === "icon" ? (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    Icon Size (px)
                  </label>
                  <input
                    type="number"
                    value={singleIconSize}
                    onChange={(e) => setSingleIconSize(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    Badge Height (px)
                  </label>
                  <input
                    type="number"
                    value={singleBadgeHeight}
                    onChange={(e) => setSingleBadgeHeight(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
                  />
                </div>
              )}
            </>
          )}

          {/* Top Languages Style Selector */}
          {apiType === "top-langs" && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                Style Type
              </label>
              <select
                value={topLangsType}
                onChange={(e) => setTopLangsType(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              >
                <option value="default">Default Dots</option>
                <option value="icon">Icons</option>
                <option value="badge">Badges</option>
                <option value="treemap_icon">Treemap Icons</option>
                <option value="treemap_badge">Treemap Badges</option>
              </select>
            </div>
          )}

          {/* ViewBox Width (Marquees, Rainfall, Terminal) */}
          {[
            "tech-icon-marquee",
            "tech-badge-marquee",
            "tech-icon-rain",
            "terminal",
          ].includes(apiType) && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                ViewBox Width
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 text-sm"
              />
            </div>
          )}
        </div>

        {/* Right: Preview, Generated Snippets, and URL Encoder */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Live Preview Card */}
          <div className="w-full bg-zinc-950/70 backdrop-blur-md p-6 rounded-2xl border border-zinc-800/80 shadow-xl h-fit">
            <h3 className="text-lg font-bold text-zinc-100 mb-4 border-b border-zinc-800/80 pb-3 flex items-center justify-between">
              <span>Live Preview</span>
              <span className="text-[11px] font-normal text-zinc-500">
                Real-time SVG rendering
              </span>
            </h3>
            <div className="w-full bg-[#0d1117] p-8 rounded-xl flex items-center justify-center overflow-x-auto min-h-[220px] border border-zinc-800/80 shadow-inner">
              {baseUrl ? (
                <img
                  src={generatedUrl}
                  alt="Preview"
                  className="max-w-full h-auto rounded"
                />
              ) : (
                <span className="text-zinc-500">Loading preview...</span>
              )}
            </div>
          </div>

          {/* Generated Code Snippets */}
          <div className="w-full bg-zinc-950/70 backdrop-blur-md p-6 rounded-2xl border border-zinc-800/80 shadow-xl h-fit flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="text-lg font-bold text-zinc-100">
                Generated Snippets
              </h3>
              <button
                onClick={handleCopyShare}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5"
              >
                <span>
                  {copiedShare
                    ? "✓ Copied Builder Link!"
                    : "🔗 Share Config Link"}
                </span>
              </button>
            </div>

            {/* Direct URL */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-medium text-zinc-400 uppercase">
                  Direct URL
                </label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedUrl);
                    setCopiedUrl(true);
                    setTimeout(() => setCopiedUrl(false), 2000);
                  }}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded hover:bg-zinc-700"
                >
                  {copiedUrl ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <input
                readOnly
                value={generatedUrl}
                className="w-full bg-zinc-900 text-zinc-300 px-3 py-2 rounded font-mono text-xs border border-zinc-800 select-all"
              />
            </div>

            {/* Markdown */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-medium text-zinc-400 uppercase">
                  Markdown
                </label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(markdownCode);
                    setCopiedMarkdown(true);
                    setTimeout(() => setCopiedMarkdown(false), 2000);
                  }}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded hover:bg-zinc-700"
                >
                  {copiedMarkdown ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <textarea
                readOnly
                value={markdownCode}
                className="w-full bg-zinc-900 text-zinc-300 px-3 py-2 rounded font-mono text-xs border border-zinc-800 resize-none h-16 select-all"
              />
            </div>

            {/* HTML */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-medium text-zinc-400 uppercase">
                  HTML
                </label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(htmlCode);
                    setCopiedHtml(true);
                    setTimeout(() => setCopiedHtml(false), 2000);
                  }}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded hover:bg-zinc-700"
                >
                  {copiedHtml ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <textarea
                readOnly
                value={htmlCode}
                className="w-full bg-zinc-900 text-zinc-300 px-3 py-2 rounded font-mono text-xs border border-zinc-800 resize-none h-16 select-all"
              />
            </div>
          </div>

          {/* Interactive URL String Encoder / Decoder */}
          <div className="w-full bg-zinc-950/70 backdrop-blur-md p-6 rounded-2xl border border-zinc-800/80 shadow-xl h-fit flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <span className="text-blue-400">🔤</span>
                  <span>URL String Encoder & Decoder</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Convert any custom text, bios, commands, or hex colors into
                  URL-encoded format for safe sharing
                </p>
              </div>
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs self-start sm:self-auto">
                <button
                  onClick={() => setEncoderMode("encode")}
                  className={`px-3 py-1 rounded transition-colors ${
                    encoderMode === "encode"
                      ? "bg-blue-600 text-white font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Encode String
                </button>
                <button
                  onClick={() => setEncoderMode("decode")}
                  className={`px-3 py-1 rounded transition-colors ${
                    encoderMode === "decode"
                      ? "bg-blue-600 text-white font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Decode URL
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Input Area */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    {encoderMode === "encode"
                      ? "Input String (Raw)"
                      : "Input String (URL-Encoded)"}
                  </label>
                  {/* Preset Helper Pills */}
                  {encoderMode === "encode" && (
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-zinc-500">Quick examples:</span>
                      <button
                        onClick={() => setEncoderInput("#38bdf8")}
                        className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono"
                      >
                        #38bdf8
                      </button>
                      <button
                        onClick={() => setEncoderInput("Hi, I'm Hisham! 👋")}
                        className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        Name/Bio
                      </button>
                      <button
                        onClick={() =>
                          setEncoderInput(
                            "whoami:Developer;cat bio.txt:Awesome software!",
                          )
                        }
                        className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        Terminal Lines
                      </button>
                    </div>
                  )}
                </div>
                <textarea
                  value={encoderInput}
                  onChange={(e) => setEncoderInput(e.target.value)}
                  placeholder={
                    encoderMode === "encode"
                      ? "Type or paste any text (e.g. #38bdf8, Hi, I'm Hisham!, whoami:Engineer;cat bio.txt:Building)..."
                      : "Paste URL-encoded text to decode (e.g. %2338bdf8 or Hi%2C%20I%27m%20Hisham)..."
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-500 resize-y"
                />
              </div>

              {/* Output Result */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                    {encoderMode === "encode"
                      ? "URL-Encoded Result"
                      : "Decoded Result"}
                  </label>
                  <button
                    onClick={handleCopyEncoder}
                    disabled={!encoderOutput}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-300 px-2.5 py-1 rounded transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>{copiedEncoder ? "✓ Copied!" : "Copy Result"}</span>
                  </button>
                </div>
                <div className="w-full p-3 bg-zinc-900/90 border border-zinc-800 rounded-lg text-emerald-400 font-mono text-xs break-all min-h-[46px] flex items-center select-all">
                  {encoderOutput ? (
                    encoderOutput
                  ) : (
                    <span className="text-zinc-600 italic">
                      Encoded output will appear here automatically...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
