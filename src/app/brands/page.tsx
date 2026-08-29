"use client";

import BrandModal from "@/components/BrandModal";
import { techStack } from "@/config/techs.config";
import type { TechItem } from "@/types/tech.types";
import { Maximize2 } from "lucide-react";
import { useRef, useState } from "react";

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<TechItem | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const brandsList = techStack.filter((t) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(query) ||
      t.id.toLowerCase().includes(query) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-900 font-sans p-8">
      <main className="flex w-full max-w-6xl flex-col mt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">All Brands</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Browse all supported brands and their available assets (Icons and
              Badges).
            </p>
          </div>
          <div className="flex flex-col gap-2 min-w-[250px]">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {brandsList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col p-6 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors shadow-lg"
            >
              <div className="flex justify-between items-start gap-3 mb-6 border-b border-zinc-800 pb-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-zinc-100 truncate pr-2">
                    {item.name}
                  </h3>
                  <code className="mt-2 inline-flex max-w-full text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    <span className="truncate">{item.id}</span>
                  </code>
                </div>
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
                  onClick={() => openBrandModal(item)}
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
                        onClick={() => copyToClipboard(`${item.id}:brand`)}
                      >
                        <div
                          className="w-full h-14 flex items-center justify-center bg-[#0d1117] rounded border border-zinc-800 group-hover:bg-[#161b22] transition-colors"
                          title="Click to copy: Brand Theme"
                        >
                          <img
                            src={`/icons/brand/${item.icon}`}
                            alt={`${item.name} brand icon`}
                            className="max-h-8 transition-transform group-hover:scale-110"
                          />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                          Brand
                        </span>
                      </div>

                      <div
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                        onClick={() => copyToClipboard(`${item.id}:dark`)}
                      >
                        <div
                          className="w-full h-14 flex items-center justify-center bg-zinc-100 rounded border border-zinc-300 group-hover:bg-white transition-colors"
                          title="Click to copy: Dark Theme"
                        >
                          <img
                            src={`/icons/dark/${item.icon}`}
                            alt={`${item.name} dark icon`}
                            className="max-h-8 transition-transform group-hover:scale-110"
                          />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                          Dark
                        </span>
                      </div>

                      <div
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                        onClick={() => copyToClipboard(`${item.id}:light`)}
                      >
                        <div
                          className="w-full h-14 flex items-center justify-center bg-zinc-950 rounded border border-black group-hover:bg-zinc-900 transition-colors"
                          title="Click to copy: Light Theme"
                        >
                          <img
                            src={`/icons/light/${item.icon}`}
                            alt={`${item.name} light icon`}
                            className="max-h-8 transition-transform group-hover:scale-110"
                          />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                          Light
                        </span>
                      </div>

                      <div
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                        onClick={() => copyToClipboard(`${item.id}:bg`)}
                      >
                        <div
                          className="w-full h-14 flex items-center justify-center bg-[#0d1117] rounded border border-zinc-800 group-hover:bg-[#161b22] transition-colors"
                          title="Click to copy: BG Theme"
                        >
                          <img
                            src={`/icons/bg/${item.icon}`}
                            alt={`${item.name} bg icon`}
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
                        className="flex items-center justify-between w-full h-12 px-4 bg-[#0d1117] rounded border border-zinc-800 group-hover:bg-[#161b22] transition-colors group cursor-pointer overflow-hidden"
                        title="Click to copy: Brand Badge"
                        onClick={() => copyToClipboard(item.id)}
                      >
                        <span className="shrink-0 text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                          Brand
                        </span>
                        <img
                          src={`/badges/brand/${item.badge}`}
                          alt={`${item.name} brand badge`}
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
