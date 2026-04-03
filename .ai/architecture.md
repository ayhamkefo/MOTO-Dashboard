# Architecture Guide

## Overview

This project uses a practical feature-first architecture optimized for:

- admin dashboards
- CRUD-heavy systems
- server-driven interfaces
- AI-assisted development
- long-term maintainability

This project is not using heavy enterprise Clean Architecture.

Instead, it uses a lighter structure that keeps code organized without creating unnecessary layers.

The architecture must stay:

- predictable
- scalable
- easy to follow
- easy to extend
- easy for AI agents to implement consistently

---

## High-Level Structure

The source code should follow this shape:

    src/
    ├── app/
    ├── shared/
    └── features/

---

## `app/`

The `app/` layer contains application-level setup and composition.

Typical responsibilities include:

- app bootstrap
- providers
- router setup
- layouts
- theme setup
- query client setup
- app config
- navigation shell
- top-level guards if needed

Examples:

    src/app/
    ├── providers/
    ├── router/
    ├── layouts/
    ├── theme/
    ├── config/
    └── main/

Rules:

- `app/` is for global application wiring
- do not place feature business logic here
- do not place feature-specific API code here
- do not let `app/` become a dumping ground for unrelated code

---

## `shared/`

The `shared/` layer contains reusable cross-feature code.

Typical responsibilities include:

- reusable UI components
- API client setup
- constants
- generic hooks
- utility functions
- shared types
- validation helpers
- status badges
- loading, empty, and error states
- table primitives
- form primitives
- shared styling tokens

Examples:

    src/shared/
    ├── api/
    ├── components/
    ├── constants/
    ├── hooks/
    ├── lib/
    ├── styles/
    ├── types/
    ├── utils/
    └── schemas/

Rules:

- only truly reusable code belongs in `shared/`
- do not move feature-specific logic into `shared/` too early
- code should become shared only when reuse is real or clearly imminent
- shared code must stay generic and not depend on a single feature’s business rules

---

## `features/`

The `features/` layer contains the business modules of the dashboard.

Each feature should be self-contained and should own its own pages, components, logic, and API integration.

Examples:

    src/features/
    ├── auth/
    ├── dashboard/
    ├── categories/
    ├── brands/
    ├── products/
    ├── employees/
    ├── feedback/
    └── compare/

Each feature should follow a consistent internal structure.

Suggested feature structure:

    src/features/<feature>/
    ├── api/
    ├── components/
    ├── hooks/
    ├── models/
    ├── pages/
    ├── utils/
    └── store/      # optional, only if truly needed

---

## Feature Layer Responsibilities

### `pages/`

`pages/` contains route-level page components.

Responsibilities:

- page composition
- layout composition
- hook usage
- passing props into feature components
- defining page-level actions and sections

Rules:

- pages should stay thin
- pages should not contain raw API code
- pages should not contain large amounts of business logic
- pages should primarily coordinate UI composition

### `components/`

`components/` contains feature-specific UI pieces.

Responsibilities:

- feature-local reusable UI
- table sections
- form sections
- cards
- dialogs
- action bars
- feature-specific visual pieces

Rules:

- keep components focused
- extract repeated UI from pages into components
- prefer feature-local components before moving things into `shared/`

### `hooks/`

`hooks/` is the main logic layer for features.

These hooks act like lightweight ViewModels.

Responsibilities:

- fetching server data
- performing mutations
- coordinating UI-facing logic
- exposing derived values for the page
- transforming raw query data into page-friendly shapes when needed

Rules:

- hooks should contain feature behavior, not page layout
- prefer query and mutation hooks over ad-hoc fetch patterns
- hooks should help keep pages thin and readable

### `api/`

`api/` contains feature API access code.

Responsibilities:

- endpoint calls
- request building
- response typing
- integration with shared API client
- feature query keys if needed

Rules:

- API code must not live in page files
- API code must not live in presentational components
- API functions should stay focused on data access
- API functions should not own view logic

### `models/`

`models/` contains feature-level types and data structures.

Responsibilities:

- request types
- response types
- domain-friendly feature types
- schemas and validation-related types if feature-local

Rules:

- keep request and response shapes explicit
- prefer clear typed contracts
- avoid vague untyped objects
- avoid scattered ad-hoc types across page files

### `utils/`

`utils/` contains feature-local helpers.

Examples:

- table column builders
- format helpers specific to the feature
- transformation helpers that are too small to justify their own larger abstraction

Rules:

- keep utilities feature-local unless they are genuinely reusable
- do not place major business logic here if hooks are the correct home

### `store/` (optional)

`store/` contains Zustand stores only when shared client-side state is actually needed across multiple components or pages.

Examples:

- compare selection state shared across screens
- persistent sidebar preferences if feature-owned
- cross-page temporary UI state that does not belong in server state

Rules:

- do not create a store by default
- do not use a store for simple component state
- do not move server state into Zustand when React Query is the correct tool

---

## Data Flow

The default feature data flow should look like this:

1. A page renders
2. The page calls one or more feature hooks
3. Hooks use TanStack Query queries or mutations
4. Query and mutation functions use the feature API layer
5. The feature API layer uses the shared API client
6. The page receives typed, UI-ready state

This keeps responsibilities clear and avoids page-level data chaos.

---

## Dependency Direction Rules

Allowed dependency direction:

- pages may depend on hooks, components, models, and shared code
- components may depend on hooks only when the pattern is intentional and local
- hooks may depend on feature API, models, and shared utilities
- feature API may depend on the shared API client and shared helpers
- shared code must not depend on feature internals
- one feature should not depend carelessly on another feature’s internals

Forbidden patterns:

- pages calling Axios directly
- pages calling raw endpoint URLs directly
- leaf components calling APIs directly without a deliberate documented pattern
- shared code importing business logic from a specific feature
- random cross-feature imports that couple unrelated modules

---

## Reuse Rules

Move code to `shared/` only when one or more of these are true:

- it is already used in multiple features
- it is clearly generic and reusable
- it defines a shared UI system building block
- it is part of the global app shell or infrastructure

Keep code feature-local when:

- it is only used in one feature
- it contains feature-specific business language
- it contains feature-specific behavior
- reuse is still speculative

Premature sharing creates weak abstractions. Prefer local clarity until reuse is real.

---

## When To Create New Abstractions

Create a new abstraction when:

- logic repeats
- a pattern becomes stable
- multiple features need the same solution
- the abstraction reduces duplication without hiding intent

Do not create an abstraction when:

- the code is only used once
- the abstraction makes the code harder to follow
- the pattern is still unstable
- the problem is too small to justify another layer

The architecture should stay intentional, not abstract for its own sake.

---

## Architecture Violations To Avoid

Avoid the following:

- API calls inside route pages
- API calls scattered in visual components
- giant page files mixing layout, data access, and business behavior
- duplicated table setups across features without shared patterns
- duplicated form patterns across features without shared patterns
- random folder structures depending on the author or task
- overuse of global state
- moving feature-specific business code into `shared/`
- building a new architecture pattern inside one feature without documenting it

---

## Project Goal

The architecture should help the team and the AI agent build the dashboard in a way that is:

- clean
- consistent
- scalable
- easy to extend
- easy to understand later

The project should grow by extending a stable system, not by accumulating unrelated local decisions.