# AI Documentation Index

## Purpose

This folder contains the internal working rules for building and maintaining the admin dashboard.

It is designed to:

- guide AI agents
- keep architecture clean
- enforce consistency
- reduce repeated decisions
- support scalable growth
- evolve with the project

---

## Read This First

1. `.ai/agent.md`
2. `.ai/architecture.md`
3. `.ai/code-style.md`
4. `.ai/api-integration.md`
5. `.ai/ui-system.md`
6. `.ai/state-management.md`
7. `.ai/documentation-maintenance.md`
8. `.ai/decisions.md`
9. `.ai/skills.md`

---

## File Map

- `agent.md` → project context, rules, and non-negotiable constraints
- `architecture.md` → project structure, layer boundaries, and dependency rules
- `code-style.md` → naming, file organization, and implementation conventions
- `api-integration.md` → API handling rules and integration workflow
- `ui-system.md` → dashboard design rules and consistency system
- `state-management.md` → where state belongs and how it should be managed
- `documentation-maintenance.md` → how docs must evolve with the codebase
- `decisions.md` → shared technical decisions that should stay visible
- `skills.md` → repeatable workflows for common implementation tasks

---

## Prompt System

Reusable prompts live in:

    prompts/

These prompts are used for recurring tasks such as:

- creating features
- building CRUD modules
- integrating endpoints
- creating list pages
- creating form pages
- refactoring features
- updating docs

---

## Core Principle

The project must stay:

- consistent
- predictable
- scalable
- easy to maintain
- easy for AI agents to follow

AI should not improvise architecture, API strategy, or UI design outside the documented rules.

---

## Continuous Update Rule

Update documentation whenever:

- a shared pattern changes
- a new structure becomes standard
- API handling evolves
- auth/session handling evolves
- the UI system evolves
- a repeated workflow appears
- a technical decision affects more than one feature

---

## Golden Rule

If future work would require guessing, the docs are incomplete.

Update the docs before the missing context becomes a recurring problem.