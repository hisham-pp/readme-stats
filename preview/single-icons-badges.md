# Single Icons & Badges API

> **View other styles:** [Badge Marquee](./badge-marquee.md) | [Icon Marquee](./icon-marquee.md) | [Icon Rain](./icon-rain.md) | [Top Languages](./top-langs.md)

Embed individual technology icons or badges anywhere in your GitHub README, documentation, or website with high performance, customizable sizing, and multi-theme support.

---

## 1. Single Technology Icons (`/api/icon`)

Query any of our **280+ supported technologies** by name or identifier.

### Live Examples

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&size=48" alt="React" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=nextjs&size=48" alt="Next.js" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=typescript&size=48" alt="TypeScript" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=tailwindcss&size=48" alt="Tailwind CSS" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=python&size=48" alt="Python" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=docker&size=48" alt="Docker" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=postgresql&size=48" alt="PostgreSQL" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&size=48" alt="React" />
<img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=nextjs&size=48" alt="Next.js" />
<img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=typescript&size=48" alt="TypeScript" />
```

---

### Theme Presets (`theme=brand | dark | light | bg`)

Icons support 4 distinct theme styles:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&theme=brand&size=48" alt="Brand Theme" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&theme=dark&size=48" alt="Dark Theme" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&theme=light&size=48" alt="Light Theme" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&theme=bg&size=48" alt="BG Theme" />
</p>

```markdown
<!-- Brand color (Default) -->
<img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&theme=brand&size=48" alt="React Brand" />

<!-- Dark monochrome -->
<img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&theme=dark&size=48" alt="React Dark" />

<!-- Light monochrome -->
<img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&theme=light&size=48" alt="React Light" />

<!-- Circular background badge style -->
<img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&theme=bg&size=48" alt="React with Background" />
```

---

### Custom Sizing (`size=...`)

Set any pixel dimension with `size`:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=rust&size=24" alt="Rust 24px" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=rust&size=36" alt="Rust 36px" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=rust&size=48" alt="Rust 48px" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=rust&size=64" alt="Rust 64px" />
</p>

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=rust&size=64" alt="Rust" />
```

---

## 2. Single Technology Badges (`/api/badge`)

Render clean shields-style technology badges with brand logos and titles.

### Live Examples

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=react" alt="React Badge" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=nextjs" alt="Next.js Badge" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=typescript" alt="TypeScript Badge" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=tailwindcss" alt="Tailwind Badge" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=docker" alt="Docker Badge" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=react" alt="React" />
<img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=nextjs" alt="Next.js" />
<img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=typescript" alt="TypeScript" />
<img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=tailwindcss" alt="Tailwind" />
```

---

### Custom Badge Height (`height=...`)

Scale badges cleanly to match your typography or layout (aspect ratio is automatically preserved):

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=python&height=28" alt="Python Badge 28px" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=go&height=28" alt="Go Badge 28px" />
</p>

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=python&height=28" alt="Python" />
```

---

## Parameters

### `/api/icon`

| Parameter | Type     | Default | Description                                                                     |
| --------- | -------- | ------- | ------------------------------------------------------------------------------- |
| `name`    | `string` | _Req_   | Technology name or identifier (e.g. `react`, `nextjs`, `python`). Alias: `tech` |
| `theme`   | `string` | `brand` | Theme preset: `brand`, `dark`, `light`, or `bg`                                 |
| `size`    | `number` | _Auto_  | Icon width & height in pixels (e.g. `48`, `64`). Alias: `width`                 |

### `/api/badge`

| Parameter | Type     | Default | Description                                                                |
| --------- | -------- | ------- | -------------------------------------------------------------------------- |
| `name`    | `string` | _Req_   | Technology name or identifier (e.g. `typescript`, `docker`). Alias: `tech` |
| `height`  | `number` | `20`    | Badge height in pixels (scales width proportionally)                       |
| `width`   | `number` | _Auto_  | Explicit badge width in pixels                                             |
