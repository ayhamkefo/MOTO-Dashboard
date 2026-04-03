
## `prompts/integrate-endpoint.md`

```md
# Integrate Endpoint Prompt

## Purpose

Use this prompt when adding a new backend endpoint to an existing or new feature.

This prompt keeps endpoint work aligned with the project’s:

- shared API structure
- typing rules
- query key strategy
- hook-based integration pattern
- state management rules
- documentation standards

---

## When To Use

Use this prompt when:

- a new GET endpoint must be added
- a new create/update/delete/archive/toggle endpoint must be added
- an existing feature needs one more backend action
- a list query needs new parameters
- a detail endpoint is being introduced
- a mutation endpoint is being introduced

---

## Required Inputs

Before using this prompt, provide:

- feature name
- endpoint purpose
- HTTP method
- endpoint path
- request params or payload
- response shape if known
- whether the endpoint is a query or mutation
- affected queries that should be invalidated
- related UI flow

---

## Prompt Text

You are integrating a backend endpoint into a React + TypeScript admin dashboard.

Follow these project rules exactly:

### Architecture
- Keep the integration inside the existing feature structure
- Raw endpoint access must live inside the feature `api/` folder
- Pages and presentational components must not call Axios directly
- Query and mutation hooks are the UI-facing integration layer

### API Rules
- Use the shared API client
- Define typed request payloads, params, and response types
- Keep endpoint functions small and focused
- Keep query keys centralized and predictable
- Do not scatter ad-hoc key strings across the feature
- Keep auth and generic error behavior centralized

### Query vs Mutation
- If the endpoint fetches server data, integrate it through a query hook
- If the endpoint changes server data, integrate it through a mutation hook
- Keep invalidation behavior intentional and explicit
- Update cache directly only if it clearly improves UX and stays easy to reason about

### State Rules
- Server state belongs in TanStack Query
- Do not move endpoint results into Zustand unless there is a special documented reason
- Do not duplicate the same server data in multiple state systems

### Page Rules
- Route pages must stay thin
- Pages should consume query and mutation hooks, not raw endpoint functions
- Do not add endpoint-specific parsing logic inside page files

### Code Style
- Use TypeScript
- Use `kebab-case` file names
- Use clear request and response type names
- Use hook names starting with `use`
- Avoid `any`

### Documentation
- If this endpoint introduces a new reusable API pattern, mention which `.ai` docs should be updated
- Do not silently introduce a new cross-feature pattern

Now integrate the endpoint cleanly.

For the output:
1. identify which files should be created or updated
2. define the request and response types that should exist
3. define the API function that should be added
4. define the query key or mutation structure that should be used
5. define the hook that should wrap the endpoint
6. explain invalidation behavior if it is a mutation
7. explain where the page or component should consume the new hook
8. mention any documentation updates needed if this integration changes a shared pattern

Feature name:
[INSERT FEATURE NAME]

Endpoint purpose:
[INSERT PURPOSE]

HTTP method:
[INSERT METHOD]

Endpoint path:
[INSERT PATH]

Request payload or params:
[INSERT DETAILS]

Response shape:
[INSERT DETAILS OR "PARTIALLY KNOWN"]

Endpoint type:
[INSERT QUERY OR MUTATION]

Affected queries:
[INSERT RELATED QUERIES OR "NONE"]

Related UI flow:
[INSERT PAGE / FORM / TABLE ACTION / DETAIL VIEW / OTHER]

Special notes:
[INSERT EXTRA CONTEXT]