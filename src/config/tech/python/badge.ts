import type { TechBadge } from "../_types";

export default {
  color: "url(#py-bg)",
  defs: `<linearGradient id="py-bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e415e"/><stop offset="100%" stop-color="#3776AB"/></linearGradient>`,
  iconPosition: "left",
  showText: true,
} satisfies TechBadge;
