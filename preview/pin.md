# Pinned Repository Card

> **View other styles:** [Badge Marquee](./badge-marquee.md) | [Top Languages](./top-langs.md) | [GitHub Streak](./streak.md) | [Contribution Snake](./snake.md)

Showcase your featured projects and repositories anywhere on GitHub or the web with real-time stargazers, forks, descriptions, and language detection.

Unlike native GitHub pinned repositories, this dynamic card can be embedded in any markdown document, supports custom themes, and can even override descriptions.

---

## Brand Theme (Default)

The default dark repository card with blue accents and high-contrast typography.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repo=next.js" alt="Pinned Repo Card Brand" />
</p>

**Code snippet:**

```markdown
<a href="https://github.com/username/repo">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo" alt="Pinned Repo" />
</a>
```

---

## Dark Theme (`theme=dark`)

Clean dark styling designed to match GitHub dark mode.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repo=next.js&theme=dark" alt="Pinned Repo Card Dark" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo&theme=dark" alt="Pinned Repo" />
```

---

## Light Theme (`theme=light`)

Crisp light theme for white and light-themed profile documentation.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repo=next.js&theme=light" alt="Pinned Repo Card Light" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo&theme=light" alt="Pinned Repo" />
```

---

## Transparent Theme (`theme=bg`)

Transparent background without card borders to blend smoothly with your README layout.

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repo=next.js&theme=bg" alt="Pinned Repo Card Transparent" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo&theme=bg" alt="Pinned Repo" />
```

---

## Show Owner (`show_owner=true`)

Prefixes the repository name with the owner's handle (e.g. `vercel/next.js`):

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repo=next.js&show_owner=true" alt="Pinned Repo Show Owner" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo&show_owner=true" alt="Pinned Repo" />
```

---

## Custom Description Override (`description=...`)

Need a tailored summary instead of the default repo description? Pass the `description` query parameter:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repo=next.js&description=Next.js%20is%20the%20leading%20React%20framework%20for%20building%20full%20stack%20web%20applications." alt="Pinned Repo Custom Description" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo&description=Custom%20description%20goes%20here" alt="Pinned Repo" />
```

---

## Multiple Repositories (Single SVG Grid)

Pass multiple repositories separated by commas using `repos=repo1,repo2` (or `repo=repo1,repo2`) to render an automated multi-card responsive SVG grid in a single image:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repos=next.js,turbo" alt="Multiple Pinned Repos Grid" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repos=next.js,turbo" alt="Pinned Repos" />
```

### 2x2 Grid (4 Repositories)

You can pass 4 repositories to create a neat 2x2 grid in a single SVG image:

<p align="center">
  <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repos=next.js,turbo,swc,hyper" alt="4 Pinned Repos Grid" />
</p>

**Code snippet:**

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repos=next.js,turbo,swc,hyper" alt="Pinned Repos Grid" />
```

### Cross-Owner Repositories

You can even mix repositories from different GitHub accounts or organizations by specifying `owner/repo`:

```markdown
<img src="https://readme-stats-theta-sepia.vercel.app/api/pin?repos=vercel/next.js,facebook/react,tailwindlabs/tailwindcss" alt="Featured Repos" />
```

---

## Clickable Multi-Card Grid in Markdown

If you want each card in your profile README to be **individually clickable** directly to its own GitHub repository (since SVGs rendered through `<img>` tags cannot have internal links), use standard Markdown side-by-side alignment:

### Side-by-Side (2 Columns)

<p align="center">
  <a href="https://github.com/vercel/next.js">
    <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repo=next.js" width="49%" alt="Next.js" />
  </a>
  <a href="https://github.com/vercel/turbo">
    <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=vercel&repo=turbo" width="49%" alt="Turbo" />
  </a>
</p>

**Code snippet:**

```markdown
<p align="center">
  <a href="https://github.com/username/repo-1">
    <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo-1" width="49%" alt="Repo 1" />
  </a>
  <a href="https://github.com/username/repo-2">
    <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo-2" width="49%" alt="Repo 2" />
  </a>
</p>
```

### 2x2 Grid (4 Clickable Cards)

```markdown
<p align="center">
  <a href="https://github.com/username/repo-1">
    <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo-1" width="49%" alt="Repo 1" />
  </a>
  <a href="https://github.com/username/repo-2">
    <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo-2" width="49%" alt="Repo 2" />
  </a>
  <br />
  <a href="https://github.com/username/repo-3">
    <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo-3" width="49%" alt="Repo 3" />
  </a>
  <a href="https://github.com/username/repo-4">
    <img src="https://readme-stats-theta-sepia.vercel.app/api/pin?username=username&repo=repo-4" width="49%" alt="Repo 4" />
  </a>
</p>
```

---

## Parameters

| Parameter     | Type      | Default    | Description                                                                    |
| ------------- | --------- | ---------- | ------------------------------------------------------------------------------ |
| `username`    | `string`  | _Required_ | GitHub username or organization name (alias: `owner`)                          |
| `repo`        | `string`  | _Required_ | GitHub repo name, or comma-separated list (e.g. `repo1,repo2`). Alias: `repos` |
| `cols`        | `number`  | `2`        | Number of columns for multi-repo grids (e.g. `1` or `2`)                       |
| `theme`       | `string`  | `brand`    | Color theme: `brand`, `dark`, `light`, or `bg`                                 |
| `show_owner`  | `boolean` | `false`    | When `true`, displays the repository heading as `owner/repo`                   |
| `description` | `string`  | _Auto_     | Custom description override for single-repo cards                              |
