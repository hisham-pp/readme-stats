# AGENTS

This directory contains the `readme-stats` Next.js project, which generates GitHub profile stats, top-language cards, and themed SVG assets for README usage.

## Project conventions
- Keep changes focused on the feature or fix being requested.
- Prefer small, targeted edits over broad refactors.
- Preserve the current structure under `src/app/`, `src/components/`, `src/config/`, `src/lib/`, `src/services/`, and `src/templates/`.
- Avoid introducing unnecessary dependencies or new patterns for small changes.
- If you modify icon, badge, or tech metadata, keep the source data and any generated output in sync.

## App-specific notes
- This project is configured for pnpm and Next.js.
- Run commands from this directory: `pnpm install`, `pnpm dev`, `pnpm lint`, and related checks.
- The public assets and generated bundles are part of the app output; do not break the image-generation pipeline.
- When changing routes or API behavior, keep the README examples and generated outputs aligned with the reality of the app.

## Quality bar
- Read the relevant file before editing it.
- Follow the user’s instructions exactly.
- Validate with the smallest relevant command before finishing.
- Do not claim success without fresh verification output.
- If a task is ambiguous, ask clarifying questions instead of guessing.

## General instructions for AI agents
- Make only the changes required for the task.
- Keep diffs limited to the relevant files.
- Summarize the outcome clearly when done.
