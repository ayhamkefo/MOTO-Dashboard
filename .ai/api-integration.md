# API Integration Guide

## Purpose

This file defines the default API integration workflow for the admin dashboard.

Its goal is to make API work:

- consistent
- typed
- reusable
- easy to debug
- easy for AI agents to follow

The dashboard is data-driven and CRUD-heavy, so API integration rules are a core part of the architecture.

---

## Source Of Truth Order

When implementing or reviewing an endpoint, follow this order:

1. Confirmed backend contract or provided API collection
2. Shared API client behavior
3. Feature API files
4. Query and mutation hooks
5. Pages and components
6. Internal documentation in `.ai/`

If the backend contract changes, update the integration pattern and documentation before allowing drift to spread.

---

## Core API Principles

- use one shared API client
- keep endpoint access inside feature `api/` files
- keep requests and responses typed
- use query and mutation hooks for UI-facing access
- centralize auth and error behavior
- avoid scattered custom fetch logic across pages
- avoid coupling endpoint logic to page layout structure

---

## Shared API Foundation

The project should use a shared API client from `shared/api/`.

Typical responsibilities of the shared API layer include:

- Axios instance setup
- base URL
- headers
- auth token attachment
- interceptors
- generic error normalization
- request configuration defaults

Feature code must not recreate its own API client.

---

## Feature API Layer

Each feature should own its endpoint access files.

Examples:

    src/features/products/api/products-api.ts
    src/features/categories/api/categories-api.ts
    src/features/employees/api/employees-api.ts

Feature API files should contain small typed endpoint functions.

Examples:

- `getProducts`
- `getProductById`
- `createProduct`
- `updateProduct`
- `deleteProduct`
- `getCategories`
- `createEmployee`

Auth follows the same rule:

- keep login access inside `features/auth/api/`
- if the backend is not ready, a temporary local adapter may live there
- do not embed temporary auth simulation directly inside pages or form components
- replace the adapter implementation later without rewriting the page structure

Feature API files may also contain query key factories when useful.

Examples:

- `products-keys.ts`
- `categories-keys.ts`

---

## Request Rules

Requests must be typed.

Use explicit request payload types for:

- create operations
- update operations
- filters
- search params
- pagination params
- sort params

Examples:

- `CreateProductPayload`
- `UpdateProductPayload`
- `ProductsListParams`
- `FeedbackFilters`

Rules:

- do not pass large loose objects without clear typing
- keep request shapes explicit
- keep feature-specific request types inside the feature unless shared across features
- keep serialization simple and predictable

If a request body requires transformation, do that transformation in the API layer or a documented helper, not in the page component.

---

## Response Rules

Responses must be typed.

Rules:

- define response types close to the feature
- do not let pages work with raw unknown response shapes
- normalize response handling if the backend shape is inconsistent
- keep normalization predictable and documented
- keep endpoint-specific mapping close to the API layer or feature hook when appropriate

Examples:

- `ProductsListResponse`
- `ProductDetailsResponse`
- `DashboardStatsResponse`

If the backend returns paginated responses, document and type the pagination shape clearly.

---

## Query Rules

Use TanStack Query for server data.

Query hooks should:

- call typed API functions
- expose clean loading, error, and success state
- use stable query keys
- support parameterized caching where needed
- avoid page-level duplication of fetch logic

Examples:

- `useProductsQuery`
- `useCategoriesQuery`
- `useProductQuery`
- `useDashboardStatsQuery`

Do not fetch server state directly inside page components when the data belongs in a query hook.

---

## Mutation Rules

Use TanStack Query mutations for write operations.

Mutation hooks should:

- call typed API functions
- expose mutation state cleanly
- invalidate or update relevant queries
- keep success and failure behavior predictable
- avoid repeating the same invalidation logic in multiple places

Examples:

- `useCreateProductMutation`
- `useUpdateProductMutation`
- `useDeleteProductMutation`
- `useToggleProductActiveMutation`

---

## Query Key Rules

Each feature should keep query keys predictable and centralized.

Recommended pattern:

- `<feature>Keys.all`
- `<feature>Keys.lists()`
- `<feature>Keys.list(params)`
- `<feature>Keys.details()`
- `<feature>Keys.detail(id)`

