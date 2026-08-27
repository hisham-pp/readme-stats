const fs = require('fs');
const https = require('https');
const path = require('path');

const configPath = path.join(__dirname, '../src/lib/techConfig.json');
const iconsDir = path.join(__dirname, '../public/icons');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const additions = {
  // Batch 1
  "xlsx": { "name": "xlsx", "color": "#185C37", "iconPosition": "left", "icon": "xlsx-icon.svg", "showText": true, "id": "65_xlsx" },
  "uuid": { "name": "uuid", "color": "#4B5563", "iconPosition": "left", "icon": "uuid-icon.svg", "showText": true, "id": "66_uuid" },
  "sanitize_html": { "name": "sanitize-html", "color": "#E34F26", "iconPosition": "left", "icon": "sanitize-html-icon.svg", "showText": true, "id": "67_sanitize_html" },
  "multer": { "name": "Multer", "color": "#F34C28", "iconPosition": "left", "icon": "multer-icon.svg", "showText": true, "id": "68_multer" },
  "mongoose": { "name": "Mongoose", "color": "#880000", "iconPosition": "left", "icon": "mongoose-icon.svg", "showText": true, "id": "69_mongoose" },
  "postgresql": { "name": "PostgreSQL", "color": "#4169E1", "iconPosition": "left", "icon": "postgresql-icon.svg", "showText": true, "id": "14_postgresql" },
  "mongodb": { "name": "MongoDB", "color": "#47A248", "iconPosition": "left", "icon": "mongodb-icon.svg", "showText": true, "id": "15_mongodb" },
  "sqlite": { "name": "SQLite", "color": "#003B57", "iconPosition": "left", "icon": "sqlite-icon.svg", "showText": true, "id": "16_sqlite" },
  "dynamodb": { "name": "DynamoDB", "color": "#4053D6", "iconPosition": "left", "icon": "dynamodb-icon.svg", "showText": true, "id": "17_dynamodb" },
  "supabase": { "name": "Supabase", "color": "#3ECF8E", "iconPosition": "left", "icon": "supabase-icon.svg", "showText": true, "id": "18_supabase" },
  "prisma": { "name": "Prisma", "color": "#2D3748", "iconPosition": "left", "icon": "prisma-icon.svg", "showText": true, "id": "19_prisma" },
  "typeorm": { "name": "TypeORM", "color": "#FE0902", "iconPosition": "left", "icon": "typeorm-icon.svg", "showText": true, "id": "20_typeorm" },
  "drizzle_orm": { "name": "Drizzle ORM", "color": "#C5F74F", "iconPosition": "left", "icon": "drizzle-orm-icon.svg", "showText": true, "id": "70_drizzle_orm" },
  "db": { "name": "Database", "color": "#4B5563", "iconPosition": "left", "icon": "db-icon.svg", "showText": true, "id": "102_db" },
  "git": { "name": "Git", "color": "#F05032", "iconPosition": "left", "icon": "git-icon.svg", "showText": true, "id": "71_git" },
  "github": { "name": "GitHub", "color": "#181717", "iconPosition": "left", "icon": "github-icon.svg", "showText": true, "id": "72_github" },
  "gitlab": { "name": "GitLab", "color": "#FC6D26", "iconPosition": "left", "icon": "gitlab-icon.svg", "showText": true, "id": "73_gitlab" },
  "vscode": { "name": "VS Code", "color": "#007ACC", "iconPosition": "left", "icon": "vscode-icon.svg", "showText": true, "id": "74_vscode" },
  "cursor": { "name": "Cursor", "color": "#18181B", "iconPosition": "left", "icon": "cursor-icon.svg", "showText": true, "id": "103_cursor" },
  "windsurf": { "name": "Windsurf", "color": "#2563EB", "iconPosition": "left", "icon": "windsurf-icon.svg", "showText": true, "id": "104_windsurf" },
  "kiro": { "name": "Kiro", "color": "#10B981", "iconPosition": "left", "icon": "kiro-icon.svg", "showText": true, "id": "105_kiro" },
  "claude_code": { "name": "Claude Code", "color": "#D97757", "iconPosition": "left", "icon": "claude-code-icon.svg", "showText": true, "id": "106_claude_code" },
  "claude_desktop": { "name": "Claude Desktop", "color": "#D97757", "iconPosition": "left", "icon": "claude-desktop-icon.svg", "showText": true, "id": "107_claude_desktop" },
  "codex": { "name": "OpenAI Codex", "color": "#412991", "iconPosition": "left", "icon": "codex-icon.svg", "showText": true, "id": "108_codex" },
  "devin": { "name": "Devin", "color": "#1E3A8A", "iconPosition": "left", "icon": "devin-icon.svg", "showText": true, "id": "109_devin" },
  "gemini": { "name": "Google Gemini", "color": "#8E75B2", "iconPosition": "left", "icon": "gemini-icon.svg", "showText": true, "id": "110_gemini" },
  
  // Batch 2
  "handlebars": { "name": "Handlebars", "color": "#000000", "iconPosition": "left", "icon": "handlebars-icon.svg", "showText": true, "id": "111_handlebars" },
  "gemini_cli": { "name": "Gemini CLI", "color": "#8E75B2", "iconPosition": "left", "icon": "gemini-cli-icon.svg", "showText": true, "id": "112_gemini_cli" },
  "claude": { "name": "Claude", "color": "#D97757", "iconPosition": "left", "icon": "claude-icon.svg", "showText": true, "id": "113_claude" },
  "chatgpt": { "name": "ChatGPT", "color": "#10A37F", "iconPosition": "left", "icon": "chatgpt-icon.svg", "showText": true, "id": "114_chatgpt" },
  "ai_studio": { "name": "Google AI Studio", "color": "#4285F4", "iconPosition": "left", "icon": "ai-studio-icon.svg", "showText": true, "id": "115_ai_studio" },
  "antigravity": { "name": "Antigravity", "color": "#20232A", "iconPosition": "left", "icon": "antigravity-icon.svg", "showText": true, "id": "116_antigravity" },
  "antigravity_cli": { "name": "Antigravity CLI", "color": "#20232A", "iconPosition": "left", "icon": "antigravity-cli-icon.svg", "showText": true, "id": "117_antigravity_cli" },
  "pnpm": { "name": "pnpm", "color": "#F69220", "iconPosition": "left", "icon": "pnpm-icon.svg", "showText": true, "id": "118_pnpm" },
  "npm": { "name": "npm", "color": "#CB3837", "iconPosition": "left", "icon": "npm-icon.svg", "showText": true, "id": "119_npm" },
  "bun": { "name": "Bun", "color": "#FBF0DF", "iconPosition": "left", "icon": "bun-icon.svg", "showText": true, "id": "120_bun" },
  "sonarqube": { "name": "SonarQube", "color": "#4E9BCD", "iconPosition": "left", "icon": "sonarqube-icon.svg", "showText": true, "id": "121_sonarqube" },
  "sonarlint": { "name": "SonarLint", "color": "#CB2029", "iconPosition": "left", "icon": "sonarlint-icon.svg", "showText": true, "id": "122_sonarlint" },
  "postman": { "name": "Postman", "color": "#FF6C37", "iconPosition": "left", "icon": "postman-icon.svg", "showText": true, "id": "123_postman" },
  "linux": { "name": "Linux", "color": "#FCC624", "iconPosition": "left", "icon": "linux-icon.svg", "showText": true, "id": "124_linux" },
  "windows": { "name": "Windows", "color": "#0078D6", "iconPosition": "left", "icon": "windows-icon.svg", "showText": true, "id": "125_windows" },
  "wsl": { "name": "WSL", "color": "#0a97f5", "iconPosition": "left", "icon": "wsl-icon.svg", "showText": true, "id": "126_wsl" },
  "eslint": { "name": "ESLint", "color": "#4B32C3", "iconPosition": "left", "icon": "eslint-icon.svg", "showText": true, "id": "127_eslint" },
  "prettier": { "name": "Prettier", "color": "#F7B93E", "iconPosition": "left", "icon": "prettier-icon.svg", "showText": true, "id": "128_prettier" },
  "lefthook": { "name": "Lefthook", "color": "#FF6B6B", "iconPosition": "left", "icon": "lefthook-icon.svg", "showText": true, "id": "129_lefthook" },
  "husky": { "name": "Husky", "color": "#000000", "iconPosition": "left", "icon": "husky-icon.svg", "showText": true, "id": "130_husky" },
  "sql": { "name": "SQL", "color": "#4479A1", "iconPosition": "left", "icon": "sql-icon.svg", "showText": true, "id": "131_sql" },
  "json": { "name": "JSON", "color": "#000000", "iconPosition": "left", "icon": "json-icon.svg", "showText": true, "id": "132_json" },
  "yaml": { "name": "YAML", "color": "#CB171E", "iconPosition": "left", "icon": "yaml-icon.svg", "showText": true, "id": "133_yaml" },
  "xml": { "name": "XML", "color": "#00608C", "iconPosition": "left", "icon": "xml-icon.svg", "showText": true, "id": "134_xml" },
  "terraform": { "name": "Terraform", "color": "#844FBA", "iconPosition": "left", "icon": "terraform-icon.svg", "showText": true, "id": "135_terraform" },
  "bash": { "name": "Bash", "color": "#4EAA25", "iconPosition": "left", "icon": "bash-icon.svg", "showText": true, "id": "136_bash" },
  "zsh": { "name": "Zsh", "color": "#111111", "iconPosition": "left", "icon": "zsh-icon.svg", "showText": true, "id": "137_zsh" },
  "powershell": { "name": "PowerShell", "color": "#5391FE", "iconPosition": "left", "icon": "powershell-icon.svg", "showText": true, "id": "138_powershell" }
};

