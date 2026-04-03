# State Management Guide

## Purpose

This file defines where state belongs in the admin dashboard and how it should be managed.

Its goal is to prevent state management from becoming messy, over-globalized, or inconsistent.

The most important rule is this:

Separate server state from UI state.

---

## Core Principle

Not all state is the same.

The project must distinguish between:

- server state
- local UI state
- shared client-side UI state
- form state

Using the wrong tool for the wrong kind of state creates unnecessary complexity.

---

## State Layers

### 1. Server State

Server state is data that comes from the backend and may become stale.

Examples:

- products list
- product details
- categories list
- brands list
- employees list
- feedback list
- dashboard stats
- system status
- pagination results
- filtered search results

Use:

- TanStack Query

Do not use Zustand or plain component state as the main source of truth for server data.

---

### 2. Local UI State

Local UI state is temporary state that only matters to one component or one page section.

Examples:

- modal open/close
- drawer open/close
- active tab
- local search input before apply
- row expansion
- selected view mode
- confirmation dialog state
- local table density toggle if not shared
- temporary inline edit state

Use:

- component state
- `useState`
- `useReducer` if local complexity becomes high

Do not move this into global state unless multiple distant parts of the app truly need it.

---

### 3. Shared Client-Side UI State

Shared client-side state is state that is not server data but must be shared across multiple parts of the app.

Examples:

- collapsed sidebar state
- persisted dashboard UI preferences
- product compare selection shared across pages
- small session-adjacent UI flags
- globally reused filter draft only if it truly spans multiple screens

Use:

- Zustand

Rules:

- keep stores small
- keep stores focused
- avoid turning Zustand into a second backend cache
- do not use Zustand for routine CRUD list data that belongs in TanStack Query

---

### 4. Form State

Form state is special and should be handled with the form system.

Examples:

- create product form
- update product form
- create employee form
- category form
- login form

Use:

- React Hook Form
- Zod for validation

Do not manually recreate complex form state with many `useState` fields unless the form is extremely trivial.

---

## TanStack Query Rules

TanStack Query is the default tool for server state.

Use it for:

- fetching lists
- fetching details
- filtering and sorting results from the backend
- create, update, delete mutations
- refresh actions
- background refetching where appropriate
- invalidation after write actions

Examples:

- `useProductsQuery`
- `useProductQuery`
- `useCategoriesQuery`
- `useDashboardStatsQuery`
- `useCreateProductMutation`

Rules:

- server state belongs in query hooks
- query keys must be stable and documented
- query parameters that affect results must be reflected in the query key
- mutation side effects must invalidate or update relevant queries intentionally
- do not copy query data into Zustand unless there is a very strong documented reason

---

## Local Component State Rules

Use local state for UI behavior that is local and temporary.

Good uses:

- whether a modal is open
- currently edited inline row id
- current accordion expansion
- local input draft before submitting a filter
- temporary selected card index
- current delete confirmation target inside one page component

Rules:

- prefer local state by default for local UI concerns
- do not create a global store for small page-local state
- do not store server-derived lists in local state unless creating an intentional derived view
- avoid unnecessary duplication of server data in local state

---

## Zustand Rules

Zustand is optional and must stay minimal.

Use it only when:

- multiple parts of the app need the same client-side state
- the state is not server state
- the state would otherwise be awkward to prop-drill
- the state has value across route boundaries or distant components

Good examples:

- compare-selected products
- layout/sidebar collapsed state
- persistent dashboard display preferences
- maybe global quick filter draft if the product really needs it

Bad examples:

- storing products list fetched from the backend
- storing categories fetched from the backend
- duplicating paginated list responses
- using Zustand as a replacement for query hooks
- putting every modal state into one app-wide store

Rules:

- one store should have one clear purpose
- keep store APIs small
- avoid mega-stores
- keep server data out of Zustand unless explicitly justified and documented

---

## React Hook Form Rules

Use React Hook Form for non-trivial forms.

Use Zod for schema-based validation.

Rules:

- validation should be explicit
- schema names should be clear
- submit handling should stay clean
- field registration should stay organized
- default values should be deliberate
- form submit side effects should connect cleanly with mutation hooks

Avoid large uncontrolled manual form logic using many local state fields for forms that are meant to scale.

---

## Filter State Rules

List filters are common in dashboards, so they must be handled clearly.

There are usually two kinds of filter state:

### 1. Applied Filters

Applied filters affect the backend query result.

Examples:

- selected category
- selected brand
- status filter
- page
- page size
- sort order
- committed search query

These should be reflected in:

- typed params
- query keys
- query hook input

### 2. Draft Filters

Draft filters are temporary UI input values not yet applied.

Examples:

- typing in the search field before pressing search
- selecting values in a filter drawer before apply

These can live in:

- component state
- form state
- a small feature-level UI state if needed

Do not confuse draft state with applied query state.

---

## Selection State Rules

Selection state is common in tables.

Examples:

- selected rows
- selected compare products
- selected feedback items
- selected employees for batch actions

Rules:

- if selection is only needed inside one table view, keep it local
- if selection must survive route transitions or be shared across modules, consider Zustand
- do not globalize selection by default

---

## Compare Feature State Rules

The compare feature is a likely candidate for shared client-side state.

If the compare flow needs selected products to remain available across screens or modules, a small focused Zustand store is acceptable.

Rules for compare state:

- keep only compare-related client state there
- do not place the full products catalog in the compare store
- store selected identifiers and lightweight metadata only when possible
- continue to use TanStack Query for full product details if server data is needed

---

## Mutation Feedback Rules

Mutation state should be predictable.

Use mutation hooks to expose:

- loading state
- success state when needed
- error state
- reset behavior if needed

UI feedback such as success messages, banners, or toasts should remain consistent and should not be implemented in a different style on every page.

Do not hide mutation side effects in unpredictable places.

---

## Optimistic Update Rules

Optimistic updates are optional, not automatic.

Use optimistic updates only when:

- the UX benefit is clear
- rollback behavior is safe
- the pattern remains understandable
- the action is simple enough to justify optimistic behavior

If optimistic behavior adds confusion or hidden failure complexity, prefer clear invalidation and refetching instead.

---

## Cache Invalidation Rules

Invalidation must be intentional.

After a mutation:

- invalidate affected list queries
- invalidate affected detail queries
- update local cache directly only when it is clearly beneficial and remains easy to reason about

Do not rely on accidental refetch behavior.

Do not leave stale UI behind after write operations.

---

## State Anti-Patterns To Avoid

Avoid these patterns:

- using Zustand for routine server data
- copying TanStack Query data into global stores without clear reason
- storing every modal and page flag globally
- mixing applied filter state and draft filter state without distinction
- manually rebuilding large form state with many loose local state variables
- keeping hidden business logic inside visual components
- duplicating list data in multiple local states
- overusing `useEffect` to synchronize state that should come from one source of truth
- creating mega-stores that collect unrelated state

---

## Recommended Default Choices

When unsure, use these defaults:

- backend data → TanStack Query
- create/update/delete actions → TanStack Query mutations
- temporary view-only behavior → local component state
- non-trivial forms → React Hook Form + Zod
- cross-page lightweight UI state → Zustand only if clearly justified

---

## Goal

State management should remain boring in the best way.

The project should always have a clear answer to:

- where this state lives
- why it lives there
- who owns it
- how it changes

A stable dashboard needs stable state boundaries.