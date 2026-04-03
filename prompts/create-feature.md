# Create Feature Prompt

## Purpose

Use this prompt when creating a new feature module for the admin dashboard.

It is designed to keep new features aligned with the project’s:

- feature-first architecture
- API integration rules
- state management rules
- UI system
- documentation standards

This prompt should be used together with:

- `.ai/agent.md`
- `.ai/architecture.md`
- `.ai/code-style.md`
- `.ai/api-integration.md`
- `.ai/state-management.md`
- `.ai/ui-system.md`

---

## When To Use

Use this prompt when:

- a brand new feature is needed
- there is no existing feature to extend
- a module needs its initial structure
- the AI agent needs clear boundaries before generating code

Examples:

- categories
- brands
- products
- employees
- feedback
- compare
- dashboard overview sections

---

## Required Inputs

Before using this prompt, provide:

- feature name
- business purpose
- whether it has route pages
- whether it has list/detail/create/edit/delete flows
- the relevant API endpoints if known
- whether it needs shared client-side state
- any special UI or workflow requirements

---

## Prompt Text

You are creating a new feature for a React + TypeScript admin dashboard.

Follow these project rules exactly:

### Architecture
- The project uses a feature-first structure
- Create the feature under `src/features/<feature-name>/`
- Keep the feature self-contained
- Use only the folders that are actually needed
- Preferred feature folders are:
  - `api/`
  - `components/`
  - `hooks/`
  - `models/`
  - `pages/`
  - `utils/`
  - `store/` only if truly needed
- Do not invent a different folder structure for this feature

### Page Rules
- Route-level pages must stay thin
- Pages should focus on composition, not raw business logic
- Do not place raw API calls in pages
- Extract repeated or large UI sections into feature components

### API Rules
- Keep endpoint access inside feature `api/` files
- Use typed request and response shapes
- Use TanStack Query hooks for server state
- Centralize query keys if queries are needed
- Do not scatter ad-hoc fetch logic across components

### State Rules
- Server state belongs in TanStack Query
- Local UI state belongs in component state
- Zustand is allowed only if this feature truly needs shared client-side state
- Do not create a store unless there is a clear cross-component or cross-page need

### UI Rules
- The dashboard must stay simple, clean, modern, and consistent
- Reuse existing shared UI patterns where appropriate
- Do not create a visually different design language for this feature
- Keep tables, forms, cards, and actions aligned with the shared UI system

### Code Style
- Use TypeScript
- Use `kebab-case` file names
- Use `PascalCase` component names
- Use hook names starting with `use`
- Keep files focused and readable
- Avoid `any`

### Documentation
- If this feature introduces a reusable new pattern, mention which `.ai` docs should be updated
- Do not invent undocumented project-wide conventions silently

Now create the feature structure and the initial recommended files for this feature.

For the output:
1. show the proposed folder structure
2. explain the role of each file briefly
3. identify which files are required immediately vs optional later
4. call out any important implementation decisions
5. mention any follow-up docs that should be updated if the feature introduces a new reusable pattern

Feature name:
[INSERT FEATURE NAME]

Feature purpose:
[INSERT FEATURE PURPOSE]

Route pages needed:
[INSERT YES/NO AND WHICH PAGES]

Expected flows:
[INSERT LIST / DETAIL / CREATE / EDIT / DELETE / OTHER]

Known API context:
[INSERT API DETAILS OR "NOT FINALIZED YET"]

Shared client-side state needed:
[INSERT YES/NO/UNSURE]

Special notes:
[INSERT EXTRA CONTEXT]