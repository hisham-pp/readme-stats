import { NextRequest, NextResponse } from "next/server";
import {
  generateTerminalSvg,
  TerminalLine,
} from "@/templates/terminal.template";
import { COMMON_CACHE_CONTROL } from "@/config/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const theme = searchParams.get("theme") || "brand";
  const username = searchParams.get("username");
  const prompt = searchParams.get("prompt") || "➜ ~";
  const title =
    searchParams.get("title") ||
    (username ? `${username}@dev: ~ (zsh)` : "bash — 80x24");

  const widthParam = searchParams.get("width");
  const width = widthParam ? parseInt(widthParam, 10) || 850 : 850;

  let lines: TerminalLine[] | undefined = undefined;

  const rawLines = searchParams.get("lines");
  if (rawLines) {
    const pairs = rawLines
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean);
    const parsed: TerminalLine[] = [];
    for (const pair of pairs) {
      const sepIndex = pair.includes("|")
        ? pair.indexOf("|")
        : pair.indexOf(":");
      if (sepIndex !== -1) {
        const command = pair.slice(0, sepIndex).trim();
        const output = pair.slice(sepIndex + 1).trim();
        if (command && output) {
          parsed.push({ command, output });
        }
      }
    }
    if (parsed.length > 0) {
      lines = parsed;
    }
  }

  // Fallback to individual parameter shortcuts if lines was not provided
  if (!lines) {
    const customLines: TerminalLine[] = [];
    const whoami = searchParams.get("whoami") || searchParams.get("name");
    const role = searchParams.get("role");
    const skills = searchParams.get("skills") || searchParams.get("stack");
    const focus = searchParams.get("focus");
    const uptime = searchParams.get("uptime") || searchParams.get("bio");

    if (whoami) {
      customLines.push({ command: "whoami", output: whoami });
    }
    if (role) {
      customLines.push({ command: "cat role.txt", output: role });
    }
    if (skills) {
      customLines.push({ command: "cat skills.txt", output: skills });
    }
    if (focus) {
      customLines.push({ command: "echo $CURRENT_FOCUS", output: focus });
    }
    if (uptime) {
      customLines.push({ command: "uptime", output: uptime });
    }

    if (customLines.length > 0) {
      lines = customLines;
    }
  }

  // Default lines if neither lines nor individual params are set
  if (!lines) {
    lines = [
      {
        command: "whoami",
        output: username
          ? `${username} • Full Stack Software Engineer`
          : "Full Stack Software Engineer",
      },
      {
        command: "cat skills.txt",
        output: "TypeScript, React, Next.js, Node.js, Python, AWS, Docker",
      },
      {
        command: "echo $CURRENT_FOCUS",
        output: "Building resilient distributed systems and developer tooling",
      },
      {
        command: "uptime",
        output:
          "Writing scalable code since 2019 • 1,500+ GitHub contributions",
      },
    ];
  }

  const svg = generateTerminalSvg({
    title,
    prompt,
    theme,
    width,
    lines,
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": COMMON_CACHE_CONTROL,
    },
  });
}
