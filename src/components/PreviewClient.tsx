"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Copy, Check, ChevronRight } from "lucide-react";

export interface HeadingItem {
  depth: number;
  text: string;
  slug: string;
}

export interface PreviewDoc {
  id: string;
  title: string;
  category: string;
  order: number;
  content: string;
  html: string;
  headings: HeadingItem[];
}

interface PreviewClientProps {
  docs: PreviewDoc[];
  initialDocId?: string;
  currentBaseUrl?: string;
}

const PROD_BASE_URL = "https://readme-stats-theta-sepia.vercel.app";

export default function PreviewClient({
  docs,
  initialDocId = "overview",
  currentBaseUrl = PROD_BASE_URL,
}: PreviewClientProps) {
  const [activeDocId, setActiveDocId] = useState<string>(() => {
    if (initialDocId === "README") return "overview";
    return initialDocId || docs[0]?.id || "overview";
  });
  const [copied, setCopied] = useState(false);
  const [activeHeadingSlug, setActiveHeadingSlug] = useState<string>("");

  const [resolvedBaseUrl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      if (isLocalhost) {
        return window.location.origin;
      }
    }
    return currentBaseUrl;
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      let fileParam = params.get("file");
      if (fileParam === "README") fileParam = "overview";
      if (fileParam && docs.some((d) => d.id === fileParam)) {
        setActiveDocId(fileParam);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [docs]);

  // Track active heading on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingSlug(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0% -60% 0%" },
    );

    const headingEls = document.querySelectorAll("h2[id], h3[id]");
    headingEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeDocId]);

  const selectDoc = useCallback((docId: string) => {
    let cleanId = docId;
    if (cleanId === "README") cleanId = "overview";
    setActiveDocId(cleanId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("file", cleanId);
      window.history.pushState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const activeDoc = useMemo(() => {
    return docs.find((d) => d.id === activeDocId) || docs[0];
  }, [docs, activeDocId]);

  // Dynamically resolve base URL in content and HTML
  const activeContent = useMemo(() => {
    if (!activeDoc) return "";
    let c = activeDoc.content;
    if (resolvedBaseUrl !== PROD_BASE_URL) {
      c = c.replaceAll(PROD_BASE_URL, resolvedBaseUrl);
    }
    return c;
  }, [activeDoc, resolvedBaseUrl]);

  const activeHtml = useMemo(() => {
    if (!activeDoc) return "";
    let h = activeDoc.html;
    if (resolvedBaseUrl !== PROD_BASE_URL) {
      h = h.replaceAll(PROD_BASE_URL, resolvedBaseUrl);
    }
    return h;
  }, [activeDoc, resolvedBaseUrl]);

  const handleCopy = useCallback(async () => {
    if (!activeContent) return;
    try {
      await navigator.clipboard.writeText(activeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [activeContent]);

  // Intercept relative markdown links (e.g. ./badge-marquee.md)
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    const previewFile = target.getAttribute("data-preview-file");
    if (previewFile) {
      e.preventDefault();
      selectDoc(previewFile);
    }
  };

  // Group docs by category
  const categories = useMemo(() => {
    const map = new Map<string, PreviewDoc[]>();
    for (const doc of docs) {
      const list = map.get(doc.category) || [];
      list.push(doc);
      map.set(doc.category, list);
    }
    return Array.from(map.entries());
  }, [docs]);

  const scrollToHeading = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveHeadingSlug(slug);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] w-full bg-[#0a0a0a] text-zinc-200 font-sans">
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Left Navigation Sidebar (Next.js / MUI style) */}
        <aside className="w-full md:w-56 lg:w-64 flex-shrink-0">
          <div className="sticky top-20 flex flex-col gap-6">
            <nav className="flex flex-col gap-5">
              {categories.map(([category, categoryDocs]) => (
                <div key={category} className="flex flex-col gap-1.5">
                  <h4 className="text-xs font-semibold text-zinc-400 tracking-wider px-2">
                    {category}
                  </h4>
                  <div className="flex flex-col gap-0.5">
                    {categoryDocs.map((doc) => {
                      const isActive = doc.id === activeDocId;
                      return (
                        <button
                          key={doc.id}
                          onClick={() => selectDoc(doc.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-all ${
                            isActive
                              ? "bg-blue-500/10 text-blue-400 font-medium border-l-2 border-blue-500"
                              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"
                          }`}
                        >
                          {doc.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Center Main Article */}
        <main className="flex-1 min-w-0 w-full flex flex-col">
          {/* Breadcrumbs & Action Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800/80">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
              <span>Docs</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span>{activeDoc?.category}</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-zinc-300 font-semibold">
                {activeDoc?.title}
              </span>
            </div>

            {/* Standard "Copy Markdown" action button (like Next.js "Copy page") */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 rounded-lg transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          </div>

          {/* Rendered Documentation Content (Natural Document Flow) */}
          <article
            onClick={handleContainerClick}
            dangerouslySetInnerHTML={{ __html: activeHtml }}
            className="preview-markdown w-full pb-16"
          />
        </main>

        {/* Right Sidebar: "On this page" Table of Contents (MUI / Next.js style) */}
        {activeDoc?.headings && activeDoc.headings.length > 0 && (
          <aside className="hidden xl:block w-60 flex-shrink-0">
            <div className="sticky top-20 flex flex-col gap-3">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                On this page
              </span>
              <nav className="flex flex-col gap-1 border-l border-zinc-800/80 pl-3">
                {activeDoc.headings.map((h) => {
                  const isActive = activeHeadingSlug === h.slug;
                  return (
                    <button
                      key={h.slug}
                      onClick={() => scrollToHeading(h.slug)}
                      className={`text-left text-xs transition-colors py-1 ${
                        h.depth === 3 ? "pl-3 text-[11px]" : ""
                      } ${
                        isActive
                          ? "text-blue-400 font-medium -ml-3.5 border-l-2 border-blue-500 pl-3"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {h.text}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
