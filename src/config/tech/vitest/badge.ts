import type { TechBadge } from "../_types";

export default {
  color: "url(#vitest-grad)",
  iconPosition: "right",
  showText: true,
  iconWidth: 17,
  iconHeight: 14,
  textWidth: 48,
  defs: '<linearGradient id="vitest-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#1E40AF"/></linearGradient>',
} satisfies TechBadge;
