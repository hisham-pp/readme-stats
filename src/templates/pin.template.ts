import { RepoStats } from "@/types/github.types";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(
  text: string,
  maxCharsPerLine: number,
  maxLines: number = 2,
): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length > maxCharsPerLine) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
      if (lines.length >= maxLines - 1) {
        break;
      }
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (
    lines.length === maxLines &&
    lines.join(" ").length < text.trim().length
  ) {
    if (lines[maxLines - 1].length > maxCharsPerLine - 3) {
      lines[maxLines - 1] =
        lines[maxLines - 1].slice(0, maxCharsPerLine - 3).trim() + "...";
    } else {
      lines[maxLines - 1] = lines[maxLines - 1].trim() + "...";
    }
  }

  return lines;
}

export interface GeneratePinOptions {
  cols?: number;
  theme?: string;
}

export function renderSingleCard(repo: RepoStats): string {
  const {
    name,
    owner,
    description = "",
    stars = 0,
    forks = 0,
    language,
    theme = "brand",
    showOwner = false,
  } = repo;

  let bg = "#0D1117";
  let stroke = "#30363D";
  let titleColor = "#58A6FF";
  let descColor = "#8B949E";
  let metaColor = "#8B949E";
  let iconColor = "#58A6FF";
  let starColor = "#E3B341";

  if (theme === "light") {
    bg = "#FFFFFF";
    stroke = "#D0D7DE";
    titleColor = "#0969DA";
    descColor = "#57606A";
    metaColor = "#57606A";
    iconColor = "#57606A";
    starColor = "#9A6700";
  } else if (theme === "dark") {
    bg = "#0D1117";
    stroke = "#30363D";
    titleColor = "#58A6FF";
    descColor = "#8B949E";
    metaColor = "#8B949E";
    iconColor = "#8B949E";
    starColor = "#E3B341";
  } else if (theme === "bg" || theme === "transparent") {
    bg = "transparent";
    stroke = "transparent";
    titleColor = "#58A6FF";
    descColor = "#8B949E";
    metaColor = "#8B949E";
    iconColor = "#58A6FF";
    starColor = "#E3B341";
  }

  const width = 400;
  const height = 125;
  const displayName = showOwner ? `${owner}/${name}` : name;
  const descLines = wrapText(description, 46, 2);

  const langColor = language?.color || "#858585";
  const langName = language?.name || "";

  // Dynamic layout for bottom row
  let nextX = 25;
  let langSection = "";
  if (langName) {
    langSection = `
      <circle cx="${nextX + 5}" cy="102" r="5" fill="${langColor}" />
      <text x="${nextX + 16}" y="106" class="meta">${escapeXml(langName)}</text>
    `;
    nextX += 16 + langName.length * 7 + 16;
  }

  const starSection = `
    <g transform="translate(${nextX}, 95)">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="${starColor}">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
      </svg>
      <text x="18" y="11" class="meta">${stars.toLocaleString()}</text>
    </g>
  `;
  nextX += 18 + stars.toLocaleString().length * 7 + 16;

  const forkSection = `
    <g transform="translate(${nextX}, 95)">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="${metaColor}">
        <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5A2.25 2.25 0 0012.5 6.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zM10.5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-2.5 9.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
      </svg>
      <text x="18" y="11" class="meta">${forks.toLocaleString()}</text>
    </g>
  `;

  return `
    <g>
      <!-- Card Border and Fill -->
      <rect width="${width}" height="${height}" rx="6" fill="${bg}" stroke="${stroke}" stroke-width="1" />

      <!-- Repository Header Icon -->
      <g transform="translate(25, 20)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="${iconColor}">
          <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
        </svg>
        <text x="24" y="13" class="title" fill="${titleColor}">${escapeXml(displayName)}</text>
      </g>

      <!-- Description -->
      <g transform="translate(25, 54)">
        ${descLines[0] ? `<text x="0" y="0" class="desc" fill="${descColor}">${escapeXml(descLines[0])}</text>` : ""}
        ${descLines[1] ? `<text x="0" y="18" class="desc" fill="${descColor}">${escapeXml(descLines[1])}</text>` : ""}
      </g>

      <!-- Bottom Metadata: Language, Stars, Forks -->
      ${langSection}
      ${starSection}
      ${forkSection}
    </g>
  `;
}

export function generatePinSvg(
  repoInput: RepoStats | RepoStats[],
  options: GeneratePinOptions = {},
): string {
  const repos = Array.isArray(repoInput) ? repoInput : [repoInput];
  const count = repos.length;

  const cardWidth = 400;
  const cardHeight = 125;
  const gap = 10;

  const cols = Math.max(
    1,
    Math.min(options.cols ?? (count > 1 ? 2 : 1), count),
  );
  const rows = Math.ceil(count / cols);

  const totalWidth = cols * cardWidth + (cols - 1) * gap;
  const totalHeight = rows * cardHeight + (rows - 1) * gap;

  // Use the theme from the first repo or option
  const theme = options.theme || repos[0]?.theme || "brand";
  let titleColor = "#58A6FF";
  let descColor = "#8B949E";
  let metaColor = "#8B949E";

  if (theme === "light") {
    titleColor = "#0969DA";
    descColor = "#57606A";
    metaColor = "#57606A";
  }

  const cardsSvg = repos
    .map((repo, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = col * (cardWidth + gap);
      const y = row * (cardHeight + gap);

      return `
        <g transform="translate(${x}, ${y})">
          ${renderSingleCard(repo)}
        </g>
      `;
    })
    .join("\n");

  return `
    <svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor}; }
        .desc { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${descColor}; }
        .meta { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${metaColor}; }
      </style>
      ${cardsSvg}
    </svg>
  `;
}
