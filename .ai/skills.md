# AI Workflows

## Purpose

This file defines repeatable implementation workflows for the admin dashboard.

Its goal is to help the AI agent and future contributors perform common tasks in a consistent way without reinventing the process each time.

Each workflow should be used together with the rules in:

- `.ai/agent.md`
- `.ai/architecture.md`
- `.ai/code-style.md`
- `.ai/api-integration.md`
- `.ai/state-management.md`
- `.ai/ui-system.md`

---

## Skill: Create A New Feature

### Goal

Add a new feature module that fits the project’s architecture, API, state, and UI conventions.

### When To Use It

Use this when a new business module is needed and there is no existing feature to extend.

Examples:

- categories
- brands
- products
- employees
- feedback
- compare
- dashboard analytics section

### Workflow

1. Inspect the documented feature structure in `.ai/architecture.md`
2. Create the feature inside `src/features/<feature>/`
3. Add the standard internal folders that are actually needed
4. Keep the feature self-contained
5. Add route pages if the feature owns route-level screens
6. Add feature API files, hooks, models, and components as needed
7. Reuse shared UI and patterns where appropriate
8. Keep the new feature aligned with the shared UI system
9. Update docs if the feature introduces a new reusable pattern

### Expected File Changes

Typical feature files may include:

- `api/`
- `components/`
- `hooks/`
- `models/`
- `pages/`
- `utils/`
- `store/` only if justified

### Validation Checklist

- feature structure matches project rules
- pages stay thin
- API access is not inside route pages
- hooks act as the main ViewModel layer
- no unnecessary global state is introduced
- UI looks like part of the same dashboard
- docs are updated if a reusable pattern emerged

---

## Skill: Create A CRUD Module

### Goal

Add a full admin CRUD feature in a consistent, scalable way.

### When To Use It

Use this for modules such as:

- categories
- brands
- products
- employees
- feedback management with status actions

### Workflow

1. Define the main CRUD flow:
   - list
   - details if needed
   - create
   - edit
   - delete or archive
2. Create the feature structure
3. Add typed API functions for list, create, update, delete, and detail if needed
4. Add query keys for list and detail
5. Create query and mutation hooks
6. Build the list page using the shared table pattern
7. Build create/edit form flow using the shared form pattern
8. Handle loading, empty, and error states consistently
9. Add mutation invalidation intentionally
10. Keep the visual pattern aligned with the dashboard system
11. Update docs if the module introduced a reusable convention

### Expected File Changes

Typical files:

- `<feature>-api.ts`
- `<feature>-keys.ts`
- `use-<feature>s-query.ts`
- `use-create-<feature>-mutation.ts`
- `use-update-<feature>-mutation.ts`
- `use-delete-<feature>-mutation.ts`
- `<feature>s-page.tsx`
- `<feature>-form.tsx`
- `<feature>.types.ts`
- `<feature>.schema.ts`

### Validation Checklist

- the module follows one stable CRUD structure
- list and form flows are separated cleanly
- no direct API calls exist in page files
- query invalidation works correctly
- shared table and form patterns are respected
- the feature does not invent a different UX system

---

## Skill: Create A List Page

### Goal

Add a clean, reusable admin list page for server-driven data.

### When To Use It

Use this for pages such as:

- products list
- categories list
- brands list
- employees list
- feedback list

### Workflow

1. Identify the data source and list params
2. Create or reuse the feature query hook
3. Define the applied filters and draft filters clearly
4. Build the page shell:
   - page title
   - page actions
   - filters row
   - table section
   - pagination section if needed
5. Use the shared loading, empty, and error patterns
6. Keep the table actions consistent with the dashboard system
7. Keep row actions compact and predictable
8. Keep the page file focused on composition

### Validation Checklist

- the page is thin and compositional
- filtering and pagination are explicit
- query parameters are reflected in caching behavior
- loading, empty, and error states are consistent
- the table feels like the same dashboard table pattern

---

## Skill: Create A Form Page Or Form Flow

### Goal

Add a create or edit flow using the shared form system.

### When To Use It

Use this for:

- create product
- edit product
- create employee
- update category
- login
- settings-like edit flows

### Workflow

1. Define the request payload clearly
2. Create or update the feature schema
3. Build the form using React Hook Form and Zod
4. Group related fields logically
5. Keep form labels, spacing, and actions consistent
6. Connect submit behavior to a mutation hook
7. Handle submit loading and error states clearly
8. Route or close modals intentionally after success
9. Keep destructive actions visually distinct

### Validation Checklist

- form state is not manually rebuilt with many loose `useState` fields
- validation is explicit
- form layout follows the shared system
- submit logic stays clean
- success and failure behavior are predictable

---

## Skill: Integrate A New Endpoint

### Goal

Add a backend endpoint in a way that matches the project’s API architecture.

### When To Use It

Use this when a new read or write endpoint must be added to an existing or new feature.

### Workflow

1. confirm the backend contract
2. define request and response types
3. add or extend the feature API function
4. add or update query keys if needed
5. create or extend the query or mutation hook
6. connect the hook to the relevant page or feature component
7. handle loading, empty, success, and error states consistently
8. add invalidation or cache updates intentionally
9. update docs if the integration introduced a new shared pattern

