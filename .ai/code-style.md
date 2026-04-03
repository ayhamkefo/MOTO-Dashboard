# Code Style And Structural Conventions

## Purpose

This file defines the coding and structural conventions for the admin dashboard.

Its goal is to keep the codebase:

- readable
- consistent
- scalable
- easy for AI agents to extend
- easy for humans to maintain later

This file should be followed before adding new patterns or new local conventions.

---

## General Principles

- Follow the documented project structure before introducing a new pattern
- Keep code simple, typed, and predictable
- Prefer consistency over cleverness
- Prefer feature-local organization unless reuse is real
- Keep files focused
- Avoid mixing UI composition, API access, and business logic in one file
- Write code that is easy to scan and easy to extend

---

## Preferred Stack Conventions

- Use TypeScript everywhere
- Prefer function components
- Prefer named exports unless there is a clear local reason not to
- Prefer hooks for reusable feature logic
- Prefer TanStack Query for server state
- Prefer local component state for temporary UI behavior
- Use Zustand only when shared client state is truly needed

---

## Naming Conventions

### Folders

- Use `kebab-case` for folders

Examples:

- `features/products`
- `features/employee-feedback`
- `shared/components`
- `app/providers`

### Files

Use `kebab-case` for file names.

Examples:

- `products-page.tsx`
- `product-form.tsx`
- `products-table.tsx`
- `use-products-query.ts`
- `use-create-product-mutation.ts`
- `products-api.ts`
- `product.types.ts`
- `product.schema.ts`
- `product-table-columns.tsx`

### React Components

Use `PascalCase` for component names.

Examples:

- `ProductsPage`
- `ProductForm`
- `ProductsTable`
- `DashboardStatsCard`
- `EmployeeFeedbackList`

### Hooks

Hooks must start with `use`.

Examples:

- `useProductsQuery`
- `useProductQuery`
- `useCreateProductMutation`
- `useDashboardStats`
- `useCompareSelection`

### Types And Interfaces

Use `PascalCase` for type names.

Examples:

- `Product`
- `ProductResponse`
- `CreateProductPayload`
- `FeedbackItem`
- `DashboardStats`

### Constants

Use `UPPER_SNAKE_CASE` for file-level constants that are true constants.

Examples:

- `PRODUCTS_PAGE_SIZE`
- `DEFAULT_SORT_ORDER`
- `MAX_COMPARE_ITEMS`

Use `camelCase` for derived or local constants inside functions when they are not global constants.

---

## Feature File Organization

Each feature should stay internally consistent.

Preferred feature structure:

    src/features/<feature>/
    ├── api/
    ├── components/
    ├── hooks/
    ├── models/
    ├── pages/
    ├── utils/
    └── store/      # optional

### Folder Responsibilities

- `api/` → endpoint access, query keys, request helpers
- `components/` → feature-specific UI parts
- `hooks/` → feature logic and query/mutation wrappers
- `models/` → request types, response types, schemas, mapping helpers if needed
- `pages/` → route-level page components
- `utils/` → feature-local formatting and small helpers
- `store/` → Zustand only if truly needed

---

## Page Rules

Route-level page files must stay thin.

Pages should mainly do this:

- compose page layout
- call feature hooks
- pass data into presentational components
- wire high-level actions
- define page-level sections

Pages should not do this:

- make raw API calls
- define large business workflows inline
- hold large transformation logic that belongs in hooks or utilities
- become giant files with tables, forms, mutations, and layout all mixed together

If a page becomes too large, extract:

- action bars
- filters sections
- tables
- modals
- form sections
- summary cards

---

## Component Rules

Components should be focused and purposeful.

Good component responsibilities:

- render one clear UI section
- accept typed props
- stay easy to reuse within the feature
- keep visual logic local

Avoid components that:

- fetch their own server data without a clear documented reason
- mix rendering and unrelated business behavior
- become giant “god components”
- own too many responsibilities at once

### When To Extract A Component

Extract when:

- a UI section is repeated
- a page is becoming too long
- a UI block has a clear single responsibility
- the extracted component improves readability

Do not extract tiny one-off components that make the file tree harder to navigate without improving clarity.

---

## Hook Rules

Hooks are the main behavior layer.

Hooks should:

- wrap TanStack Query queries and mutations
- expose UI-friendly state
- contain feature-level logic
- keep pages thin
- keep data-access patterns consistent

Hooks should not:

- contain JSX
- contain layout rules
- become global dumping grounds
- duplicate query logic already defined elsewhere

### Good Hook Examples

- `useProductsQuery`
- `useProductDetails`
- `useCreateProductMutation`
- `useUpdateAvailabilityMutation`
- `useFeedbackFilters`
- `useCompareProducts`

### Hook Return Shape

Hooks should return predictable shapes.

Prefer returning objects with named fields instead of tuples when the logic is non-trivial.

Example shape:

