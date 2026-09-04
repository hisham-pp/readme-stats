# Single Technology Badges (`/api/badge`)

> **View other styles:** [Badge Marquee](./badge-marquee.md) | [Single Icon](./icon.md) | [Icon Marquee](./icon-marquee.md) | [Available Brands](./brands.md)

Embed individual shields-style technology badges with official brand logos, titles, and custom scaling anywhere in your profile README or documentation.

---

## Live Examples

Query any of our **280+ supported technologies** by name or identifier:

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
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=postgresql" alt="PostgreSQL Badge" />
</p>

**Code snippet:**

```markdown
<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=react" alt="React" />
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=nextjs" alt="Next.js" />
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=typescript" alt="TypeScript" />
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=tailwindcss" alt="Tailwind" />
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=docker" alt="Docker" />
</p>
```

---

## Custom Badge Height (`height=...`)

Scale badges smoothly to fit your layout. Aspect ratios are automatically calculated and preserved:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=python&height=20" alt="Python 20px" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=python&height=24" alt="Python 24px" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=python&height=28" alt="Python 28px" />
  &nbsp;&nbsp;
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=python&height=32" alt="Python 32px" />
</p>

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=python&height=28" alt="Python" />
```

---

## Clickable Badges

Wrap any badge in a link to direct visitors to the official website or repository:

```markdown
<a href="https://react.dev">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=react" alt="React" />
</a>
<a href="https://www.typescriptlang.org">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/badge?name=typescript" alt="TypeScript" />
</a>
```

---

## Parameters

| Parameter | Type     | Default | Description                                                                      |
| --------- | -------- | ------- | -------------------------------------------------------------------------------- |
| `name`    | `string` | _Req_   | Technology name or identifier (e.g. `typescript`, `docker`). Alias: `tech`, `id` |
| `height`  | `number` | `20`    | Badge height in pixels (scales width proportionally)                             |
| `width`   | `number` | _Auto_  | Explicit badge width in pixels                                                   |
