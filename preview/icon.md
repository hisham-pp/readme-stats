# Single Technology Icons (`/api/icon`)

> **View other styles:** [Badge Marquee](./badge-marquee.md) | [Icon Marquee](./icon-marquee.md) | [Icon Background Marquee](./iconbg-marquee.md) | [Single Badge](./badge.md) | [Icon Rain](./icon-rain.md)

Embed individual technology icons anywhere in your GitHub README, documentation, or website with high performance, customizable sizing, and multi-theme support.

---

## Live Examples

Query any of our **280+ supported technologies** by name or identifier:

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
<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=react&size=48" alt="React" />
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=nextjs&size=48" alt="Next.js" />
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=typescript&size=48" alt="TypeScript" />
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=tailwindcss&size=48" alt="Tailwind CSS" />
  <img src="https://readme-stats-theta-sepia.vercel.app/api/icon?name=python&size=48" alt="Python" />
</p>
```

---

## Theme Presets (`theme=brand | dark | light | bg`)

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

## Custom Sizing (`size=...`)

Set any custom pixel dimension with `size`:

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

## Parameters

| Parameter | Type     | Default | Description                                                                     |
| --------- | -------- | ------- | ------------------------------------------------------------------------------- |
| `name`    | `string` | _Req_   | Technology name or identifier (e.g. `react`, `python`, `docker`). Alias: `tech` |
| `theme`   | `string` | `brand` | Theme preset: `brand`, `dark`, `light`, or `bg`                                 |
| `size`    | `number` | `48`    | Icon width & height in pixels (e.g. `24`, `48`, `64`). Alias: `width`           |
