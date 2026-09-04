export interface TerminalLine {
  command: string;
  output: string;
}

export interface TerminalOptions {
  title?: string;
  prompt?: string;
  lines?: TerminalLine[];
  theme?: string;
  width?: number;
  speed?: number;
}

interface ThemeConfig {
  bg: string;
  headerBg: string;
  border: string;
  title: string;
  prompt: string;
  command: string;
  output: string;
  cursor: string;
}

const THEMES: Record<string, ThemeConfig> = {
  brand: {
    bg: "#0D1117",
    headerBg: "#161B22",
    border: "#30363D",
    title: "#8B949E",
    prompt: "#58A6FF",
    command: "#F0F6FC",
    output: "#7EE787",
    cursor: "#58A6FF",
  },
  dark: {
    bg: "#0D1117",
    headerBg: "#161B22",
    border: "#30363D",
    title: "#8B949E",
    prompt: "#2EA043",
    command: "#F0F6FC",
    output: "#8B949E",
    cursor: "#2EA043",
  },
  matrix: {
    bg: "#050D08",
    headerBg: "#0A180E",
    border: "#00FF6644",
    title: "#00CC55",
    prompt: "#00FF66",
    command: "#FFFFFF",
    output: "#00FF66",
    cursor: "#00FF66",
  },
  dracula: {
    bg: "#282A36",
    headerBg: "#21222C",
    border: "#6272A4",
    title: "#6272A4",
    prompt: "#FF79C6",
    command: "#F8F8F2",
    output: "#50FA7B",
    cursor: "#8BE9FD",
  },
  monokai: {
    bg: "#272822",
    headerBg: "#1E1F1C",
    border: "#49483E",
    title: "#75715E",
    prompt: "#F92672",
    command: "#F8F8F2",
    output: "#A6E22E",
    cursor: "#FD971F",
  },
  light: {
    bg: "#FFFFFF",
    headerBg: "#F6F8FA",
    border: "#D0D7DE",
    title: "#57606A",
    prompt: "#0969DA",
    command: "#1F2328",
    output: "#1A7F37",
    cursor: "#0969DA",
  },
  bg: {
    bg: "transparent",
    headerBg: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.15)",
    title: "#8B949E",
    prompt: "#58A6FF",
    command: "#F0F6FC",
    output: "#7EE787",
    cursor: "#58A6FF",
  },
  transparent: {
    bg: "transparent",
    headerBg: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.15)",
    title: "#8B949E",
    prompt: "#58A6FF",
    command: "#F0F6FC",
    output: "#7EE787",
    cursor: "#58A6FF",
  },
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateTerminalSvg(options: TerminalOptions = {}): string {
  const {
    title = "bash — 80x24",
    prompt = "➜ ~",
    theme = "brand",
    width = 850,
    lines = [
      { command: "whoami", output: "Full Stack Engineer & System Architect" },
      {
        command: "cat skills.txt",
        output: "TypeScript, React, Next.js, Node.js, AWS, Docker",
      },
      {
        command: "echo $CURRENT_FOCUS",
        output: "Building high-performance distributed cloud services",
      },
      {
        command: "uptime",
        output: "Coding with passion since 2019 • 1,500+ contributions",
      },
    ],
  } = options;

  const t = THEMES[theme] || THEMES.brand;
  const escapedTitle = escapeXml(title);
  const escapedPrompt = escapeXml(prompt);

  const headerHeight = 36;
  const lineHeight = 24;
  const startY = headerHeight + 28;

  const contentHeight = lines.length * (lineHeight * 2 + 6) + 32;
  const totalHeight = headerHeight + contentHeight + 20;

  // Staggered timing
  const stepTime = 0.6;
  let totalDelay = 0.2;

  const lineItems = lines
    .map((item, index) => {
      const cmdY = startY + index * (lineHeight * 2 + 8);
      const outY = cmdY + lineHeight;

      const cmdDelay = totalDelay.toFixed(2);
      totalDelay += stepTime;
      const outDelay = totalDelay.toFixed(2);
      totalDelay += stepTime;

      return `
      <!-- Line ${index + 1} Command -->
      <g class="term-line" style="animation-delay: ${cmdDelay}s;">
        <text x="24" y="${cmdY}" class="prompt">${escapedPrompt}</text>
        <text x="80" y="${cmdY}" class="command">${escapeXml(item.command)}</text>
      </g>

      <!-- Line ${index + 1} Output -->
      <g class="term-line" style="animation-delay: ${outDelay}s;">
        <text x="36" y="${outY}" class="output">${escapeXml(item.output)}</text>
      </g>
    `;
    })
    .join("\n");

  const finalPromptY = startY + lines.length * (lineHeight * 2 + 8);
  const finalCursorDelay = totalDelay.toFixed(2);

  return `
    <svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .font-mono {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
        }
        .title {
          font: 500 13px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          fill: ${t.title};
        }
        .prompt {
          font: 600 14px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          fill: ${t.prompt};
        }
        .command {
          font: 600 14px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          fill: ${t.command};
        }
        .output {
          font: 400 13.5px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          fill: ${t.output};
        }
        .cursor {
          font: 700 15px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          fill: ${t.cursor};
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .term-line {
          opacity: 0;
          animation: fadeInLine 0.3s ease-out forwards;
        }
        @keyframes fadeInLine {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .final-prompt {
          opacity: 0;
          animation: fadeInLine 0.3s ease-out forwards;
          animation-delay: ${finalCursorDelay}s;
        }
      </style>

      <!-- Terminal Window Box -->
      <rect width="${width}" height="${totalHeight}" rx="10" fill="${t.bg}" stroke="${t.border}" stroke-width="1" />

      <!-- Terminal Header Bar -->
      <path d="M0 10C0 4.47715 4.47715 0 10 0H${width - 10}C${width - 4.47715} 0 ${width} 4.47715 ${width} 10V${headerHeight}H0V10Z" fill="${t.headerBg}" stroke="${t.border}" stroke-width="1" />

      <!-- Window Control Buttons (macOS Dots) -->
      <circle cx="20" cy="18" r="6" fill="#FF5F56" />
      <circle cx="40" cy="18" r="6" fill="#FFBD2E" />
      <circle cx="60" cy="18" r="6" fill="#27C93F" />

      <!-- Window Title -->
      <text x="${width / 2}" y="22" text-anchor="middle" class="title">${escapedTitle}</text>

      <!-- Terminal Body Content -->
      <g class="font-mono">
        ${lineItems}

        <!-- Final Active Prompt & Blinking Cursor -->
        <g class="final-prompt">
          <text x="24" y="${finalPromptY}" class="prompt">${escapedPrompt}</text>
          <text x="80" y="${finalPromptY}" class="cursor">▋</text>
        </g>
      </g>
    </svg>
  `;
}
