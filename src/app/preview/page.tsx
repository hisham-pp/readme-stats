import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { headers } from "next/headers";
import { marked, Tokens } from "marked";
import PreviewClient, {
  PreviewDoc,
  HeadingItem,
} from "@/components/PreviewClient";

export const metadata: Metadata = {
  title: "Asset Previews & Documentation - GitHub Readme Stats",
  description:
    "Browse live documentation and previews for GitHub profile README marquees, rainfall banners, and stats cards.",
};

const PROD_BASE_URL = "https://readme-stats-theta-sepia.vercel.app";

const DOC_METADATA: Record<
  string,
  { id: string; title: string; category: string; order: number }
> = {
  "README.md": {
    id: "overview",
    title: "Overview",
    category: "Getting Started",
    order: 1,
  },
  "badge-marquee.md": {
    id: "badge-marquee",
    title: "Badge Marquees",
    category: "Marquees",
    order: 2,
  },
  "icon-marquee.md": {
    id: "icon-marquee",
    title: "Icon Marquees",
    category: "Marquees",
    order: 3,
  },
  "iconbg-marquee.md": {
    id: "iconbg-marquee",
    title: "Themed Backgrounds",
    category: "Marquees",
    order: 4,
  },
  "tech-icon-rain.md": {
    id: "tech-icon-rain",
    title: "Rainfall Banner",
    category: "Banners",
    order: 5,
  },
  "top-langs.md": {
    id: "top-langs",
    title: "Top Languages",
    category: "Stats & Metrics",
    order: 6,
  },
  "snake.md": {
    id: "snake",
    title: "Contribution Snake",
    category: "Animations",
    order: 7,
  },
  "pipeline.md": {
    id: "pipeline",
    title: "Pre-Generation Pipeline",
    category: "Workflows & CI/CD",
    order: 8,
  },
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_{}[\]()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function extractHeadings(content: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const rawText = match[2].trim();
      const cleanText = rawText.replace(/[`*_{}[\]()]/g, "").trim();
      const slug = slugify(rawText);
      headings.push({
        depth,
        text: cleanText,
        slug,
      });
    }
  }

  return headings;
}

interface PageProps {
  searchParams: Promise<{ file?: string }>;
}

export default async function PreviewPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const previewDir = path.join(process.cwd(), "preview");

  // Determine base URL dynamically (local dev vs prod)
  const headerList = await headers();
  const host = headerList.get("host") || "";
  const isLocal =
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    process.env.NODE_ENV !== "production";
  const proto = headerList.get("x-forwarded-proto") || "http";
  const currentBaseUrl = isLocal && host ? `${proto}://${host}` : PROD_BASE_URL;

  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(previewDir).filter((f) => f.endsWith(".md"));
  } catch (err) {
    console.error("Error reading preview directory:", err);
  }

  // Configure marked for server-side link rewriting and anchor IDs
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const raw = tokens.map((t) => ("text" in t ? t.text : "")).join("");
        const slug = slugify(raw);
        return `<h${depth} id="${slug}" class="scroll-mt-24">${text}</h${depth}>`;
      },
      link({ href, text }) {
        if (href && (href.endsWith(".md") || href.includes(".md#"))) {
          const clean = href
            .replace(/^\.\//, "")
            .replace(/\.md$/, "")
            .replace(/^README$/, "overview");
          return `<a href="/preview?file=${clean}" data-preview-file="${clean}">${text}</a>`;
        }
        return false;
      },
      code(token: Tokens.Code) {
        const lang = token.lang || "code";
        const displayLang = lang.toUpperCase();
        const escaped = escapeHtml(token.text);
        return `<div class="code-block-wrapper my-4 rounded-lg overflow-hidden border border-zinc-800 bg-[#161b22]">
  <div class="code-block-header flex items-center justify-between px-3.5 py-1.5 bg-zinc-900/90 border-b border-zinc-800/80 text-xs select-none">
    <span class="font-mono text-[11px] text-zinc-500 font-semibold tracking-wider">${displayLang}</span>
    <button
      type="button"
      class="code-copy-btn inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-100 bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700/60 rounded-md transition-all cursor-pointer shadow-xs"
      title="Copy code snippet"
    >
      <svg class="copy-icon w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
      <svg class="check-icon w-3.5 h-3.5 hidden text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span class="copy-text text-[11px] font-medium">Copy</span>
    </button>
  </div>
  <pre class="overflow-x-auto p-3.5 m-0 text-xs sm:text-sm font-mono"><code class="language-${lang}">${escaped}</code></pre>
</div>`;
      },
    },
  });

  const docs: PreviewDoc[] = [];

  for (const filename of filenames) {
    try {
      const filePath = path.join(previewDir, filename);
      let content = fs.readFileSync(filePath, "utf8");

      // Replace production URL with local base URL when running locally
      if (isLocal && currentBaseUrl !== PROD_BASE_URL) {
        content = content.replaceAll(PROD_BASE_URL, currentBaseUrl);
      }

      const meta = DOC_METADATA[filename] || {
        id: filename.replace(/\.md$/, ""),
        title: filename.replace(/\.md$/, "").replace(/[-_]/g, " "),
        category: "Other",
        order: 99,
      };

      const html = marked.parse(content) as string;
      const headings = extractHeadings(content);

      docs.push({
        id: meta.id,
        title: meta.title,
        category: meta.category,
        order: meta.order,
        content,
        html,
        headings,
      });
    } catch (err) {
      console.error(`Error reading ${filename}:`, err);
    }
  }

  docs.sort((a, b) => a.order - b.order);

  // Normalize initial doc id & anchor
  let requestedFile = resolvedParams?.file || "overview";
  let targetSlug: string | undefined = undefined;

  if (requestedFile.includes("#")) {
    const [filePart, hashPart] = requestedFile.split("#");
    requestedFile = filePart;
    targetSlug = hashPart;
  }

  // Strip path traversal and extension
  requestedFile = requestedFile
    .replace(/^(\.\.\/|\.\/)+/, "")
    .replace(/\.md$/, "")
    .trim();

  if (requestedFile === "README" || !requestedFile) {
    requestedFile = "overview";
  }

  const initialId = docs.some((d) => d.id === requestedFile)
    ? requestedFile
    : docs[0]?.id || "overview";

  return (
    <PreviewClient
      docs={docs}
      initialDocId={initialId}
      initialSlug={targetSlug}
      currentBaseUrl={currentBaseUrl}
    />
  );
}
