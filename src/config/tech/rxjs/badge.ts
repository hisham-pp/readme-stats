import type { TechBadge } from "../_types";

export default {
  color: "url(#rxjs-grad)",
  iconPosition: "left",
  showText: true,
  defs: '<linearGradient id="rxjs-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#ec4899"/></linearGradient>',
} satisfies TechBadge;
