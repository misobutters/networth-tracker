# Net Worth Tracker

A user-friendly and customizable application to track personal net worth over time. Users can define asset and liability categories, manually enter data, and visualize trends via interactive charts.

## Features (from PRD)
- User-defined categories for assets and liabilities
- Manual data entry (amount + date) per category
- Interactive dashboard with:
  - Current net worth
  - Historical trend (line chart)
  - Breakdown charts (assets/liabilities by category)
  - Custom date range filters
- Secure data persistence

## Repository Structure
```
/ (repo root)
├─ backend/              # Express + TypeScript backend
├─ my-apptest/           # Next.js frontend
├─ .taskmaster/          # Taskmaster tasks, docs, reports
└─ README.md
```

## Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Frontend (Next.js)
```
cd my-apptest
npm install
npm run dev
```
App runs at http://localhost:3000.

### Backend (Express + TypeScript)
```
cd backend
npm install
npm run dev      # dev (tsx)
# or build & run
npm run build
npm start
```
API runs at http://localhost:5000.

## Common Scripts
- Backend:
  - `npm run dev` — start TS dev server with tsx
  - `npm run build` — compile TypeScript
  - `npm start` — run compiled server
  - `npm run lint` — lint TypeScript files

## Linting & Formatting
- ESLint v9 (flat config) with `typescript-eslint`
- Prettier for formatting
- Backend config files: `backend/eslint.config.js`, `backend/.prettierrc.json`

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).

## License
MIT (update as appropriate).
