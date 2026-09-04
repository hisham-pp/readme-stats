import { StreakStats } from "@/types/github.types";

export function generateStreakSvg(stats: StreakStats): string {
  const {
    name,
    totalContributions,
    firstContributionDate,
    currentStreak,
    currentStreakStart,
    longestStreak,
    longestStreakStart,
    theme = "brand",
  } = stats;

  let bg = "#0D1117";
  let stroke = "#30363D";
  let title = "#58A6FF";
  let number = "#F0F6FC";
  let label = "#58A6FF";
  let dates = "#8B949E";
  let dividers = "#21262D";
  let flame = "#FA7A18";
  let trophy = "#F1E05A";
  let calendar = "#58A6FF";

  if (theme === "light") {
    bg = "#FFFFFF";
    stroke = "#D0D7DE";
    title = "#0969DA";
    number = "#1F2328";
    label = "#0969DA";
    dates = "#656D76";
    dividers = "#E1E4E8";
    flame = "#D95D00";
    trophy = "#D4A72C";
    calendar = "#0969DA";
  } else if (theme === "dark") {
    bg = "#0D1117";
    stroke = "#30363D";
    title = "#E6EDF3";
    number = "#FFFFFF";
    label = "#8B949E";
    dates = "#6E7681";
    dividers = "#21262D";
    flame = "#FA7A18";
    trophy = "#F1E05A";
    calendar = "#8B949E";
  } else if (theme === "bg") {
    bg = "transparent";
    stroke = "transparent";
    title = "#58A6FF";
    number = "#F0F6FC";
    label = "#58A6FF";
    dates = "#8B949E";
    dividers = "rgba(255, 255, 255, 0.12)";
    flame = "#FA7A18";
    trophy = "#F1E05A";
    calendar = "#58A6FF";
  }

  const currentStreakText =
    currentStreak === 1 ? "1 day" : `${currentStreak} days`;
  const longestStreakText =
    longestStreak === 1 ? "1 day" : `${longestStreak} days`;

  return `
    <svg width="495" height="195" viewBox="0 0 495 195" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${title}; }
        .number { font: 700 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${number}; }
        .label { font: 600 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${label}; }
        .date { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${dates}; }
        @keyframes flamePulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 1px ${flame}88); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 6px ${flame}); }
          100% { transform: scale(1); filter: drop-shadow(0 0 1px ${flame}88); }
        }
        .flame-animated {
          transform-origin: 247px 70px;
          animation: flamePulse 2.4s ease-in-out infinite;
        }
      </style>

      <!-- Card Background -->
      <rect width="495" height="195" rx="6" fill="${bg}" stroke="${stroke}" stroke-width="1" />

      <!-- Card Header -->
      <text x="25" y="32" class="header">${name}'s GitHub Streak</text>

      <!-- Column Dividers -->
      <line x1="165" y1="52" x2="165" y2="175" stroke="${dividers}" stroke-width="1" />
      <line x1="330" y1="52" x2="330" y2="175" stroke="${dividers}" stroke-width="1" />

      <!-- 1. Total Contributions -->
      <g transform="translate(82, 60)">
        <g transform="translate(-10, 0)">
          <!-- Calendar Icon -->
          <svg x="0" y="0" width="20" height="20" viewBox="0 0 24 24" fill="${calendar}">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
          </svg>
        </g>
        <text x="0" y="48" text-anchor="middle" class="number">${totalContributions.toLocaleString()}</text>
        <text x="0" y="70" text-anchor="middle" class="label">Total Contributions</text>
        <text x="0" y="90" text-anchor="middle" class="date">${firstContributionDate || "Past Year"}</text>
      </g>

      <!-- 2. Current Streak -->
      <g transform="translate(247, 56)">
        <!-- Animated Flame Icon -->
        <g class="flame-animated" transform="translate(-12, -2)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="${flame}">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C11.38 2 10.82 2.38 10.6 2.96C9.4 6.02 7.76 8.02 6.45 9.94C5.07 11.95 4 14.08 4 16.5C4 20.64 7.36 24 11.5 24C12.19 24 12.85 23.91 13.47 23.74C17.2 22.73 20 19.34 20 15.3C20 11.11 17.5 8.2 15.65 6.25C14.64 5.19 13.71 4.21 13.05 3.09C12.78 2.65 12.41 2 12 2ZM11.5 22C8.46 22 6 19.54 6 16.5C6 14.74 6.79 13.07 8.09 11.16C9.29 9.41 10.75 7.5 11.9 4.79C12.38 5.67 13.08 6.44 13.92 7.33C15.93 9.45 18 11.89 18 15.3C18 18.26 16.03 20.76 13.31 21.6C12.73 21.86 12.13 22 11.5 22ZM11.5 18C10.67 18 10 17.33 10 16.5C10 14.8 11 13.8 11.7 13.1C12.1 12.7 12.5 12.3 12.8 11.8C13.2 12.4 13.5 13.1 13.7 13.8C14.2 15.4 13.3 18 11.5 18Z"/>
          </svg>
        </g>
        <text x="0" y="52" text-anchor="middle" class="number">${currentStreakText}</text>
        <text x="0" y="74" text-anchor="middle" class="label">Current Streak</text>
        <text x="0" y="94" text-anchor="middle" class="date">${currentStreakStart || "No active streak"}</text>
      </g>

      <!-- 3. Longest Streak -->
      <g transform="translate(412, 60)">
        <g transform="translate(-11, 0)">
          <!-- Trophy Icon -->
          <svg x="0" y="0" width="22" height="22" viewBox="0 0 24 24" fill="${trophy}">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4C4.45 4 4 4.45 4 5V8C4 10.76 6.24 13 9 13H9.17C9.64 14.16 10.51 15.12 11.6 15.63L11 19H9C8.45 19 8 19.45 8 20C8 20.55 8.45 21 9 21H15C15.55 21 16 20.55 16 20C16 19.45 15.55 19 15 19H13L12.4 15.63C13.49 15.12 14.36 14.16 14.83 13H15C17.76 13 20 10.76 20 8V5C20 4.45 19.55 4 19 4H5ZM6 6H8V11C6.9 11 6 10.1 6 9V6ZM10 6V11C10 12.1 10.9 13 12 13C13.1 13 14 12.1 14 11V6H10ZM16 11V6H18V9C18 10.1 17.1 11 16 11Z"/>
          </svg>
        </g>
        <text x="0" y="48" text-anchor="middle" class="number">${longestStreakText}</text>
        <text x="0" y="70" text-anchor="middle" class="label">Longest Streak</text>
        <text x="0" y="90" text-anchor="middle" class="date">${longestStreakStart || "No streak record"}</text>
      </g>
    </svg>
  `;
}
