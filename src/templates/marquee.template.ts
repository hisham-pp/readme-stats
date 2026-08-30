export function generateMarqueeSvg({
  elements,
  viewBoxWidth = 850,
  gap = 10,
  targetHeight = 24,
  extraHeightPadding = 0,
  allDefs = "",
}: {
  elements: { svgContent: string; width: number }[];
  viewBoxWidth?: number;
  gap?: number;
  targetHeight?: number;
  extraHeightPadding?: number;
  allDefs?: string;
}) {
  let totalWidth = 0;

  // Calculate totalWidth of a single set of elements
  elements.forEach((badge) => {
    totalWidth += badge.width + gap;
  });

  // To prevent empty space on short lists, we must repeat the items enough times.
  // We need the remaining width after the first set scrolls out to be at least viewBoxWidth.
  const repeats =
    totalWidth > 0 ? Math.max(2, Math.ceil(viewBoxWidth / totalWidth) + 1) : 2;

  let currentX = 0;
  let stitchedSvgInner = "";

  // We render the list of elements multiple times to create a seamless infinite loop
  let allElements: typeof elements = [];
  for (let i = 0; i < repeats; i++) {
    allElements = allElements.concat(elements);
  }

  allElements.forEach((badge) => {
    stitchedSvgInner += `
      <g transform="translate(${currentX}, ${extraHeightPadding / 2})">
        ${badge.svgContent}
      </g>
    `;
    currentX += badge.width + gap;
  });

  const height = targetHeight + extraHeightPadding;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${viewBoxWidth}" height="${height}" viewBox="0 0 ${viewBoxWidth} ${height}">
      <style>
        .marquee-content {
          animation: scroll 30s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        /* Pause animation on hover */
        svg:hover .marquee-content {
          animation-play-state: paused;
        }
      </style>
      
      <!-- Gradient masks to create fade out on edges -->
      <defs>
        ${allDefs}
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="transparent" />
          <stop offset="5%" stop-color="white" />
          <stop offset="95%" stop-color="white" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
        <mask id="fadeMask">
          <rect x="0" y="0" width="${viewBoxWidth}" height="${height}" fill="url(#fade)" />
        </mask>
      </defs>

      <g mask="url(#fadeMask)">
        <g class="marquee-content">
          ${stitchedSvgInner}
        </g>
      </g>
    </svg>
  `.trim();
}