### Validation Checklist

- the endpoint is typed
- pages do not call Axios directly
- query keys stay centralized
- invalidation behavior is correct
- error handling remains centralized
- the new endpoint does not introduce architectural drift

---

## Skill: Add Table Filters And Search

### Goal

Add filter and search behavior to a list page without creating state confusion.

### When To Use It

Use this for searchable or filterable list pages.

Examples:

- products by category
- products by brand
- feedback by status
- employees by role or active state

### Workflow

1. identify which filters are applied query parameters
2. identify which values are draft input state
3. type the list params clearly
4. include applied params in query keys
5. build the filters row using shared filter layout rules
6. keep control order predictable
7. add reset behavior intentionally
8. avoid mixing draft state and applied state carelessly

### Validation Checklist

- applied state and draft state are clearly separated
- query keys reflect backend-affecting params
- filters feel visually consistent with other pages
- search and reset behavior are easy to understand

---

## Skill: Add A Table Action Flow

### Goal

Add row-level or bulk actions in a way that stays clean and predictable.

### When To Use It

Use this for actions such as:

- delete
- archive
- mark as read
- toggle active
- reset status
- open details
- launch edit flow

### Workflow

1. identify whether the action is destructive, neutral, or status-changing
2. choose the correct UI pattern:
   - inline action
   - dropdown action menu
   - confirm dialog
   - modal
3. connect the action to a mutation hook
4. show mutation loading state clearly
5. invalidate affected queries intentionally
6. use consistent success and failure feedback
7. keep action placement aligned with the shared table pattern

### Validation Checklist

- row actions are not overcrowded
- destructive actions require appropriate confirmation
- mutation behavior is predictable
- table design remains consistent

---

## Skill: Add Dashboard Stats Cards

### Goal

Add overview metrics in a way that fits the dashboard shell and card system.

### When To Use It

Use this for overview data such as:

- product counts
- low-stock counts
- feedback counts
- active employee counts
- system status summaries

### Workflow

1. identify the stats payload and its update behavior
2. add or extend the stats query hook
3. design the stats section using the shared card system
4. keep card hierarchy and spacing consistent
5. keep the data concise and scannable
6. handle loading and error states gracefully
7. avoid decorative clutter

### Validation Checklist

- cards follow shared spacing and card rules
- the section feels like part of the same dashboard
- numbers and labels are readable
- the layout is stable at multiple widths

---

## Skill: Add Compare Flow

### Goal

Add or extend the product compare feature without breaking state boundaries.

### When To Use It

Use this when building product comparison selection or comparison display workflows.

### Workflow

1. define what compare state must persist
2. keep full product data in server-state queries
3. use a small focused Zustand store only if cross-page shared compare state is justified
4. store only compare-related client state there
5. fetch or derive full comparison data through the normal query system
6. keep compare UI aligned with the same dashboard UI language

### Validation Checklist

- compare state does not become a second product database
- store contents stay minimal
- UI remains consistent with the dashboard
- the state design is documented if it becomes reusable

---

## Skill: Refactor A Feature

### Goal

Improve structure or readability without creating architectural drift.

### When To Use It

Use this when a feature is becoming difficult to maintain, has repeated logic, or has oversized pages.

### Workflow

1. inspect the full feature before moving code
2. identify repeated UI, repeated query logic, or oversized files
3. extract focused feature-local components and hooks
4. move code to `shared/` only if reuse is real
5. preserve visible behavior
6. preserve the current query and mutation behavior unless intentionally improving it
7. update docs if the refactor establishes a new standard

### Validation Checklist

- behavior remains stable
- the refactor reduces confusion
- shared code was moved only when justified
- the new structure is easier to extend

---

## Skill: Update Documentation

### Goal

Keep the internal documentation aligned with the actual project.

### When To Use It

Use this whenever implementation changes a shared rule, pattern, or workflow.

### Workflow

1. identify what actually changed
2. update the smallest correct set of docs
3. update `decisions.md` if the change affects shared future work
4. update `README.md` if onboarding or structure changed
5. add a new workflow to `skills.md` if the pattern has become reusable
6. add new internal guides to `.ai/README.md` if needed
7. keep the docs honest about current project reality

### Validation Checklist

- the changed behavior is documented
- the docs remain specific and trustworthy
- new reusable patterns are discoverable
- future work needs less guessing than before

---

## Skill: Review A Feature Before AI Expansion

### Goal

Understand the current state of a feature before asking an AI agent to build more on top of it.

### When To Use It

Use this before extending any significant feature.

### Workflow

1. inspect the current files in the feature
2. identify whether the feature already has:
   - API files
   - hooks
   - reusable components
   - shared table/form patterns
3. identify whether the feature is already stable or still evolving
4. identify the nearest similar feature if the target feature is small
5. choose extension over reinvention when possible
6. document gaps if the feature needs a clearer pattern first

### Validation Checklist

- the current feature reality is understood
- new work builds on the real structure
- the AI agent is not asked to guess a pattern that already exists nearby

---

## Maintenance Rule

When a workflow becomes repeatable, add it here.

The goal is to reduce repeated explanation and help the project grow through reusable, well-documented implementation habits.