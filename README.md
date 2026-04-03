# Admin Dashboard – Mobile Store Management

## Overview

This project is an admin dashboard for managing mobile phone store data.

It allows admins to:
- Manage categories
- Manage brands
- Manage products
- Manage product prices
- Manage product availability
- Manage employees
- View and manage employee feedback
- Monitor store data through dashboard pages and status views

This dashboard is part of a larger system that also includes a mobile app used by employees to browse products, check availability, compare devices, and submit feedback.

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Axios
- React Hook Form
- Zod

---

## Project Structure

The project follows a feature-first structure:

    src/
    ├── app/        # App setup (routing, providers, layouts, config)
    ├── shared/     # Shared UI, utilities, API client, constants, types
    └── features/   # Business modules (categories, products, etc.)

Each feature is self-contained and follows a consistent internal structure.

---

## Features

Current or planned dashboard modules include:

- Auth
- Dashboard overview
- Categories management
- Brands management
- Products management
- Employees management
- Feedback management
- Product comparison support
- Admin tools
- System status and maintenance tools

---

## Design Philosophy

The dashboard should always be:

- Simple
- Clean
- Modern
- Consistent
- Practical
- Easy to scan and use

There is no final design system yet, so the project defines internal UI rules and consistency constraints in the `.ai/` documentation.

---

## AI Development System

This project uses an internal AI documentation system located in:

    .ai/

These files define:

- Architecture rules
- Code style rules
- API integration rules
- UI consistency rules
- State management rules
- Development workflows
- Documentation growth rules

---

## Read This First

For AI agents or new contributors, start with:

1. `.ai/README.md`
2. `.ai/agent.md`
3. `.ai/architecture.md`
4. `.ai/code-style.md`
5. `.ai/api-integration.md`
6. `.ai/ui-system.md`
7. `.ai/state-management.md`

---

## Important Rules

- Do not place API calls directly in page components
- Do not create a different UI style per page
- Do not invent a different structure for each feature
- Reuse shared components and patterns
- Keep route pages thin
- Keep business logic in hooks and feature logic layers
- Follow the project documentation before adding new patterns

---

## Documentation Growth

Documentation is part of development.

Whenever:

- architecture changes
- UI patterns evolve
- API handling changes
- a repeated workflow appears
- a shared decision is made

The `.ai/` documentation must be updated.

---

## Getting Started

Install dependencies:

    npm install

Run the development server:

    npm run dev

---

## Goal of This Project

Build a clean, scalable, and consistent admin dashboard using:

- strong feature-first architecture
- controlled AI-assisted development
- shared UI rules
- stable API integration patterns
- documentation that grows with the project
