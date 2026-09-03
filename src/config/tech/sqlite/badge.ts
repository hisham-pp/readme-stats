import type { TechBadge } from "../_types";

export default {
  color: "url(#sqlite-bg)",
  defs: `<linearGradient id="sqlite-bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4ba3e3"/><stop offset="100%" stop-color="#006eb3"/></linearGradient>`,
  iconPosition: "left",
  showText: true,
  badgeIconTheme: "light",
} satisfies TechBadge;
