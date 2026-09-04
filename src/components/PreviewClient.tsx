"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  ChevronRight,
  Search,
  Hash,
  FileText,
  CornerDownLeft,
  X,
  Sliders,
  Cpu,
} from "lucide-react";
import { techStack } from "@/config/techs.config";

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
  initialSlug?: string;
  currentBaseUrl?: string;
}

interface SearchItem {
  id: string;
  docId?: string;
  title: string;
  parentTitle?: string;
  category: string;
  slug?: string;
  url?: string;
  type: "doc" | "section" | "tool" | "tech";
}

const PROD_BASE_URL = "https://readme-stats-theta-sepia.vercel.app";

const QUICK_TOOLS: SearchItem[] = [
  {
    id: "tool-builder",
    title: "Visual API Builder",
    category: "Tools",
    url: "/builder",
    type: "tool",
  },
  {
    id: "tool-brands",
    title: "Browse Brand Badges",
    category: "Tools",
    url: "/brands",
    type: "tool",
  },
  {
    id: "tool-icons",
    title: "Browse Tech Icons",
    category: "Tools",
    url: "/icons",
    type: "tool",
  },
  {
    id: "tool-badges",
    title: "Browse All Badges",
    category: "Tools",
    url: "/badges",
    type: "tool",
  },
  {
    id: "tool-docs",
    title: "API Documentation & Endpoints",
    category: "Documentation",
    url: "/docs",
    type: "tool",
  },
];

