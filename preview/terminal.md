# Animated Typing Terminal

> **View other styles:** [Badge Marquee](./badge-marquee.md) | [Rainfall Banner](./tech-icon-rain.md) | [GitHub Streak](./streak.md) | [Contribution Snake](./snake.md)

An animated macOS/Linux terminal window that brings your profile README to life with typing commands, syntax-highlighted responses, and an active blinking cursor.

Powered entirely by pure SVG and CSS keyframe animations. Renders reliably on GitHub without requiring JavaScript or external APIs.

---

## Brand Theme (Default)

The classic developer terminal with sleek dark background, blue accent prompt, and green outputs.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=hisham-pp" alt="Terminal Card Brand" width="850" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=your-username" alt="Terminal Bio" width="100%" />
```

---

## Matrix Theme (`theme=matrix`)

Hacker terminal aesthetic with neon green accents on a deep matrix black canvas.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=hisham-pp&theme=matrix" alt="Terminal Card Matrix" width="850" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=your-username&theme=matrix" alt="Terminal Bio" width="100%" />
```

---

## Dracula Theme (`theme=dracula`)

The popular Dracula color palette with vibrant purple, pink, and cyan highlights.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=hisham-pp&theme=dracula" alt="Terminal Card Dracula" width="850" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=your-username&theme=dracula" alt="Terminal Bio" width="100%" />
```

---

## Monokai Theme (`theme=monokai`)

Warm, high-contrast Monokai theme featuring bright magenta prompts and green outputs.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=hisham-pp&theme=monokai" alt="Terminal Card Monokai" width="850" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=your-username&theme=monokai" alt="Terminal Bio" width="100%" />
```

---

## Light Theme (`theme=light`)

Clean light mode terminal with crisp borders and high-contrast typography.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=hisham-pp&theme=light" alt="Terminal Card Light" width="850" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=your-username&theme=light" alt="Terminal Bio" width="100%" />
```

---

## Transparent Theme (`theme=transparent` or `theme=bg`)

Transparent card background designed to integrate cleanly into custom profile banners. Supports both `theme=transparent` and `theme=bg`.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=hisham-pp&theme=transparent" alt="Terminal Card Transparent" width="850" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=your-username&theme=transparent" alt="Terminal Bio" width="100%" />
```

---

## Custom Lines (`lines=...`)

You can provide completely custom command and output pairs separated by semicolons (`;`) using `command:output`:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=hisham-pp&title=hisham@workstation:~&lines=whoami:Principal%20Engineer;git%20status:100%25%20test%20coverage,%20ready%20to%20ship;echo%20%24GOAL:Build%20things%20that%20scale" alt="Custom Terminal" width="850" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/terminal?username=your-username&lines=whoami:Your%20Role;git%20status:Clean%20and%20tested;echo%20%24GOAL:Build%20great%20software" alt="Terminal Bio" width="100%" />
```

---

## Parameters

| Parameter  | Type     | Default             | Description                                                                                      |
| ---------- | -------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| `username` | `string` | _Optional_          | GitHub username used in the default prompt and window title                                      |
| `title`    | `string` | `bash — 80x24`      | Text displayed in the macOS window title bar                                                     |
| `prompt`   | `string` | `➜ ~`               | Shell prompt prefix symbol                                                                       |
| `theme`    | `string` | `brand`             | Theme preset: `brand`, `dark`, `matrix`, `dracula`, `monokai`, `light`, `transparent`, or `bg`   |
| `lines`    | `string` | _Default developer_ | Semicolon-separated `command:output` pairs (e.g. `whoami:Engineer;cat bio.txt:Building systems`) |
| `width`    | `number` | `850`               | ViewBox width of the terminal SVG                                                                |
