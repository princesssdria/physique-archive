# Physique Archive

Physique Archive is a Next.js 15 MVP for discovering workout routines and muscle focus areas inspired by celebrity physiques from specific eras. The app intentionally frames every profile as inspiration-based: similar physique focus, similar muscle emphasis, and similar training style.

## Folder Structure

- `app/` contains App Router pages for the homepage, explore filters, search, muscle map, and dynamic celebrity profiles.
- `components/` contains reusable UI pieces such as cards, filters, search, motion wrappers, tags, and the interactive muscle map.
- `data/celebrities.ts` is the Version 1 local mock archive with 30 celebrity-era records.
- `lib/archive.ts` contains the data access helpers for filtering, keyword search, recommendations, and muscle lookups.
- `app/globals.css` and `tailwind.config.ts` define the dark premium fitness visual system.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

To verify production output:

```bash
npm run build
```

## Expanding Later

The mock data layer is deliberately centralized. To move to a real database later:

1. Keep the `Celebrity` shape as the first schema contract.
2. Move records from `data/celebrities.ts` into a `celebrities` table or collection.
3. Replace functions in `lib/archive.ts` with database queries.
4. Add indexes for `slug`, `decade`, `gender`, `physiqueTags`, `muscleFocus`, `trainingStyle`, and `searchKeywords`.
5. Add authentication and persist favorites per user instead of using local storage.
