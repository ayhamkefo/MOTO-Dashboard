# AI Agent Guide

## Purpose

This file defines how the AI agent must behave when working on this project.

It is the main source of truth for:

- architecture discipline
- design consistency
- implementation boundaries
- development behavior

Documentation updates are part of implementation work, not a separate follow-up task.

---

## Project Overview

This is a React admin dashboard for managing a mobile phone store system.

The dashboard is responsible for managing and monitoring store data, including:

- categories
- brands
- products
- prices
- availability
- employees
- employee feedback
- dashboard views and admin tools

This is a CRUD-heavy, admin-focused, data-driven product.

The dashboard is part of a larger system that also includes a mobile app for employees.

---

## Main Technology Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query for server state
- Zustand for minimal global client state when needed
- Axios for HTTP/API access
- React Hook Form + Zod for forms and validation

---

## Architecture Reality

- The project uses a feature-first structure
- The app is not using heavy Clean Architecture
- The app should remain practical, scalable, and easy to extend
- Feature hooks act as lightweight ViewModels
- Route pages should stay thin
- Shared infrastructure should stay centralized
- Feature code should not invent custom patterns without a strong reason

---

## Intended Direction

New work should move the project toward a stable and reusable dashboard architecture with:

- consistent feature structure
- unified API access
- predictable state management
- shared UI patterns
- shared design language
- self-growing internal documentation

The goal is not maximum abstraction. The goal is clean, stable, scalable implementation.

---

## Read Order Before Any Task

1. `.ai/README.md`
2. `.ai/architecture.md`
3. `.ai/code-style.md`
4. `.ai/api-integration.md`
5. `.ai/ui-system.md`
6. `.ai/state-management.md`

Read the target feature and nearby files before changing anything.

---

## Core Rules

### 1. Follow the documented structure

- Follow the project’s feature-first structure
- Do not invent new folder structures for one feature
- Do not add one-off patterns that conflict with the documented architecture
- Reuse the established structure unless a documented decision changes it

### 2. Keep pages thin

- Route-level page components should focus on composition
- Heavy logic should not live inside page components
- Business behavior, data orchestration, and server interactions should live in hooks and feature logic layers

### 3. Keep API logic isolated

- Do not call APIs directly inside pages
- Do not call APIs directly inside presentational components
- Use the feature API layer and query/mutation hooks
- Keep request and response handling typed and organized

### 4. Use the correct state layer

- Server data belongs in TanStack Query
- Local temporary UI state belongs in component state
- Minimal shared client state may use Zustand when truly needed
- Do not move simple local UI state into global stores without a strong reason

### 5. Preserve UI consistency

The dashboard must always feel:

- simple
- clean
- modern
- practical
- consistent across all pages

The AI agent may choose the visual implementation details, but only inside the shared UI system and consistency rules.

It must not redesign the dashboard style from scratch per page or per feature.

### 6. Reuse before creating

- Reuse shared components when appropriate
- Reuse table patterns
- Reuse form patterns
- Reuse empty, loading, and error states
- Avoid duplicated UI logic and duplicated API logic

---

## Design Behavior Rules

Because the project does not yet have a finalized design, the AI agent must help build the visual system while keeping it controlled.

The agent must:

- establish a base dashboard style early
- reuse the same spacing system
- reuse the same layout rhythm
- reuse the same cards, forms, and tables patterns
- keep color usage controlled
- avoid visual noise
- avoid inconsistent page shells
- avoid decorative redesigns that break the product feel

The dashboard should look like one product, not like unrelated screens made at different times.

---

## Documentation Is Part Of Done

Every meaningful task must leave the documentation in a usable state for the next task.

Update the relevant `.ai` files when:

- architecture assumptions change
- a new reusable pattern appears
- shared design rules evolve
- state management rules evolve
- API patterns evolve
- repeated workflows deserve documentation

If the implementation changes the project’s actual conventions, the docs must change too.

---

## Conservative Rule For Incomplete Areas

- If a feature is simple, keep it simple
- If a feature grows in complexity, structure it properly
- Do not over-engineer too early
- Do not under-structure code that is clearly becoming shared or long-lived

Prefer practical, stable organization over theoretical perfection.

---

## Do Not

- Do not mix UI logic and business logic carelessly
- Do not place raw API calls directly in pages
- Do not place raw API calls directly in leaf components
- Do not create random folders
- Do not create a different pattern per feature
- Do not create a different visual language per page
- Do not duplicate shared logic without reason
- Do not bypass shared hooks and shared components
- Do not introduce unnecessary global state
- Do not leave documentation behind when the shared system changes

---

## Default Working Behavior

When unsure:

- follow existing documented patterns
- choose consistency over cleverness
- choose simplicity over unnecessary abstraction
- choose reuse over duplication
- keep implementation predictable
- update the docs if the project learned something reusable