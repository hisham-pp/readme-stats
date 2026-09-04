import { GitHubLanguage } from "@/types/github.types";
import { squarifiedTreemap } from "@/utils/treemap";

export function generateTopLangsSvg(
  langs: GitHubLanguage[],
  type: string = "default",
) {
  if (type.startsWith("treemap")) {
    const isBadge = type.includes("badge");
    const svgWidth = 800;
    const svgHeight = 400;

    // Treemap blocks
    const nodes = squarifiedTreemap(
      langs,
      (lang) => parseFloat(lang.percent),
      25,
      60, // x, y offset
      svgWidth - 50,
      svgHeight - 85, // w, h available
    );

    const blocks = nodes
      .map((node) => {
        const lang = node.data;
        const x = node.x;
        const y = node.y;
        const w = node.w;
        const h = node.h;

        let content = "";
        if (lang.embeddedSvg) {
          if (isBadge) {
            const vbMatch = lang.embeddedSvg.match(
              /viewBox="0\s+0\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"/,
            );
            const vbW = vbMatch ? parseFloat(vbMatch[1]) : 100;
            const vbH = vbMatch ? parseFloat(vbMatch[2]) : 20;
            const badgeAspect = vbW / vbH;
            const maxBadgeH = Math.min(h - 12, 24);
            const maxBadgeW = w - 12;
            let finalBadgeH = maxBadgeH;
            let finalBadgeW = finalBadgeH * badgeAspect;
            if (finalBadgeW > maxBadgeW) {
              finalBadgeW = maxBadgeW;
              finalBadgeH = finalBadgeW / badgeAspect;
            }
            const iconX = (w - finalBadgeW) / 2;
            const iconY = (h - finalBadgeH) / 2;
            content = lang.embeddedSvg.replace(
              /<svg/,
              `<svg x="${iconX}" y="${iconY}" width="${finalBadgeW}" height="${finalBadgeH}" preserveAspectRatio="xMidYMid meet"`,
            );
          } else {
            const size = Math.min(w - 12, h - 12, 48);
            const iconX = (w - size) / 2;
            const iconY = (h - size) / 2;
            content = lang.embeddedSvg.replace(
              /<svg/,
              `<svg x="${iconX}" y="${iconY}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"`,
            );
          }
        } else {
          const hasPercent = w >= 55 && h >= 48;
          const maxAllowedFont = hasPercent
            ? Math.min(22, w / 4, h * 0.28)
            : Math.min(22, w / 4, h * 0.42);
          const fontSize = Math.max(
            8.5,
            Math.min(maxAllowedFont, (w - 10) / (lang.name.length * 0.62)),
          );
          const percentFontSize = Math.max(8, Math.min(13, fontSize * 0.85));

          if (hasPercent) {
            const nameY = h / 2 - percentFontSize * 0.7;
            const percentY = h / 2 + fontSize * 0.7;
            content = `
            <text x="${w / 2}" y="${nameY}" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="${fontSize.toFixed(1)}" font-weight="600" text-anchor="middle" dominant-baseline="central" fill="#fff">${lang.name}</text>
            <text x="${w / 2}" y="${percentY}" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="${percentFontSize.toFixed(1)}" font-weight="500" text-anchor="middle" dominant-baseline="central" fill="${lang.color}">${lang.percent}%</text>
          `;
          } else {
            content = `
            <text x="${w / 2}" y="${h / 2}" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="${fontSize.toFixed(1)}" font-weight="600" text-anchor="middle" dominant-baseline="central" fill="#fff">${lang.name}</text>
          `;
          }
        }

        return `
        <g transform="translate(${x}, ${y})">
          <rect width="${w}" height="${h}" rx="4" fill="#161B22" stroke="${lang.color}" stroke-width="2" />
          ${content}
        </g>
      `;
      })
      .join("");

    return `
      <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          .header { font: 600 22px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58A6FF; }
        </style>
        <rect width="${svgWidth}" height="${svgHeight}" rx="8" fill="#0D1117" stroke="#30363D" />
        <text x="25" y="40" class="header">Most Used Languages</text>
        ${blocks}
      </svg>
    `;
  }

  let currentX = 0;
  const bars = langs
    .map((lang) => {
      const bar = `
      <rect x="${currentX}%" y="0" width="${lang.percent}%" height="8" fill="${lang.color}" />
    `;
      currentX += parseFloat(lang.percent);
      return bar;
    })
    .join("");

  const legend = langs
    .map((lang, index) => {
      if (type === "badge") {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const colWidth = 195;
        const x = col === 0 ? 25 : 240;
        const y = 75 + row * 32;

        let badgeElement = "";
        if (lang.embeddedSvg) {
          const vbMatch = lang.embeddedSvg.match(
            /viewBox="0\s+0\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"/,
          );
          const vbW = vbMatch ? parseFloat(vbMatch[1]) : 100;
          const vbH = vbMatch ? parseFloat(vbMatch[2]) : 20;
          const badgeHeight = 20;
          const badgeWidth = Math.round((vbW / vbH) * badgeHeight);

          badgeElement = lang.embeddedSvg.replace(
            /<svg/,
            `<svg x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" preserveAspectRatio="xMinYMid meet"`,
          );
        } else {
          const nameLen = lang.name.length;
          const pillWidth = Math.max(65, nameLen * 7.5 + 28);
          badgeElement = `
          <g>
            <rect width="${pillWidth}" height="20" rx="3" fill="#21262d" stroke="${lang.color}" stroke-width="1" />
            <circle cx="9" cy="10" r="4" fill="${lang.color}" />
            <text x="18" y="14" fill="#c9d1d9" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11" font-weight="600">${lang.name}</text>
          </g>
        `;
        }

        return `
        <g transform="translate(${x}, ${y})">
          ${badgeElement}
          <text x="${colWidth}" y="14.5" text-anchor="end" class="stat">${lang.percent}%</text>
        </g>
      `;
      } else if (type === "icon") {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const colWidth = 150;
        const x = col === 0 ? 25 : 195;
        const y = 80 + row * 28;

        if (lang.embeddedSvg) {
          const scaledSvg = lang.embeddedSvg.replace(
            /<svg/,
            `<svg x="0" y="-3" width="16" height="16"`,
          );
          return `
          <g transform="translate(${x}, ${y})">
            ${scaledSvg}
            <text x="22" y="9" class="stat" font-weight="600">${lang.name}</text>
            <text x="${colWidth}" y="9" text-anchor="end" class="stat">${lang.percent}%</text>
          </g>
        `;
        }

        // Fallback
        return `
        <g transform="translate(${x}, ${y})">
          <circle cx="5" cy="5" r="5" fill="${lang.color}" />
          <text x="18" y="9" class="stat" font-weight="600">${lang.name}</text>
          <text x="${colWidth}" y="9" text-anchor="end" class="stat">${lang.percent}%</text>
        </g>
      `;
      } else {
        // Default
        const col = index % 2;
        const row = Math.floor(index / 2);
        const colWidth = 150;
        const x = col === 0 ? 25 : 195;
        const y = 80 + row * 25;
        return `
        <g transform="translate(${x}, ${y})">
          <circle cx="5" cy="5" r="5" fill="${lang.color}" />
          <text x="18" y="9" class="stat" font-weight="600">${lang.name}</text>
          <text x="${colWidth}" y="9" text-anchor="end" class="stat">${lang.percent}%</text>
        </g>
      `;
      }
    })
    .join("");

  let svgWidth = 370;
  let svgHeight = 165;

  if (type === "badge") {
    svgWidth = 460;
    svgHeight = 85 + Math.ceil(langs.length / 2) * 32;
  } else if (type === "icon") {
    svgHeight = 85 + Math.ceil(langs.length / 2) * 28;
  } else {
    svgHeight = 85 + Math.ceil(langs.length / 2) * 25;
  }

  return `
    <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58A6FF; }
        .stat { font: 400 12px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #C9D1D9; }
      </style>
      <rect width="${svgWidth}" height="${svgHeight}" rx="4.5" fill="#0D1117" stroke="#0D1117" />
      <text x="25" y="30" class="header">Most Used Languages</text>
      
      <!-- Progress Bar -->
      <svg x="25" y="45" width="${svgWidth - 50}" height="8" rx="4">
        ${bars}
      </svg>
      
      <!-- Legend -->
      ${legend}
    </svg>
  `;
}
