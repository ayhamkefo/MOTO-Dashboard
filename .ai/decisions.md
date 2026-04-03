# Shared Decisions

## Purpose

This file records shared technical and architectural decisions that should remain visible as the project grows.

Its role is to prevent the team and the AI agent from repeating the same decisions, drifting into inconsistent patterns, or forgetting why a rule exists.

Only decisions that affect more than one task or more than one feature belong here.

---

## Entry Template

### YYYY-MM-DD - Short title

- Context:
- Decision:
- Consequence:
- Docs to revisit:

---

## Current Decisions

### 2026-04-03 - React dashboard uses a feature-first structure

- Context:
  The admin dashboard will contain multiple CRUD-heavy modules such as categories, brands, products, employees, feedback, and overview pages. A stable structure is needed so both human contributors and AI agents can build consistently.

- Decision:
  The project will use a feature-first structure organized around `src/app`, `src/shared`, and `src/features`, with each feature owning its own pages, hooks, components, API files, models, and optional local utilities or store files.

- Consequence:
  New code should be added by feature, not by broad technical layer across the whole app. Contributors should not invent different folder structures per module.

- Docs to revisit:
  `.ai/architecture.md`, `README.md`

### 2026-04-03 - The dashboard will not use heavy Clean Architecture

- Context:
  The user has experience with layered Flutter architecture, but this project is a React admin dashboard where heavy architectural layering would likely slow delivery and create unnecessary complexity for common CRUD workflows.

- Decision:
  The project will use a practical lighter architecture instead of full enterprise Clean Architecture. Hooks will act as lightweight ViewModels, pages will stay thin, and API access will remain isolated without forcing unnecessary repository or use-case layers for every feature.

- Consequence:
  The codebase should stay structured and scalable, but contributors should avoid introducing extra architectural layers unless a real need emerges.

- Docs to revisit:
  `.ai/architecture.md`, `.ai/agent.md`

### 2026-04-03 - TanStack Query is the source of truth for server state

- Context:
  The dashboard is highly server-driven, with lists, filters, details, mutations, and refreshable admin data. A stable strategy is needed for server state, caching, and invalidation.

- Decision:
  TanStack Query is the default and preferred tool for all server state, including queries, mutations, caching, invalidation, and stale-data management.

- Consequence:
  Server data should not be primarily stored in Zustand or scattered through manual local state patterns. Query and mutation hooks are the standard UI-facing integration layer for backend data.

- Docs to revisit:
  `.ai/state-management.md`, `.ai/api-integration.md`

### 2026-04-03 - Zustand is restricted to minimal shared client state

- Context:
  React dashboards can easily become messy when global state is overused for data that does not need to be global.

- Decision:
  Zustand may be used only for small focused pieces of shared client-side state, such as UI preferences, sidebar collapse, or compare selection when cross-page sharing is justified.

- Consequence:
  Contributors should not use Zustand as a second backend cache or as the default place for routine list or detail data.

- Docs to revisit:
  `.ai/state-management.md`

### 2026-04-03 - Hooks are the lightweight ViewModel boundary

- Context:
  The project needs a React-friendly equivalent to the user’s familiar mobile architecture concepts without forcing Cubit-style or repository-heavy patterns.

- Decision:
  Feature hooks will act as the lightweight ViewModel layer. They should coordinate query and mutation behavior, expose UI-friendly state, and keep route pages thin.

- Consequence:
  Pages should not grow into logic-heavy files, and data orchestration should not be duplicated across multiple screens.

- Docs to revisit:
  `.ai/architecture.md`, `.ai/code-style.md`

### 2026-04-03 - Route pages must stay thin

- Context:
  CRUD dashboards often become difficult to maintain when page files mix layout, table definitions, filters, business logic, mutation handling, and API calls in one place.

- Decision:
  Route-level page files should focus on composition, hook usage, and page-level structure only. Heavy logic, data orchestration, and repeated behavior belong in hooks, feature components, or feature-local utilities.

- Consequence:
  Oversized page files are considered architecture drift and should be refactored when they begin mixing too many concerns.

- Docs to revisit:
  `.ai/architecture.md`, `.ai/code-style.md`

### 2026-04-03 - API access stays inside feature API files and hooks

- Context:
  Uncontrolled API access quickly leads to inconsistent error handling, duplicated fetch logic, and pages that are hard to maintain.

- Decision:
  Raw endpoint access must live inside feature `api/` files using the shared API client. Pages and components should access backend data through query and mutation hooks, not direct Axios calls.

- Consequence:
  New features should not introduce page-level API logic or ad-hoc fetch patterns.

- Docs to revisit:
  `.ai/api-integration.md`, `.ai/code-style.md`

### 2026-04-03 - The dashboard UI must be simple, clean, and consistent

- Context:
  The project currently has no final design files, but the AI agent will be used heavily for implementation. Without clear rules, the UI could become visually inconsistent from page to page.

- Decision:
  The dashboard will follow a restrained, modern, low-noise visual system. The AI agent may choose the exact visual implementation inside that system, but must not redesign the visual language per page or per feature.

- Consequence:
  Shared layout, spacing, tables, forms, cards, and state patterns must become stable and reusable. Visual novelty is less important than product consistency.

- Docs to revisit:
  `.ai/ui-system.md`, `.ai/agent.md`

### 2026-04-03 - Shared documentation updates are part of implementation done

- Context:
  This project depends on internal documentation to keep AI-assisted work consistent over time.

- Decision:
  When shared architecture, API, UI, workflow, or state patterns change, the corresponding `.ai/` documentation must be updated as part of the same task.

- Consequence:
  Contributors should not treat documentation as optional cleanup. The docs are part of the operating system of the project.

- Docs to revisit:
  `.ai/documentation-maintenance.md`, `.ai/README.md`

### 2026-04-03 - Shared code moves to `shared/` only when reuse is real

- Context:
  Many projects become harder to understand when code is moved into shared folders too early, before its reuse pattern is actually stable.

- Decision:
  Code should remain feature-local unless it is already reused, clearly generic, or part of the global UI or infrastructure system.

- Consequence:
  Contributors should prefer local clarity over premature abstraction and should not move feature-specific business logic into `shared/` just because it might become reusable later.

- Docs to revisit:
  `.ai/architecture.md`, `.ai/code-style.md`

### 2026-04-03 - React Hook Form and Zod are the default form stack

- Context:
  The dashboard includes many admin forms for CRUD operations, and these forms need consistent validation and submission handling.

- Decision:
  React Hook Form and Zod are the default stack for non-trivial forms across the dashboard.

- Consequence:
  Large forms should not be recreated with loose manual `useState` patterns unless the form is truly trivial.

- Docs to revisit:
  `.ai/code-style.md`, `.ai/state-management.md`

### 2026-04-03 - Query keys must stay centralized and predictable

- Context:
  CRUD-heavy dashboards depend on reliable query invalidation and caching. Random query key strings create fragile behavior.

- Decision:
  Query keys should be organized by feature, centralized, and expressed through consistent key factories.

- Consequence:
  Contributors should not scatter string query keys throughout components or invent different naming conventions from one feature to another.

- Docs to revisit:
  `.ai/api-integration.md`

---

## Maintenance Rule

When a new decision changes how more than one future task should be done, add it here.

If a decision becomes outdated, update it instead of allowing the docs to drift into conflicting rules.