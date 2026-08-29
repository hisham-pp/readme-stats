import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { techStack } from "@/config/techs.config";
import Link from "next/link";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { name } = await params;

  // Find the brand by id or name (case-insensitive)
  const brand = techStack.find(
    (t) =>
      t.id.toLowerCase() === name.toLowerCase() ||
      t.name.toLowerCase() === name.toLowerCase(),
  );

  if (!brand) {
    notFound();
  }

  // Load SVG contents from disk directly
  const loadSvg = (subDir: string, filename?: string) => {
    if (!filename) return null;
    try {
      const filePath = path.join(process.cwd(), "public", subDir, filename);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf8");
        return raw.replace(/<\?xml.*?\?>/g, "").trim();
      }
    } catch (e) {
      console.error(`Error loading SVG ${subDir}/${filename}:`, e);
    }
    return null;
  };

  const brandIconSvg = loadSvg("icons/brand", brand.icon);
  const darkIconSvg = loadSvg("icons/dark", brand.icon);
  const lightIconSvg = loadSvg("icons/light", brand.icon);
  const bgIconSvg = loadSvg("icons/bg", brand.icon);
  const badgeSvg = loadSvg("badges/brand", brand.badge);

  const iconThemes = [
    {
      label: "Brand Theme",
      svg: brandIconSvg,
      bg: "bg-[#0d1117]",
      border: "border-zinc-850",
    },
    {
      label: "Dark Theme",
      svg: darkIconSvg,
      bg: "bg-zinc-100",
      border: "border-zinc-300",
    },
    {
      label: "Light Theme",
      svg: lightIconSvg,
      bg: "bg-zinc-950",
      border: "border-black",
    },
    {
      label: "BG Theme",
      svg: bgIconSvg,
      bg: "bg-[#0d1117]",
      border: "border-zinc-850",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 font-sans text-zinc-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8 mt-4">
        {/* Header Navigation */}
        <header className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <div className="flex flex-col gap-2">
            <Link
              href="/brands"
              className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium flex items-center gap-1.5"
            >
              <span>&larr;</span> Back to Brands
            </Link>
            <h1 className="text-4xl font-extrabold text-zinc-100 mt-2">
              {brand.name}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <code className="text-xs text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                {brand.id}
              </code>
              <span className="text-xs text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                {brand.category}
              </span>
            </div>
          </div>
        </header>

        {/* Icons Section */}
        {brand.icon && (
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-200 uppercase tracking-wider">
              Icon Themes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {iconThemes.map((theme, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-4 bg-zinc-950 border border-zinc-800 rounded-xl shadow-lg"
                >
                  <div
                    className={`w-full h-24 flex items-center justify-center rounded-lg border ${theme.bg} ${theme.border} overflow-hidden`}
                  >
                    {theme.svg ? (
                      <div
                        className="w-10 h-10 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
                        dangerouslySetInnerHTML={{ __html: theme.svg }}
                      />
                    ) : (
                      <span className="text-xs text-zinc-600">Not Found</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-center text-zinc-400 uppercase tracking-wide">
                    {theme.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Badge Section */}
        {brand.badge && (
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-200 uppercase tracking-wider">
              Badge
            </h2>
            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4">
              <div className="w-full py-8 flex items-center justify-center bg-[#0d1117] rounded-lg border border-zinc-800">
                {badgeSvg ? (
                  <div
                    className="h-10 flex items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full"
                    dangerouslySetInnerHTML={{ __html: badgeSvg }}
                  />
                ) : (
                  <span className="text-xs text-zinc-600">Not Found</span>
                )}
              </div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                Brand Badge
              </span>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!brand.icon && !brand.badge && (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-zinc-800 rounded-xl bg-zinc-950">
            <p className="text-zinc-500 italic text-sm">
              No visual assets mapped yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
