# Contributing to Net Worth Tracker

Thanks for your interest in contributing! Please follow the guidelines below to help us maintain quality and consistency.

## Coding Standards
- TypeScript for all new code
- Async/await preferred over callbacks
- Meaningful names (Clean Code principles)
- Comprehensive error handling
- JSDoc for functions
- Lint/format before committing

## Tooling
- ESLint v9 (flat config) + typescript-eslint
- Prettier for formatting
- Run:
```
# Backend
cd backend
npm run lint
```

## Branch & PR Workflow
1. Create a feature branch from `main`:
   - `feature/<short-description>`
   - `fix/<short-description>`
2. Commit early and often (see commit convention)
3. Open a PR to `main` when ready
4. Request review and address feedback

## Commit Convention
Use conventional-style scopes when possible:
```
feat(auth): implement JWT login
fix(api): handle validation error on entries
chore(dev): update ESLint config
```

## PR Checklist
- [ ] Code compiles and runs locally
- [ ] Added/updated tests if applicable
- [ ] Linting and formatting pass
- [ ] Self-reviewed for readability and maintainability
- [ ] Updated docs (README/CONTRIBUTING) if needed

## Reporting Issues
Please include steps to reproduce, expected vs. actual behavior, and environment details.