export default function PreviewClient({
  docs,
  initialDocId = "overview",
  initialSlug,
  currentBaseUrl = PROD_BASE_URL,
}: PreviewClientProps) {
  const router = useRouter();
  const [activeDocId, setActiveDocId] = useState<string>(() => {
    let clean = initialDocId;
    if (clean?.includes("#")) {
      clean = clean.split("#")[0];
    }
    clean = clean?.replace(/^(\.\.\/|\.\/)+/, "").replace(/\.md$/, "");
    if (clean === "README" || !clean) return "overview";
    return docs.some((d) => d.id === clean) ? clean : docs[0]?.id || "overview";
  });
  const [copied, setCopied] = useState(false);
  const [activeHeadingSlug, setActiveHeadingSlug] = useState<string>(
    () => initialSlug || "",
  );

  // Auto scroll to target heading slug on initial mount
  useEffect(() => {
    if (initialSlug) {
      setTimeout(() => {
        const el = document.getElementById(initialSlug);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveHeadingSlug(initialSlug);
        }
      }, 200);
    }
  }, [initialSlug]);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
      const rawFile = params.get("file");
      let cleanFile = rawFile ? rawFile.split("#")[0] : "";
      cleanFile = cleanFile.replace(/^(\.\.\/|\.\/)+/, "").replace(/\.md$/, "");
      if (cleanFile === "README" || !cleanFile) cleanFile = "overview";
      if (docs.some((d) => d.id === cleanFile)) {
        setActiveDocId(cleanFile);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [docs]);

  const openSearch = useCallback(() => {
    setSearchQuery("");
    setSelectedIndex(0);
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  // Global keyboard shortcut for search (Ctrl+K / Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => {
          if (!prev) {
            setSearchQuery("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      } else if (e.key === "/" && !isSearchOpen) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          openSearch();
        }
      } else if (e.key === "Escape" && isSearchOpen) {
        e.preventDefault();
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, openSearch, closeSearch]);

  // Focus search input on modal open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Scroll active item into view during keyboard navigation
  useEffect(() => {
    if (resultItemRefs.current[selectedIndex]) {
      resultItemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selectedIndex]);

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

  const selectDoc = useCallback((docId: string, slug?: string) => {
    let cleanId = docId;
    if (cleanId === "README") cleanId = "overview";
    setActiveDocId(cleanId);
    setIsSearchOpen(false);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("file", cleanId);
      window.history.pushState({}, "", url.toString());

      if (slug) {
        setTimeout(() => {
          const el = document.getElementById(slug);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setActiveHeadingSlug(slug);
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, []);

  const handleSelectSearchItem = useCallback(
    (item: SearchItem) => {
      if (item.url) {
        setIsSearchOpen(false);
        router.push(item.url);
      } else if (item.docId) {
        selectDoc(item.docId, item.slug);
      }
    },
    [router, selectDoc],
  );

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

  // Intercept relative markdown links and code snippet copy buttons
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 1. Copy snippet button click
    const copyBtn = (e.target as HTMLElement).closest<HTMLButtonElement>(
      ".code-copy-btn",
    );
    if (copyBtn) {
      e.preventDefault();
      e.stopPropagation();
      const wrapper = copyBtn.closest(".code-block-wrapper");
      const codeEl = wrapper?.querySelector("code");
      if (codeEl) {
        const textToCopy = codeEl.textContent ?? "";
        const copyText = copyBtn.querySelector(".copy-text");
        const copyIcon = copyBtn.querySelector(".copy-icon");
        const checkIcon = copyBtn.querySelector(".check-icon");

        const performCopy = async () => {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
              document.execCommand("copy");
            } finally {
              textArea.remove();
            }
          }
        };

        performCopy()
          .then(() => {
            if (copyText) copyText.textContent = "Copied!";
            if (copyIcon) copyIcon.classList.add("hidden");
            if (checkIcon) checkIcon.classList.remove("hidden");
            copyBtn.classList.add(
              "!text-emerald-400",
              "!border-emerald-500/50",
            );

            setTimeout(() => {
              if (copyText) copyText.textContent = "Copy";
              if (copyIcon) copyIcon.classList.remove("hidden");
              if (checkIcon) checkIcon.classList.add("hidden");
              copyBtn.classList.remove(
                "!text-emerald-400",
                "!border-emerald-500/50",
              );
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy code snippet:", err);
          });
      }
      return;
    }

    // 2. Intercept relative markdown links (e.g. ./badge-marquee.md or ./pipeline.md#section)
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    const previewFile = target.getAttribute("data-preview-file");
    if (previewFile) {
      e.preventDefault();
      let docTarget = previewFile;
      let slugTarget: string | undefined = undefined;
      if (docTarget.includes("#")) {
        const [d, s] = docTarget.split("#");
        docTarget = d;
        slugTarget = s;
      }
      selectDoc(docTarget, slugTarget);
    }
  };

  // Build complete searchable index items: ALL Docs, ALL Sections, Tools, and Techs
  const allSearchItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    // 1. All preview documents and their sections
    for (const doc of docs) {
      items.push({
        id: `doc-${doc.id}`,
        docId: doc.id,
        title: doc.title,
        category: doc.category,
        type: "doc",
      });

      for (const h of doc.headings) {
        items.push({
          id: `section-${doc.id}-${h.slug}`,
          docId: doc.id,
          title: h.text,
          parentTitle: doc.title,
          category: doc.category,
          slug: h.slug,
          type: "section",
        });
      }
    }

    // 2. Quick tools
    for (const tool of QUICK_TOOLS) {
      items.push(tool);
    }

    return items;
  }, [docs]);

  // Searchable technologies index
  const techSearchItems = useMemo<SearchItem[]>(() => {
    return techStack.map((tech) => ({
      id: `tech-${tech.id}`,
      title: `${tech.name} (${tech.category})`,
      category: "Technology",
      url: `/builder`,
      type: "tech" as const,
    }));
  }, []);

  // Filter search results without artificial truncation!
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // When empty, return ALL docs, sections, and tools organized
    if (!q) {
      return allSearchItems;
    }

    // When query exists, search docs, sections, tools, and all 239 technologies!
    const matches: SearchItem[] = [];
    for (const item of allSearchItems) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.parentTitle && item.parentTitle.toLowerCase().includes(q))
      ) {
        matches.push(item);
      }
    }

    for (const tech of techSearchItems) {
      if (
        tech.title.toLowerCase().includes(q) ||
        tech.category.toLowerCase().includes(q)
      ) {
        matches.push(tech);
      }
    }

    return matches;
  }, [searchQuery, allSearchItems, techSearchItems]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev + 1) % Math.max(1, searchResults.length),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, searchResults.length - 1) : prev - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = searchResults[selectedIndex];
      if (selected) {
        handleSelectSearchItem(selected);
      }
    }
  };

  // Group docs by category for the sidebar
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

  const renderSearchIcon = (type: SearchItem["type"]) => {
    switch (type) {
      case "section":
        return <Hash className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />;
      case "doc":
        return <FileText className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />;
      case "tool":
        return (
          <Sliders className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        );
      case "tech":
        return <Cpu className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] w-full bg-[#0a0a0a] text-zinc-200 font-sans">
      {/* Search Modal / Command Palette Dialog */}
      {isSearchOpen && (
        <div
          onClick={closeSearch}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-20 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150 max-h-[82vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 border-b border-zinc-800/80 bg-zinc-900/50">
              <Search className="w-4 h-4 text-zinc-400 flex-shrink-0 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search all docs, sections, technologies, tools..."
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 py-3.5 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedIndex(0);
                  }}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results List with Custom Dark Scrollbar and Full Items List */}
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 max-h-[480px]">
              {searchResults.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-500">
                  No matching documentation, sections, or technologies found.
                </div>
              ) : (
                searchResults.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        resultItemRefs.current[idx] = el;
                      }}
                      onClick={() => handleSelectSearchItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-blue-600/20 text-blue-200 border border-blue-500/40"
                          : "text-zinc-300 hover:bg-zinc-900/70 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {renderSearchIcon(item.type)}
                        <span className="font-medium truncate">
                          {item.title}
                        </span>
                        {item.parentTitle && (
                          <span className="text-[11px] text-zinc-500 truncate hidden sm:inline">
                            in {item.parentTitle}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-[10px] text-zinc-500 font-mono bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3 h-3 text-blue-400 hidden sm:block" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Keyboard Helper Footer */}
            <div className="bg-zinc-900/60 border-t border-zinc-800/80 px-4 py-2.5 flex items-center justify-between text-[11px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="font-mono bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400">
                    ↑
                  </kbd>
                  <kbd className="font-mono bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400">
                    ↓
                  </kbd>
                  <span>navigate ({searchResults.length} items)</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="font-mono bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400">
                    ↵
                  </kbd>
                  <span>select</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="font-mono bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400">
                  esc
                </kbd>
                <span>close</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-56 lg:w-64 flex-shrink-0">
          <div className="sticky top-20 flex flex-col gap-5">
            {/* Search Trigger Input (Next.js / Material UI style) */}
            <button
              onClick={openSearch}
              className="w-full flex items-center justify-between px-3 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 rounded-lg transition-colors shadow-sm group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                <span>Search docs...</span>
              </div>
              <kbd className="text-[10px] font-mono text-zinc-500 bg-zinc-900 group-hover:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800">
                ⌘K
              </kbd>
            </button>

            {/* Category Navigation Tree */}
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

            {/* Standard "Copy Markdown" action button */}
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

          {/* Rendered Documentation Content */}
          <article
            onClick={handleContainerClick}
            dangerouslySetInnerHTML={{ __html: activeHtml }}
            className="preview-markdown w-full pb-16"
          />
        </main>

        {/* Right Sidebar: "On this page" Table of Contents */}
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
