# GitHub Contribution Activity Graph

> **View other styles:** [Streak Stats](./streak.md) | [Top Languages](./top-langs.md) | [Contribution Snake](./snake.md) | [Badge Marquee](./badge-marquee.md)

Display an ultra-smooth Bézier curve area chart of your GitHub contribution activity over the past year (or custom timeframes). Shows your **Total Contributions**, **Weekly Average**, **Peak Day** count, timeline month labels, and subtle gridlines.

---

## Brand Theme (Default)

The signature dark card with bright cyan-to-indigo glowing Bézier curve and gradient area fill.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=hisham-pp" alt="Activity Graph Brand" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=your-username" alt="Activity Graph" />
```

---

## Dark Theme (`theme=dark`)

GitHub dark mode aesthetic matching GitHub's default palette.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=hisham-pp&theme=dark" alt="Activity Graph Dark" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=your-username&theme=dark" alt="Activity Graph" />
```

---

## Matrix Theme (`theme=matrix`)

Cyberpunk neon green line and gridlines on deep terminal background.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=hisham-pp&theme=matrix" alt="Activity Graph Matrix" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=your-username&theme=matrix" alt="Activity Graph" />
```

---

## Dracula Theme (`theme=dracula`)

Famous Dracula pastel palette with hot pink curve and purple accents.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=hisham-pp&theme=dracula" alt="Activity Graph Dracula" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=your-username&theme=dracula" alt="Activity Graph" />
```

---

## Monokai Theme (`theme=monokai`)

Classic Monokai dark slate background with amber and green highlights.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=hisham-pp&theme=monokai" alt="Activity Graph Monokai" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=your-username&theme=monokai" alt="Activity Graph" />
```

---

## Light Theme (`theme=light`)

High-contrast crisp light theme designed for light profile backgrounds.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=hisham-pp&theme=light" alt="Activity Graph Light" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=your-username&theme=light" alt="Activity Graph" />
```

---

## Transparent Theme (`theme=transparent` or `theme=bg`)

Seamless transparent background with no outer border, blending smoothly into custom README profile layouts. Supports both `theme=transparent` and `theme=bg`.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=hisham-pp&theme=transparent" alt="Activity Graph Transparent" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=your-username&theme=transparent" alt="Activity Graph" />
```

---

## Custom Line & Area Colors

Customize curve line color and gradient fill:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=hisham-pp&line_color=%23ec4899&area_color=%23ec4899" alt="Activity Graph Pink" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/activity-graph?username=your-username&line_color=%23ec4899&area_color=%23ec4899" alt="Activity Graph" />
```

---

## Parameters

| Parameter      | Type      | Default         | Description                                                                           |
| -------------- | --------- | --------------- | ------------------------------------------------------------------------------------- |
| `username`     | `string`  | _Required_      | GitHub username (aliases: `user`, `login`)                                            |
| `theme`        | `string`  | `brand`         | Preset: `brand`, `dark`, `matrix`, `dracula`, `monokai`, `light`, `transparent`, `bg` |
| `days`         | `number`  | `365`           | Number of days of historical activity (e.g. `30`, `90`, `365`)                        |
| `line_color`   | `string`  | _Theme default_ | Custom stroke hex color (URL-encoded e.g. `%23ec4899`)                                |
| `area_color`   | `string`  | _Line color_    | Custom gradient fill hex color                                                        |
| `hide_title`   | `boolean` | `false`         | When `true`, hides the title header                                                   |
| `hide_metrics` | `boolean` | `false`         | When `true`, hides the top metric badges (Total, Weekly Avg, Peak)                    |
