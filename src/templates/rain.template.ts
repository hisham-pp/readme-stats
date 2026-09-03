export interface RainIcon {
  svgContent: string;
  width: number;
  height: number;
}

export interface RainThemeColors {
  bg: string;
  nameColor: string;
  nameGlow: string;
}

const THEME_COLORS: Record<string, RainThemeColors> = {
  brand: {
    bg: "#0D1117",
    nameColor: "#58A6FF",
    nameGlow: "rgba(88,166,255,0.35)",
  },
  dark: {
    bg: "#161B22",
    nameColor: "#C9D1D9",
    nameGlow: "rgba(201,209,217,0.25)",
  },
  light: {
    bg: "#FFFFFF",
    nameColor: "#0969DA",
    nameGlow: "rgba(9,105,218,0.20)",
  },
  bg: {
    bg: "#0D1117",
    nameColor: "#58A6FF",
    nameGlow: "rgba(88,166,255,0.35)",
  },
};

/**
 * Attempt a deterministic-but-varied pseudo-random sequence seeded from the
 * icon list length so the output is identical for the same set of techs
 * (avoids SVG caching issues when the "random" layout shifts every request).
 */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateRainSvg({
  icons,
  name = "",
  width = 850,
  height = 300,
  theme = "brand",
  color,
  bgcolor,
  fontSize: fontSizeOverride,
}: {
  icons: RainIcon[];
  name?: string;
  width?: number;
  height?: number;
  theme?: string;
  color?: string;
  bgcolor?: string;
  fontSize?: number;
}) {
  const themeColors = THEME_COLORS[theme] || THEME_COLORS.brand;
  const colors = {
    bg: bgcolor || themeColors.bg,
    nameColor: color || themeColors.nameColor,
    nameGlow: themeColors.nameGlow,
  };

  // --- Build rain drops -------------------------------------------------------
  // Spread icons across the full width in randomised positions.
  // Each icon gets a random x, a random animation-delay, and a random duration
  // so they don't all move in lockstep.
  const rand = seededRandom(icons.length * 7 + width);
  const iconSize = 24; // render each icon at 24×24
  const dropCount = Math.min(icons.length * 3, 60); // up to 60 drops

  let dropsMarkup = "";
  const animationDurations: { id: string; delay: string; duration: string }[] =
    [];

  for (let i = 0; i < dropCount; i++) {
    const icon = icons[i % icons.length];
    const x = rand() * (width - iconSize);
    const delay = (rand() * 8).toFixed(2);
    const duration = (4 + rand() * 6).toFixed(2); // 4–10s
    const startY = -(iconSize + rand() * height * 0.3); // start above viewport
    const id = `drop-${i}`;

    animationDurations.push({
      id,
      delay: `${delay}s`,
      duration: `${duration}s`,
    });

    dropsMarkup += `
      <g transform="translate(${x.toFixed(1)}, 0)">
        <g class="${id}" transform="translate(0, ${startY.toFixed(1)})" opacity="0.55">
          ${icon.svgContent}
        </g>
      </g>`;
  }

  // Build per-drop keyframe rules via a shared @keyframes and per-element
  // animation properties so we avoid duplicating keyframe blocks.
  const perDropStyles = animationDurations
    .map(
      (d) =>
        `.${d.id} { animation: rainFall ${d.duration} ${d.delay} linear infinite; }`,
    )
    .join("\n        ");

  // --- Name overlay -----------------------------------------------------------
  let nameMarkup = "";
  if (name) {
    // Choose font size that fits — shrink if name is very long
    const fontSize = fontSizeOverride || (name.length > 16 ? 38 : name.length > 10 ? 46 : 54);
    nameMarkup = `
      <!-- Centered name -->
      <text
        x="${width / 2}" y="${height / 2 + fontSize / 3}"
        class="rain-name"
        font-size="${fontSize}"
        text-anchor="middle"
        dominant-baseline="central"
      >${escapeXml(name)}</text>`;
  }

  // --- Compose SVG ------------------------------------------------------------
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <style>
    @keyframes rainFall {
      0%   { transform: translateY(0); opacity: 0; }
      10%  { opacity: 0.55; }
      90%  { opacity: 0.55; }
      100% { transform: translateY(${height + iconSize * 2}px); opacity: 0; }
    }
    ${perDropStyles}

    .rain-name {
      font-family: 'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif;
      font-weight: 800;
      fill: ${colors.nameColor};
      filter: drop-shadow(0 0 12px ${colors.nameGlow});
      pointer-events: none;
    }

    /* Pause on hover */
    svg:hover g[class^="drop-"] {
      animation-play-state: paused;
    }
  </style>

  <defs>
    <linearGradient id="rainFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="white" />
      <stop offset="8%"   stop-color="white" />
      <stop offset="92%"  stop-color="white" />
      <stop offset="100%" stop-color="transparent" />
    </linearGradient>
    <mask id="rainFadeMask">
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#rainFade)" />
    </mask>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" rx="6" fill="${colors.bg}" />

  <!-- Falling icons (masked so they fade at edges) -->
  <g mask="url(#rainFadeMask)">
    ${dropsMarkup}
  </g>

  ${nameMarkup}
</svg>`.trim();
}

/** Minimal XML-escape for user-supplied text in SVG */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
