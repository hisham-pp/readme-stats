import { techStack, techMap } from "@/config/techs.config";
import { TechItem } from "@/types/tech.types";
import { THEMES } from "@/types/github.types";
import { iconsBrandBundle } from "@/lib/bundles/icons-brand.bundle";
import { iconsDarkBundle } from "@/lib/bundles/icons-dark.bundle";
import { iconsLightBundle } from "@/lib/bundles/icons-light.bundle";
import { iconsBgBundle } from "@/lib/bundles/icons-bg.bundle";
import { badgesBrandBundle } from "@/lib/bundles/badges-brand.bundle";

const iconBundles: Record<string, Record<string, string>> = {
  brand: iconsBrandBundle,
  dark: iconsDarkBundle,
  light: iconsLightBundle,
  bg: iconsBgBundle,
};

const COMMON_ALIASES: Record<string, string> = {
  "c++": "cpp",
  "c#": "csharp",
  golang: "go",
  node: "nodejs",
  reactjs: "react",
  next: "nextjs",
  vue: "vuejs",
  tailwind: "tailwindcss",
  postgres: "postgresql",
  mongo: "mongodb",
  elastic: "elasticsearch",
  py: "python",
  ts: "typescript",
  js: "javascript",
  rb: "ruby",
  rustlang: "rust",
};

/**
 * Finds a tech item by ID, name, tag, or common alias.
 */
export function findTech(query: string): TechItem | null {
  if (!query) return null;
  const q = query.trim().toLowerCase();

  // 1. Direct techMap key match
  if (techMap[q]) return techMap[q];

  // 2. Exact ID or Name match (case-insensitive)
  let found = techStack.find(
    (t) => t.id.toLowerCase() === q || t.name.toLowerCase() === q,
  );
  if (found) return found;

  // 3. Common aliases
  if (COMMON_ALIASES[q] && techMap[COMMON_ALIASES[q]]) {
    return techMap[COMMON_ALIASES[q]];
  }

  // 4. Normalized match (ignoring dashes, underscores, dots, and spaces)
  const cleanQ = q.replace(/[-_.\s]/g, "");
  found = techStack.find((t) => {
    const cleanId = t.id.toLowerCase().replace(/[-_.\s]/g, "");
    const cleanName = t.name.toLowerCase().replace(/[-_.\s]/g, "");
    return cleanId === cleanQ || cleanName === cleanQ;
  });
  if (found) return found;

  // 5. Tag match
  found = techStack.find((t) => t.tags?.includes(q));
  return found || null;
}

/**
 * Resizes an SVG string by adjusting or inserting width and height attributes,
 * preserving aspect ratio if only one dimension is specified.
 */
export function resizeSvg(
  svg: string,
  targetWidth?: number,
  targetHeight?: number,
): string {
  const rootTagMatch = svg.match(/^<svg[^>]*>/);
  if (!rootTagMatch) return svg;
  let rootTag = rootTagMatch[0];

  const viewBoxMatch = rootTag.match(/viewBox="([0-9.\s]+)"/);
  const widthMatch = rootTag.match(/width="([0-9.]+)"/);
  const heightMatch = rootTag.match(/height="([0-9.]+)"/);

  let origW = 0;
  let origH = 0;

  if (widthMatch && heightMatch) {
    origW = parseFloat(widthMatch[1]);
    origH = parseFloat(heightMatch[1]);
  } else if (viewBoxMatch) {
    const parts = viewBoxMatch[1].trim().split(/\s+/);
    if (parts.length === 4) {
      origW = parseFloat(parts[2]);
      origH = parseFloat(parts[3]);
    }
  }

  // Ensure viewBox exists so scaling maintains coordinates
  if (!viewBoxMatch && origW > 0 && origH > 0) {
    rootTag = rootTag.replace("<svg", `<svg viewBox="0 0 ${origW} ${origH}"`);
  }

  let finalW = targetWidth;
  let finalH = targetHeight;

  if (targetHeight && !targetWidth && origH > 0 && origW > 0) {
    finalW = Math.round((origW / origH) * targetHeight);
  } else if (targetWidth && !targetHeight && origH > 0 && origW > 0) {
    finalH = Math.round((origH / origW) * targetWidth);
  }

  if (finalW) {
    if (rootTag.includes("width=")) {
      rootTag = rootTag.replace(/width="[^"]*"/, `width="${finalW}"`);
    } else {
      rootTag = rootTag.replace("<svg", `<svg width="${finalW}"`);
    }
  }
  if (finalH) {
    if (rootTag.includes("height=")) {
      rootTag = rootTag.replace(/height="[^"]*"/, `height="${finalH}"`);
    } else {
      rootTag = rootTag.replace("<svg", `<svg height="${finalH}"`);
    }
  }

  return svg.replace(rootTagMatch[0], rootTag);
}

/**
 * Returns the SVG string for a single technology icon.
 */
export function getSingleIconSvg(
  query: string,
  options: { theme?: string; size?: number } = {},
): { svg: string; tech: TechItem } | null {
  const tech = findTech(query);
  if (!tech || !tech.icon) return null;

  const theme =
    options.theme && THEMES.includes(options.theme as any)
      ? options.theme
      : "brand";

  const bundle = iconBundles[theme] || iconBundles.brand;
  let rawSvg = bundle[tech.icon];

  // Fallback to brand theme if not present in specified theme
  if (!rawSvg && theme !== "brand") {
    rawSvg = iconBundles.brand[tech.icon];
  }

  if (!rawSvg) return null;

  let cleanedSvg = rawSvg.replace(/<\?xml.*?\?>/g, "").trim();

  const size = options.size && options.size > 0 ? options.size : 48;
  cleanedSvg = resizeSvg(cleanedSvg, size, size);

  return { svg: cleanedSvg, tech };
}

/**
 * Returns the SVG string for a single technology badge.
 */
export function getSingleBadgeSvg(
  query: string,
  options: { height?: number; width?: number } = {},
): { svg: string; tech: TechItem } | null {
  const tech = findTech(query);
  if (!tech || !tech.badge) return null;

  // Check direct key or filename in badges bundle
  let rawSvg = badgesBrandBundle[tech.badge];
  if (!rawSvg) {
    // Try finding by suffix match in case bundle key has prefix e.g. "00_react_js.svg"
    const matchKey = Object.keys(badgesBrandBundle).find(
      (k) => k === tech.badge || k.endsWith(`_${tech.badge}`),
    );
    if (matchKey) {
      rawSvg = badgesBrandBundle[matchKey];
    }
  }

  if (!rawSvg) return null;

  let cleanedSvg = rawSvg.replace(/<\?xml.*?\?>/g, "").trim();

  const targetHeight =
    options.height && options.height > 0
      ? options.height
      : options.width
        ? undefined
        : 20;

  cleanedSvg = resizeSvg(cleanedSvg, options.width, targetHeight);

  return { svg: cleanedSvg, tech };
}
