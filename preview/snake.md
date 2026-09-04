# GitHub Contribution Grid Snake

> **View other styles:** [Badge Marquee](./badge-marquee.md) | [Icon Marquee](./icon-marquee.md) | [Top Languages](./top-langs.md)

An animated SVG generated dynamically from your GitHub contribution graph. A snake travels through your contribution grid, eating your contribution squares!

No need to configure scheduled GitHub Actions cron jobs or commit SVGs to separate branches. Simply embed the endpoint directly in your profile `README.md`.

---

## Dark Theme (Default)

The classic GitHub dark mode snake animation with purple snake and GitHub green contribution dots.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/snake?username=hisham-pp" alt="GitHub Contribution Snake Dark" width="100%" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/snake?username=your-username" alt="GitHub Contribution Snake" width="100%" />
```

---

## Light Theme (`palette=github-light`)

Light mode palette for white/bright GitHub profiles.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/snake?username=hisham-pp&palette=github-light" alt="GitHub Contribution Snake Light" width="100%" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/snake?username=your-username&palette=github-light" alt="GitHub Contribution Snake" width="100%" />
```

---

## Custom Snake Color

You can customize the color of the snake with `color_snake`:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/snake?username=hisham-pp&color_snake=%2338bdf8" alt="GitHub Contribution Snake Custom Color" width="100%" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/snake?username=your-username&color_snake=%2338bdf8" alt="GitHub Contribution Snake" width="100%" />
```

---

## Parameters

| Parameter           | Type     | Default       | Description                                                                           |
| ------------------- | -------- | ------------- | ------------------------------------------------------------------------------------- |
| `username`          | `string` | _Required_    | Your GitHub username                                                                  |
| `palette` / `theme` | `string` | `github-dark` | Color preset: `github-dark`, `github-light`, `github`, `gitlab-dark`, `codeberg-dark` |
| `color_snake`       | `string` | `purple`      | Hex or named color for the snake (e.g. `#38bdf8`, `orange`)                           |
| `color_dots`        | `string` | _5 colors_    | Comma-separated list of 5 colors from 0 to 4 contribution level                       |
| `color_background`  | `string` | `#0c1116`     | Background color of the SVG                                                           |
| `speed`             | `number` | `100`         | Step duration in milliseconds (lower = faster)                                        |
