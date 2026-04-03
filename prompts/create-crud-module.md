
## `prompts/create-crud-module.md`

```md
# Create CRUD Module Prompt

## Purpose

Use this prompt when creating a CRUD-heavy admin module for the dashboard.

This includes modules such as:

- categories
- brands
- products
- employees
- feedback management
- similar list/create/edit/delete admin workflows

The prompt is designed to produce a module that is:

- scalable
- typed
- API-driven
- visually consistent
- aligned with the dashboard architecture

---

## When To Use

Use this prompt when a feature includes one or more of the following:

- list page
- create flow
- edit flow
- delete or archive flow
- row-level actions
- table filters
- search
- pagination
- form validation

---

## Required Inputs

Before using this prompt, provide:

- module name
- main entity name
- available CRUD operations
- known endpoints
- list filters
- whether the flow uses pages, modals, or drawers
- whether the module has detail view
- important business rules or constraints

---

## Prompt Text

You are creating a CRUD module for a React + TypeScript admin dashboard.

Follow these project rules exactly:

### Architecture
- Use the existing feature-first project structure
- Place the module under `src/features/<module-name>/`
- Keep the module self-contained
- Use the standard feature folders when needed:
  - `api/`
  - `components/`
  - `hooks/`
  - `models/`
  - `pages/`
  - `utils/`
  - `store/` only if clearly needed
- Do not invent a different architecture for this module

### CRUD Structure
The module should be designed around these concerns where relevant:
- list
- create
- edit
- delete or archive
- detail view if needed
- filters
- pagination
- row actions
- form validation

### List Page Rules
- The list page must stay thin
- It should compose:
  - page header
  - page actions
  - filters/search bar
  - table section
  - pagination if needed
- Do not put raw endpoint calls in the page
- Use query hooks for data
- Keep loading, empty, and error states consistent with the dashboard system

### Table Rules
- Keep the table aligned with the shared dashboard table pattern
- Use one predictable row actions pattern
- Keep actions compact
- Do not overcrowd the table UI
- Use status badges consistently where relevant

### Form Rules
- Use React Hook Form + Zod for non-trivial forms
- Keep labels, spacing, actions, and validation messages consistent
- Group related fields logically
- Keep create and edit form structure reusable when possible
- Distinguish destructive actions visually from save actions

### API Rules
- Keep endpoint access inside feature `api/` files
- Use typed request and response shapes
- Create centralized query keys
- Use query hooks for reads
- Use mutation hooks for writes
- Invalidate relevant list/detail queries intentionally after mutations
- Do not use direct Axios calls in pages or presentational components

### State Rules
- Server state belongs in TanStack Query
- Form state belongs in React Hook Form
- Local UI state belongs in component state
- Zustand is allowed only if the module has real shared client-side state beyond normal CRUD needs

### UI Rules
- The dashboard UI must remain simple, clean, modern, and consistent
- Reuse the shared layout and visual patterns
- Do not create a new design language for this module
- Keep cards, filters, buttons, forms, and tables visually aligned with the rest of the dashboard

### Code Style
- Use TypeScript
- Use `kebab-case` file names
- Use `PascalCase` component names
- Use hook names starting with `use`
- Keep files focused and readable
- Avoid `any`

### Documentation
- If the module introduces a reusable new CRUD pattern, say which `.ai` docs should be updated
- Do not silently invent new project-wide conventions

Now create the recommended CRUD module structure and initial implementation plan.

For the output:
1. show the proposed folder structure
2. list the key files to create first
3. explain the responsibility of each file briefly
4. identify reusable pieces such as table, form, row actions, and status badge components
5. call out query keys, query hooks, and mutation hooks that should exist
6. mention whether create/edit should be separate pages or one reusable form flow
7. mention any docs that should be updated if a reusable pattern is introduced

Module name:
[INSERT MODULE NAME]

Main entity:
[INSERT ENTITY NAME]

Available CRUD operations:
[INSERT CREATE / READ / UPDATE / DELETE / ARCHIVE / TOGGLE / OTHER]

Known endpoints:
[INSERT ENDPOINTS OR "NOT FINALIZED YET"]

List filters:
[INSERT FILTERS OR "NONE YET"]

UI flow choice:
[INSERT PAGE / MODAL / DRAWER / MIXED]

Detail view needed:
[INSERT YES/NO]

Important business rules:
[INSERT RULES]