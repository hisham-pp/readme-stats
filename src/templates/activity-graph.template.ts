import { ActivityGraphStats } from "@/types/github.types";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getCatmullRomPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 >= points.length ? points.length - 1 : i + 2];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return path;
}

export function generateActivityGraphSvg(stats: ActivityGraphStats): string {
  const {
    name,
    username,
    totalContributions,
    weeklyAverage,
    maxDayCount,
    points,
    months,
    theme = "brand",
    lineColor: customLineColor,
    areaColor: customAreaColor,
    hideTitle = false,
    hideMetrics = false,
  } = stats;

  // Theme palettes
  let bg = "#0D1117";
  let border = "#30363D";
  let titleColor = "#58A6FF";
  let textColor = "#8B949E";
  let gridColor = "rgba(48, 54, 61, 0.4)";
  let lineColor = "#38BDF8";
  let lineGradTo = "#818CF8";
  let badgeBg = "rgba(56, 189, 248, 0.1)";
  let badgeText = "#38BDF8";

  if (theme === "light") {
    bg = "#FFFFFF";
    border = "#D0D7DE";
    titleColor = "#0969DA";
    textColor = "#57606A";
    gridColor = "rgba(208, 215, 222, 0.6)";
    lineColor = "#0969DA";
    lineGradTo = "#2F81F7";
    badgeBg = "rgba(9, 105, 218, 0.08)";
    badgeText = "#0969DA";
  } else if (theme === "dark") {
    bg = "#0D1117";
    border = "#30363D";
    titleColor = "#58A6FF";
    textColor = "#8B949E";
    gridColor = "rgba(48, 54, 61, 0.5)";
    lineColor = "#58A6FF";
    lineGradTo = "#38BDF8";
    badgeBg = "rgba(88, 166, 255, 0.1)";
    badgeText = "#58A6FF";
  } else if (theme === "matrix") {
    bg = "#0B130E";
    border = "#1F4229";
    titleColor = "#00FF66";
    textColor = "#00CC52";
    gridColor = "rgba(0, 255, 102, 0.15)";
    lineColor = "#00FF66";
    lineGradTo = "#00DD55";
    badgeBg = "rgba(0, 255, 102, 0.1)";
    badgeText = "#00FF66";
  } else if (theme === "dracula") {
    bg = "#282A36";
    border = "#44475A";
    titleColor = "#BD93F9";
    textColor = "#6272A4";
    gridColor = "rgba(68, 71, 90, 0.5)";
    lineColor = "#FF79C6";
    lineGradTo = "#BD93F9";
    badgeBg = "rgba(189, 147, 249, 0.1)";
    badgeText = "#FF79C6";
  } else if (theme === "monokai") {
    bg = "#272822";
    border = "#49483E";
    titleColor = "#FD971F";
    textColor = "#75715E";
    gridColor = "rgba(73, 72, 62, 0.6)";
    lineColor = "#E6DB74";
    lineGradTo = "#A6E22E";
    badgeBg = "rgba(253, 151, 31, 0.1)";
    badgeText = "#FD971F";
  } else if (theme === "bg" || theme === "transparent") {
    bg = "transparent";
    border = "transparent";
    titleColor = "#58A6FF";
    textColor = "#8B949E";
    gridColor = "rgba(48, 54, 61, 0.35)";
    lineColor = "#38BDF8";
    lineGradTo = "#818CF8";
    badgeBg = "rgba(56, 189, 248, 0.1)";
    badgeText = "#38BDF8";
  }

  if (customLineColor) {
    lineColor = customLineColor;
    lineGradTo = customLineColor;
  }
  const areaColor = customAreaColor || lineColor;

  const width = 850;
  const height = 320;

  // Chart coordinates
  const padLeft = 55;
  const padRight = 35;
  const padTop = 85;
  const padBottom = 265;
  const chartW = width - padLeft - padRight;
  const chartH = padBottom - padTop;

  // Aggregate points if points.length > 60 for smooth curve
  const rawPoints = points || [];
  let displayPoints: { x: number; y: number; count: number; date: string }[] =
    [];

  if (rawPoints.length === 0) {
    displayPoints = [
      { x: padLeft, y: padBottom, count: 0, date: "" },
      { x: padLeft + chartW, y: padBottom, count: 0, date: "" },
    ];
  } else if (rawPoints.length <= 60) {
    // Render all points directly
    displayPoints = rawPoints.map((d, i) => {
      const x = padLeft + (i / Math.max(1, rawPoints.length - 1)) * chartW;
      const y = padBottom - (d.count / maxDayCount) * chartH;
      return { x, y, count: d.count, date: d.date };
    });
  } else {
    // 52-week buckets for smooth annual timeline
    const numBuckets = 52;
    const bucketSize = rawPoints.length / numBuckets;

    for (let b = 0; b < numBuckets; b++) {
      const startIdx = Math.floor(b * bucketSize);
      const endIdx = Math.min(
        rawPoints.length,
        Math.floor((b + 1) * bucketSize),
      );
      const slice = rawPoints.slice(startIdx, endIdx);
      const avgCount =
        slice.reduce((sum, d) => sum + d.count, 0) / Math.max(1, slice.length);
      const maxInSlice = Math.max(...slice.map((d) => d.count), 0);

      // Value combines slice activity to emphasize peaks gracefully
      const val = avgCount * 0.4 + maxInSlice * 0.6;
      const x = padLeft + (b / (numBuckets - 1)) * chartW;
      const y = padBottom - (val / maxDayCount) * chartH;
      displayPoints.push({
        x,
        y: Math.max(padTop, Math.min(padBottom, y)),
        count: maxInSlice,
        date: slice[0]?.date || "",
      });
    }
  }

  // Generate smooth Bézier line and closed area paths
  const curvePath = getCatmullRomPath(displayPoints);
  const areaPath = `${curvePath} L ${displayPoints[displayPoints.length - 1].x.toFixed(1)} ${padBottom} L ${displayPoints[0].x.toFixed(1)} ${padBottom} Z`;

  // Find peak point for marker
  let peakPoint = displayPoints[0];
  for (const pt of displayPoints) {
    if (pt.y < peakPoint.y) {
      peakPoint = pt;
    }
  }

  // Y-axis gridlines & ticks
  const yTicks = [
    { label: "0", y: padBottom },
    {
      label: Math.round(maxDayCount * 0.33).toString(),
      y: padBottom - chartH * 0.33,
    },
    {
      label: Math.round(maxDayCount * 0.66).toString(),
      y: padBottom - chartH * 0.66,
    },
    { label: maxDayCount.toString(), y: padTop },
  ];

  const gridlinesSvg = yTicks
    .map(
      (t) => `
      <line x1="${padLeft}" y1="${t.y.toFixed(1)}" x2="${width - padRight}" y2="${t.y.toFixed(1)}" stroke="${gridColor}" stroke-dasharray="3,3" stroke-width="1" />
      <text x="${padLeft - 10}" y="${(t.y + 4).toFixed(1)}" text-anchor="end" class="axis-text">${t.label}</text>
    `,
    )
    .join("\n");

  // X-axis month ticks
  const monthTicksSvg = (months || [])
    .map((m) => {
      const x = padLeft + (m.xPercent / 100) * chartW;
      return `<text x="${x.toFixed(1)}" y="${padBottom + 20}" text-anchor="middle" class="axis-text">${escapeXml(m.label)}</text>`;
    })
    .join("\n");

  // Header Elements
  const displayName = name || username;
  const headerTitle = hideTitle
    ? ""
    : `
    <g transform="translate(30, 26)">
      <svg width="20" height="20" viewBox="0 0 16 16" fill="${titleColor}">
        <path fill-rule="evenodd" d="M1.5 1.75a.75.75 0 00-1.5 0v12.5c0 .414.336.75.75.75h14.5a.75.75 0 000-1.5H1.5V1.75zm14.28 4.72a.75.75 0 00-1.06-1.06l-4.72 4.72-2.47-2.47a.75.75 0 00-1.06 0L3.72 10.41a.75.75 0 101.06 1.06l2.22-2.22 2.47 2.47a.75.75 0 001.06 0l5.25-5.25z"/>
      </svg>
      <text x="30" y="16" class="title">${escapeXml(displayName)}'s Contribution Activity</text>
    </g>
  `;

  // Metric Pills
  const metricsSvg = hideMetrics
    ? ""
    : `
    <g transform="translate(${width - 340}, 24)">
      <!-- Total -->
      <rect x="0" y="0" width="95" height="28" rx="6" fill="${badgeBg}" />
      <text x="47" y="12" text-anchor="middle" class="metric-label">TOTAL</text>
      <text x="47" y="23" text-anchor="middle" class="metric-value">${totalContributions.toLocaleString()}</text>

      <!-- Weekly Avg -->
      <rect x="105" y="0" width="95" height="28" rx="6" fill="${badgeBg}" />
      <text x="152" y="12" text-anchor="middle" class="metric-label">WEEKLY AVG</text>
      <text x="152" y="23" text-anchor="middle" class="metric-value">${weeklyAverage}</text>

      <!-- Peak Day -->
      <rect x="210" y="0" width="95" height="28" rx="6" fill="${badgeBg}" />
      <text x="257" y="12" text-anchor="middle" class="metric-label">PEAK DAY</text>
      <text x="257" y="23" text-anchor="middle" class="metric-value">${maxDayCount}</text>
    </g>
  `;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${areaColor}" stop-opacity="0.38" />
          <stop offset="70%" stop-color="${areaColor}" stop-opacity="0.08" />
          <stop offset="100%" stop-color="${areaColor}" stop-opacity="0.0" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${lineColor}" />
          <stop offset="100%" stop-color="${lineGradTo}" />
        </linearGradient>
        <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="${lineColor}" flood-opacity="0.4" />
        </filter>
      </defs>

      <style>
        .title { font: 600 16px 'Segoe UI', Ubuntu, -apple-system, Sans-Serif; fill: ${titleColor}; }
        .axis-text { font: 400 11px 'Segoe UI', Ubuntu, -apple-system, Sans-Serif; fill: ${textColor}; }
        .metric-label { font: 600 8px 'Segoe UI', Ubuntu, -apple-system, Sans-Serif; fill: ${textColor}; letter-spacing: 0.5px; }
        .metric-value { font: 700 12px 'Segoe UI', Ubuntu, -apple-system, Sans-Serif; fill: ${badgeText}; }
      </style>

      <!-- Background Card -->
      <rect width="${width}" height="${height}" rx="8" fill="${bg}" stroke="${border}" stroke-width="1" />

      <!-- Header & Metrics -->
      ${headerTitle}
      ${metricsSvg}

      <!-- Gridlines -->
      ${gridlinesSvg}

      <!-- Area Gradient Fill -->
      <path d="${areaPath}" fill="url(#areaGrad)" />

      <!-- Smooth Bézier Line -->
      <path d="${curvePath}" fill="none" stroke="url(#lineGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)" />

      <!-- Peak Point Marker -->
      <circle cx="${peakPoint.x.toFixed(1)}" cy="${peakPoint.y.toFixed(1)}" r="6" fill="${lineColor}" fill-opacity="0.25" />
      <circle cx="${peakPoint.x.toFixed(1)}" cy="${peakPoint.y.toFixed(1)}" r="3" fill="${lineColor}" />

      <!-- Month Labels along X-Axis -->
      ${monthTicksSvg}
    </svg>
  `;
}