- `data`
- `isLoading`
- `isError`
- `error`
- `refetch`
- `handleSubmit`
- `isSubmitting`

Keep names clear and aligned with TanStack Query where appropriate.

---

## API Function Rules

API functions live inside the feature `api/` folder and must use the shared API client.

API functions should:

- be small
- be typed
- represent one endpoint action
- avoid UI concerns
- avoid view-specific formatting

Examples:

- `getProducts`
- `getProductById`
- `createProduct`
- `updateProduct`
- `deleteProduct`
- `toggleProductActive`

API functions should not:

- manipulate layout state
- trigger toasts directly
- know which page is calling them
- include business text intended for the UI

---

## Typing Rules

TypeScript typing is required.

### General Rules

- avoid `any`
- prefer explicit request and response types
- prefer narrow types over vague broad objects
- keep shared types in `shared/` only if they are actually shared
- keep feature-specific types inside the feature

### Recommended Type Files

Examples:

- `product.types.ts`
- `feedback.types.ts`
- `employee.types.ts`
- `dashboard.types.ts`

### Payload Types

Request payloads should be clearly named.

Examples:

- `CreateProductPayload`
- `UpdateProductPayload`
- `CreateCategoryPayload`
- `FeedbackFilters`

### Response Types

Response types should reflect the actual API contract.

Examples:

- `ProductsListResponse`
- `ProductDetailsResponse`
- `DashboardStatsResponse`

If normalization is introduced, the normalized type must be documented and reused consistently.

---

## Form And Schema Rules

Use React Hook Form and Zod for non-trivial forms.

### Form Files

Preferred names:

- `product-form.tsx`
- `employee-form.tsx`
- `product.schema.ts`
- `employee.schema.ts`

### Rules

- keep validation near the feature
- keep schema names explicit
- avoid inline validation chaos inside page files
- keep default values organized
- keep form submit logic outside large JSX blocks when possible

### Schema Naming

Examples:

- `createProductSchema`
- `updateProductSchema`
- `employeeFormSchema`

---

## Import Rules

- prefer absolute or project-consistent import style if configured
- keep import groups clean
- avoid deep messy relative paths when a project alias exists
- do not create circular imports
- do not import feature internals from unrelated features without a strong reason

Typical import grouping order:

1. external libraries
2. app/shared imports
3. feature-local imports
4. styles/types if local conventions require them

Keep import order stable and readable.

---

## File Splitting Rules

A file should have one main responsibility.

Split files when:

- a page becomes too long
- one file starts handling unrelated concerns
- a reusable section emerges
- a hook starts mixing unrelated operations
- a type file becomes overloaded

Avoid unnecessary splitting when:

- the file is still cohesive
- splitting would create navigation overhead with little clarity benefit

The goal is clean separation, not fragmentation.

---

## Error Handling Style

- keep API error handling centralized
- avoid custom error parsing in page files
- surface user-facing states through hooks and shared patterns
- do not scatter inconsistent toast or banner behavior across pages
- prefer predictable error handling and documented fallback behavior

UI components should receive already-usable error state whenever possible.

---

## Query And Mutation Naming

### Query Hooks

Use names like:

- `useProductsQuery`
- `useCategoriesQuery`
- `useDashboardStatsQuery`
- `useProductQuery`

### Mutation Hooks

Use names like:

- `useCreateProductMutation`
- `useUpdateProductMutation`
- `useDeleteProductMutation`
- `useArchiveFeedbackMutation`

### Query Keys

Keep query keys centralized and predictable within the feature.

Examples:

- `productsKeys.all`
- `productsKeys.list(filters)`
- `productsKeys.detail(id)`

Do not scatter ad-hoc key strings across multiple files.

---

## Reuse Rules

Before creating new code, check whether a shared or feature-local pattern already exists.

Reuse first:

- buttons
- inputs
- modals
- tables
- status badges
- loading states
- empty states
- filter bars
- confirm dialogs

Only move code to `shared/` when reuse is real or clearly planned.

---

## Styling Rules

Styling must follow the shared UI system.

- do not hardcode random spacing systems per page
- do not choose new colors per page
- do not create inconsistent shadows, borders, or radii
- do not build a different table style for each module
- follow `.ai/ui-system.md`

---

## Anti-Patterns To Avoid

Avoid these patterns:

- raw API calls inside route pages
- raw API calls inside random components
- huge page files mixing layout, business logic, and data access
- untyped payloads and responses
- excessive use of `any`
- duplicated mutation logic
- duplicated query key patterns
- a different naming style in each feature
- one-off folder structures that break project consistency
- overusing Zustand for simple local state
- moving unstable code into `shared/` too early
- inline giant configuration objects that hide intent
- page-specific design inventions that break the dashboard system

---

## Goal

The codebase should feel like one product built with one system.

Code should be:

- consistent
- typed
- easy to scan
- easy to extend
- easy for AI agents to continue safely