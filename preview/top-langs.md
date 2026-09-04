# Top Languages Stats

> **View other styles:** [Badge Marquee](./badge-marquee.md) | [Icon Marquee](./icon-marquee.md) | [Icon Background Marquee](./iconbg-marquee.md)

Showcase your most-used GitHub languages using dedicated endpoints for each layout. Instead of standard colored dots, you can use your custom tech icons or full shiny badges!

## Badge Style (`/api/top-langs/badge`)

Swaps the standard text legend for full tech badges, creating a wider and highly stylized stat card.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/badge?username=hisham-pp" alt="Top Languages Badges" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/badge?username=your-username" alt="Top Languages Badges" />
```

---

## Icon Style (`/api/top-langs/icon`)

Replaces the default colored dots with beautifully detailed tech icons from your configuration.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/icon?username=hisham-pp" alt="Top Languages Icons" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/icon?username=your-username" alt="Top Languages Icons" />
```

---

## Default Style (`/api/top-langs`)

The standard GitHub Readme Stats layout with colored language dots.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=hisham-pp" alt="Top Languages Default" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs?username=your-username" alt="Top Languages" />
```

---

## Treemap Style (`/api/top-langs/treemap`)

Renders a squarified treemap proportional to each language's percentage.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/treemap?username=hisham-pp" alt="Top Languages Treemap" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/top-langs/treemap?username=your-username" alt="Top Languages Treemap" />
```

---

## Parameters

| Parameter  | Type     | Default    | Description                                                                                    |
| ---------- | -------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `username` | `string` | _Required_ | GitHub username to fetch top languages for                                                     |
| `type`     | `string` | `default`  | Layout style: `default` (dots), `badge`, `icon`, `treemap`, `treemap-badge`, or `treemap-icon` |
| `theme`    | `string` | `brand`    | Color palette for badges/icons: `brand`, `dark`, `light`, or `bg`                              |
