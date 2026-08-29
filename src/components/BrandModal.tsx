"use client";

import type { TechItem } from "@/types/tech.types";
import { Copy, ImageIcon, X } from "lucide-react";
import { useEffect } from "react";

type BrandModalProps = {
  brand: TechItem;
  isOpen: boolean;
  onClose: () => void;
  onCopy: (value: string) => void;
};

const iconThemes = [
  {
    key: "brand",
    label: "Brand",
    bg: "bg-[#0d1117]",
    border: "border-zinc-800",
    hover: "hover:bg-[#161b22]",
  },
  {
    key: "dark",
    label: "Dark",
    bg: "bg-zinc-100",
    border: "border-zinc-300",
    hover: "hover:bg-white",
  },
  {
    key: "light",
    label: "Light",
    bg: "bg-zinc-950",
    border: "border-black",
    hover: "hover:bg-zinc-900",
  },
  {
    key: "bg",
    label: "BG",
    bg: "bg-[#0d1117]",
    border: "border-zinc-800",
    hover: "hover:bg-[#161b22]",
  },
];

export default function BrandModal({
  brand,
  isOpen,
  onClose,
  onCopy,
}: BrandModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center px-4 py-6 transition-all duration-200 ease-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="brand-modal-title"
    >
      <button
        type="button"
        aria-label="Close brand details"
        className="absolute inset-0 cursor-default bg-zinc-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <section
        className={`relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl transition-all duration-200 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-zinc-800 p-5 sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-[#0d1117]">
              {brand.icon ? (
                <img
                  src={`/icons/brand/${brand.icon}`}
                  alt={`${brand.name} brand icon`}
                  className="max-h-9 max-w-9 object-contain"
                />
              ) : (
                <ImageIcon className="h-6 w-6 text-zinc-600" aria-hidden />
              )}
            </div>
            <div className="min-w-0">
              <h2
                id="brand-modal-title"
                className="truncate text-2xl font-bold text-zinc-100"
              >
                {brand.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <code className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-400">
                  {brand.id}
                </code>
                <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-500">
                  {brand.category}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </header>

        <div className="overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
            <div className="flex flex-col gap-6">
              {brand.icon && (
                <section className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Icons
                    </h3>
                    <span className="text-xs text-zinc-600">4 themes</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {iconThemes.map((theme) => (
                      <button
                        key={theme.key}
                        type="button"
                        className="group flex min-h-28 flex-col items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-left transition-colors hover:border-zinc-700"
                        onClick={() => onCopy(`${brand.id}:${theme.key}`)}
                        title={`Copy ${theme.label} icon token`}
                      >
                        <span
                          className={`flex h-14 w-full items-center justify-center rounded border ${theme.bg} ${theme.border} ${theme.hover} transition-colors`}
                        >
                          <img
                            src={`/icons/${theme.key}/${brand.icon}`}
                            alt={`${brand.name} ${theme.label.toLowerCase()} icon`}
                            className="max-h-8 max-w-8 object-contain transition-transform group-hover:scale-110"
                          />
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300">
                          <Copy className="h-3 w-3" aria-hidden />
                          {theme.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {brand.badge && (
                <section className="flex flex-col gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Badge
                  </h3>
                  <button
                    type="button"
                    className="group flex min-h-20 items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-[#0d1117] px-4 transition-colors hover:border-zinc-700 hover:bg-[#161b22]"
                    onClick={() => onCopy(brand.id)}
                    title="Copy brand badge token"
                  >
                    <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300">
                      <Copy className="h-3 w-3" aria-hidden />
                      Brand
                    </span>
                    <img
                      src={`/badges/brand/${brand.badge}`}
                      alt={`${brand.name} brand badge`}
                      className="max-h-8 max-w-[72%] object-contain transition-transform group-hover:scale-105"
                    />
                  </button>
                </section>
              )}

              {!brand.icon && !brand.badge && (
                <div className="rounded-lg border border-dashed border-zinc-800 py-8 text-center text-sm italic text-zinc-600">
                  No visual assets mapped yet.
                </div>
              )}
            </div>

            <aside className="flex flex-col gap-4 rounded-lg border border-zinc-800 bg-zinc-900/35 p-4">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Tokens
                </h3>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-between gap-3 rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-left text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
                    onClick={() => onCopy(brand.id)}
                  >
                    <code className="truncate">{brand.id}</code>
                    <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </button>
                  {brand.icon &&
                    iconThemes.map((theme) => (
                      <button
                        key={theme.key}
                        type="button"
                        className="flex items-center justify-between gap-3 rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-left text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
                        onClick={() => onCopy(`${brand.id}:${theme.key}`)}
                      >
                        <code className="truncate">
                          {brand.id}:{theme.key}
                        </code>
                        <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      </button>
                    ))}
                </div>
              </div>

              {brand.tags.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tags
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {brand.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