Examples:

- `productsKeys.all`
- `productsKeys.list(filters)`
- `productsKeys.detail(productId)`

Rules:

- do not scatter string query keys throughout the feature
- do not create inconsistent key conventions from one feature to another
- keep key factories in the feature `api/` layer or a small dedicated query key file

---

## Invalidation Rules

Mutations must explicitly manage stale data.

After create, update, delete, archive, toggle, or status-changing actions:

- invalidate affected list queries
- invalidate affected detail queries if needed
- update cache directly only when doing so clearly improves UX and stays easy to reason about
- document non-obvious cache behavior when necessary

Examples:

- after creating a category → invalidate categories list
- after updating a product → invalidate product detail and products list
- after archiving feedback → invalidate feedback list and affected counts if present

Do not rely on hidden or accidental refetch behavior.

---

## Error Handling Rules

Error handling should be centralized and consistent.

Rules:

- use shared API error normalization
- do not parse raw Axios errors inside pages
- do not scatter endpoint-specific error handling across components
- expose usable error state through hooks
- keep user-facing fallback behavior consistent

Pages and components should receive already-usable error state whenever possible.

If the backend contract introduces multiple error shapes, document the normalized approach and reuse it consistently.

---

## Auth And Session Rules

Auth behavior should stay centralized in the shared API layer or app-level infrastructure.

This may include:

- attaching auth tokens
- refreshing or clearing session data when appropriate
- redirecting on unauthorized states through a documented app-level flow
- keeping protected endpoint behavior predictable

Feature API files should not each invent their own auth handling.

---

## Pagination, Filtering, And Sorting Rules

For list-heavy CRUD modules, parameter handling must be explicit.

Use typed parameter objects for:

- search
- page
- page size
- sorting
- category filter
- brand filter
- status filter
- date range filter when relevant

Rules:

- keep list params explicit and typed
- include params in query keys when they affect server results
- avoid hidden filter state that is not reflected in caching behavior
- avoid mixing unrelated filter logic directly inside page render code

---

## File Responsibilities

### Shared API Client

Responsible for:

- Axios instance
- interceptors
- auth headers
- common defaults
- generic normalization

### Feature API Files

Responsible for:

- typed endpoint calls
- feature query key factories
- lightweight request shaping if needed

### Hooks

Responsible for:

- wrapping queries and mutations
- exposing UI-ready state
- managing invalidation and simple data orchestration

### Pages

Responsible for:

- calling hooks
- rendering state
- composing sections

Pages are not responsible for raw endpoint logic.

---

## Standard Workflow For A New Endpoint

1. confirm the backend contract
2. define request and response types
3. add or update the feature API function
4. add or update query keys if needed
5. create or extend the query or mutation hook
6. wire the hook into the page or feature component
7. handle loading, empty, error, and success states consistently
8. update `.ai/` docs if a shared pattern changed

---

## Feature Integration Checklist

Before considering an API task complete, check all of the following:

- endpoint contract is understood
- request types are explicit
- response types are explicit
- feature API function exists
- query key pattern is consistent
- query or mutation hook exists
- pages are not calling raw API directly
- invalidation behavior is intentional
- error handling is centralized
- docs are updated if shared patterns changed

---

## Done Criteria For API Work

API work is done when:

- the endpoint is integrated through the shared API system
- request and response types are explicit
- query and mutation hooks are clean and reusable
- invalidation behavior is correct
- errors are handled consistently
- pages remain thin
- the new pattern does not introduce architecture drift
- the relevant docs still describe reality correctly

---

## Anti-Patterns To Avoid

Avoid these patterns:

- raw Axios calls inside pages
- duplicated endpoint functions in multiple files
- ad-hoc query keys in random components
- untyped request payloads
- untyped response data flowing into the UI
- mutation logic duplicated across pages
- page-specific error parsing
- per-feature auth logic duplication
- hidden invalidation assumptions
- scattered list parameter shapes
- undocumented normalization logic

---

## Goal

API integration should feel like one stable system.

The dashboard should not become a collection of unrelated fetch patterns.

Every feature should access data in a way that is:

- predictable
- typed
- reusable
- easy to maintain
- easy for AI agents to extend safely
