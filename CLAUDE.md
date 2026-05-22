# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build (output to `dist/`)
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint over the repo (flat config in `eslint.config.js`)

There is no test runner configured.

## Stack

- React 19 + Vite 8 (JSX, not TypeScript)
- Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — utilities are loaded by the Vite plugin; `src/index.css` is where Tailwind is wired in)
- `react-router-dom` v7 for routing
- `papaparse` for CSV ingestion
- `recharts` for charts

## Architecture (load-bearing rules)

These come from `.claude/ARCHITECTURE.md` and the skill files under `.claude/skills/`. They shape every change:

1. **CSV is the single source of truth.** Data lives in `public/data/guest_reviews.csv` and is fetched/parsed client-side with papaparse. There is no backend, no API layer, and no database — do not introduce one.
2. **Business metrics must be deterministic.** Ratings, aggregates, filtering, scoring, and any number rendered in the UI must be computed in pure JS, not produced by AI. AI output is treated as untrusted input and may only assist with drafting/classification/summarization — never as the source of a number shown in the UI.
3. **Global state is reserved for shared filters and the reviews dataset.** Everything else (open/closed panels, hover, form drafts, etc.) stays local to the component. Don't lift state up unless multiple sibling views need it.
4. **Separation of concerns inside `src/`.** Keep data fetching, CSV parsing, derived-metric calculation, and UI rendering in distinct modules. React components stay presentation-focused; computations live in pure functions.

## CSV schema

`public/data/guest_reviews.csv` columns (in order):
`review_id, property_id, property_name, city, country, property_type, bedrooms, channel, guest_first_name, guest_country, stay_start_date, stay_end_date, nights, review_date, rating_overall, rating_cleanliness, rating_communication, rating_checkin, rating_accuracy, rating_location, rating_value, language, review_text, host_response, host_response_date`

Rating columns may be blank — treat missing ratings as absent, not zero, when averaging.

## Project state

`src/App.jsx` is still the default Vite + React starter. The dashboard itself has not been built yet, so most feature work starts from a blank slate against the architecture rules above rather than from existing components.

## Conventions

- PascalCase for component files and component names; camelCase for variables, functions, hooks, and utility exports.
- One responsibility per file. Split a component as soon as it starts mixing fetching, parsing, calculation, and rendering.
- Prefer composition over deep conditional nesting. Don't introduce an abstraction until it's reused or genuinely reduces complexity.