Object.assign(config, additions);
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('Updated techConfig.json with 54 technologies.');

// Simple icons map mapping tech id to simple-icons slug (if different from key)
const simpleIconsMap = {
  "postgresql": "postgresql",
  "mongodb": "mongodb",
  "sqlite": "sqlite",
  "dynamodb": "amazondynamodb",
  "supabase": "supabase",
  "prisma": "prisma",
  "typeorm": "typeorm",
  "drizzle_orm": "drizzle",
  "git": "git",
  "github": "github",
  "gitlab": "gitlab",
  "vscode": "visualstudiocode",
  "pnpm": "pnpm",
  "npm": "npm",
  "bun": "bun",
  "sonarqube": "sonarqube",
  "sonarlint": "sonarlint",
  "postman": "postman",
  "linux": "linux",
  "windows": "windows",
  "eslint": "eslint",
  "prettier": "prettier",
  "husky": "husky",
  "json": "json",
  "yaml": "yaml",
  "terraform": "terraform",
  "bash": "gnubash",
  "powershell": "powershell",
  "handlebars": "handlebars",
  "claude": "anthropic",
  "mongoose": "mongoose"
};

const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 2L2 22h20L12 2zm0 3.5l7.5 15h-15L12 5.5zm-1 8h2v4h-2v-4zm0-3h2v2h-2v-2z"/></svg>`;

async function downloadIcon(techKey, item) {
  const iconPath = path.join(iconsDir, item.icon);
  if (fs.existsSync(iconPath)) return;
  
  const slug = simpleIconsMap[techKey];
  if (slug) {
    const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${slug}.svg`;
    await new Promise((resolve) => {
      https.get(url, (res) => {
        if (res.statusCode === 200) {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            fs.writeFileSync(iconPath, data);
            console.log(`Downloaded ${slug} for ${techKey}`);
            resolve();
          });
        } else {
          fs.writeFileSync(iconPath, defaultSvg);
          console.log(`Fallback generic SVG for ${techKey} (simple-icons ${slug} not found)`);
          resolve();
        }
      }).on('error', () => {
        fs.writeFileSync(iconPath, defaultSvg);
        resolve();
      });
    });
  } else {
    fs.writeFileSync(iconPath, defaultSvg);
    console.log(`Created default generic SVG for ${techKey}`);
  }
}

async function processAll() {
  for (const [key, item] of Object.entries(additions)) {
    await downloadIcon(key, item);
  }
  console.log('All icons processed.');
}

processAll();
