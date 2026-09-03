import type { TechBadge } from "../_types";

export default {
  color: "url(#axios-grad)",
  iconPosition: "left",
  showText: true,
  defs: '<linearGradient id="axios-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#377A9E"/><stop offset="100%" stop-color="#381C4F"/></linearGradient>',
} satisfies TechBadge;
