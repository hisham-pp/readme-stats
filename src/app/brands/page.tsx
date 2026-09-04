"use client";

import BrandModal from "@/components/BrandModal";
import { techStack } from "@/config/techs.config";
import type { TechItem } from "@/types/tech.types";
import { Maximize2, Search, X, Loader2 } from "lucide-react";
import {
  memo,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const BATCH_SIZE = 24;

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Databases",
  "Cloud & DevOps",
  "AI & ML",
  "Testing",
  "UI Tools",
];

const BrandCard = memo(function BrandCard({
  item,
  onOpenModal,
  onCopy,
}: {
  item: TechItem;
  onOpenModal: (brand: TechItem) => void;
  onCopy: (text: string) => void;
}) {
  return (
    <div className="flex flex-col p-6 bg-zinc-950/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-all shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 duration-200">
      <div className="flex justify-between items-start gap-3 mb-6 border-b border-zinc-800 pb-4">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-zinc-100 truncate pr-2">
            {item.name}
          </h3>
          <code className="mt-2 inline-flex max-w-full text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 font-mono">
            <span className="truncate">{item.id}</span>
          </code>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
          onClick={() => onOpenModal(item)}
          title={`Expand ${item.name}`}
          aria-label={`Expand ${item.name}`}
        >
          <Maximize2 className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Icons Section */}
        {item.icon && (
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Icons
            </h4>
            <div className="grid grid-cols-4 gap-3">
              <div
                className="flex flex-col items-center gap-2 group cursor-pointer"
                onClick={() => onCopy(`${item.id}:brand`)}
              >
                <div
                  className="w-full h-14 flex items-center justify-center bg-[#0d1117] rounded-lg border border-zinc-800 group-hover:bg-[#161b22] transition-colors"
                  title="Click to copy: Brand Theme"
                >
                  <img
                    src={`/icons/brand/${item.icon}`}
                    alt={`${item.name} brand icon`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                  Brand
                </span>
              </div>

              <div
                className="flex flex-col items-center gap-2 group cursor-pointer"
                onClick={() => onCopy(`${item.id}:dark`)}
              >
                <div
                  className="w-full h-14 flex items-center justify-center bg-zinc-100 rounded-lg border border-zinc-300 group-hover:bg-white transition-colors"
                  title="Click to copy: Dark Theme"
                >
                  <img
                    src={`/icons/dark/${item.icon}`}
                    alt={`${item.name} dark icon`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                  Dark
                </span>
              </div>

              <div
                className="flex flex-col items-center gap-2 group cursor-pointer"
                onClick={() => onCopy(`${item.id}:light`)}
              >
                <div
                  className="w-full h-14 flex items-center justify-center bg-zinc-950 rounded-lg border border-black group-hover:bg-zinc-900 transition-colors"
                  title="Click to copy: Light Theme"
                >
                  <img
                    src={`/icons/light/${item.icon}`}
                    alt={`${item.name} light icon`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                  Light
                </span>
              </div>

              <div
                className="flex flex-col items-center gap-2 group cursor-pointer"
                onClick={() => onCopy(`${item.id}:bg`)}
              >
                <div
                  className="w-full h-14 flex items-center justify-center bg-[#0d1117] rounded-lg border border-zinc-800 group-hover:bg-[#161b22] transition-colors"
                  title="Click to copy: BG Theme"
                >
                  <img
                    src={`/icons/bg/${item.icon}`}
                    alt={`${item.name} bg icon`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                  BG
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Badges Section */}
        {item.badge && (
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-2">
              Badges
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div
                className="flex items-center justify-between w-full h-12 px-4 bg-[#0d1117] rounded-lg border border-zinc-800 group-hover:bg-[#161b22] transition-colors group cursor-pointer overflow-hidden"
                title="Click to copy: Brand Badge"
                onClick={() => onCopy(item.id)}
              >
                <span className="shrink-0 text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                  Brand
                </span>
                <img
                  src={`/badges/brand/${item.badge}`}
                  alt={`${item.name} brand badge`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-6 max-w-[60%] object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        )}

        {!item.icon && !item.badge && (
          <div className="text-sm text-zinc-600 italic text-center py-4">
            No visual assets mapped yet.
          </div>
        )}
      </div>
    </div>
  );
});

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<TechItem | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const openBrandModal = (brand: TechItem) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSelectedBrand(brand);
    requestAnimationFrame(() => setIsBrandModalOpen(true));
  };

  const closeBrandModal = () => {
    setIsBrandModalOpen(false);
    closeTimer.current = setTimeout(() => setSelectedBrand(null), 180);
  };

  // Filter brands dynamically based on deferredQuery and category
  const filteredBrands = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return techStack.filter((t) => {
      if (selectedCategory !== "All") {
        if (
          !t.category ||
          !t.category.toLowerCase().includes(selectedCategory.toLowerCase())
        ) {
          return false;
        }
      }
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [deferredQuery, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(BATCH_SIZE);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(BATCH_SIZE);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setVisibleCount(BATCH_SIZE);
  };

  // Dynamic incremental load on scroll using IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + BATCH_SIZE, filteredBrands.length),
          );
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredBrands.length]);

  const displayedBrands = useMemo(() => {
    return filteredBrands.slice(0, visibleCount);
  }, [filteredBrands, visibleCount]);

  const hasMore = visibleCount < filteredBrands.length;

  return (
    <div className="flex flex-col min-h-screen items-center bg-transparent font-sans p-4 sm:p-6 lg:p-8">
      <main className="flex w-full max-w-6xl flex-col mt-2">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800/80 pb-6 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                All Brands
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {filteredBrands.length} brands
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-2">
              Browse supported brands with brand, dark, light, and background
              assets.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative flex items-center min-w-[280px]">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, id, or tag..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 pr-8 py-2.5 bg-zinc-950/70 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all w-full text-sm"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 text-zinc-500 hover:text-zinc-300 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Grid */}
        {displayedBrands.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 flex flex-col items-center gap-2">
            <p className="text-base font-medium text-zinc-400">
              No matching brands found
            </p>
            <p className="text-xs text-zinc-600">
              Try adjusting your search query or selected category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBrands.map((item) => (
              <BrandCard
                key={item.id}
                item={item}
                onOpenModal={openBrandModal}
                onCopy={copyToClipboard}
              />
            ))}
          </div>
        )}

        {/* Scroll Sentinel for Dynamic Progressive Loading */}
        <div
          ref={sentinelRef}
          className="w-full py-8 flex justify-center items-center"
        >
          {hasMore && (
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span>Loading more brands dynamically...</span>
            </div>
          )}
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

        {selectedBrand && (
          <BrandModal
            brand={selectedBrand}
            isOpen={isBrandModalOpen}
            onClose={closeBrandModal}
            onCopy={copyToClipboard}
          />
        )}
      </main>
    </div>
  );
}
