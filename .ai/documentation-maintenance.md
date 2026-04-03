# Documentation Maintenance Rules

## Purpose

This file defines how the internal documentation system must evolve as the project grows.

The goal is to make documentation part of implementation, not an afterthought.

The dashboard is being built with strong AI assistance, so documentation is part of the system that keeps future work:

- consistent
- scalable
- understandable
- reusable
- less dependent on memory or repeated explanation

---

## Core Rule

Documentation is part of done.

A task is not fully complete if it changes the shared system but leaves the documentation outdated.

This includes changes to:

- architecture
- API patterns
- UI system rules
- state management rules
- feature structure conventions
- reusable workflows
- technical decisions

---

## Continuous Update Triggers

Update documentation whenever any of the following happen:

- a new shared architectural pattern is introduced
- a new folder or feature structure becomes standard
- a new API integration pattern becomes standard
- auth or session handling changes
- query key strategy changes
- error handling behavior changes
- mutation invalidation behavior changes
- a shared table pattern changes
- a shared form pattern changes
- a shared page layout pattern changes
- a shared modal or drawer pattern changes
- a state management rule changes
- a new repeated workflow appears
- an old document becomes inaccurate or misleading
- a new reusable prompt pattern appears

If a future developer or AI agent would need to guess, the docs are incomplete.

---

## What To Update

### Update `.ai/agent.md` when

- project-wide boundaries change
- non-negotiable rules change
- new global implementation expectations appear
- the AI agent needs a new behavior constraint

### Update `.ai/architecture.md` when

- the project structure changes
- a new folder convention becomes standard
- feature boundaries evolve
- shared layer responsibilities change
- dependency direction rules change
- the standard feature structure changes

### Update `.ai/code-style.md` when

- naming conventions change
- file organization rules change
- component, hook, or API naming becomes more standardized
- new anti-patterns need to be documented
- a new code structure convention becomes standard

### Update `.ai/api-integration.md` when

- shared API handling changes
- request/response typing rules change
- auth/session behavior changes
- query key rules change
- invalidation strategy changes
- error normalization changes
- a new standard integration workflow becomes reusable

### Update `.ai/state-management.md` when

- the team changes how server state is handled
- the role of Zustand changes
- a new cross-feature state pattern becomes standard
- compare or selection state evolves into a reusable pattern
- filter state conventions change

### Update `.ai/ui-system.md` when

- new visual patterns become standard
- the dashboard shell evolves
- table or form patterns become more defined
- spacing, colors, or typography standards change
- empty/loading/error patterns change
- a stable visual decision needs to be recorded

### Update `.ai/decisions.md` when

- a decision affects multiple features
- a technical choice becomes long-lived
- a new cross-feature rule is adopted
- an old decision changes meaning or direction

### Update `.ai/skills.md` when

- a workflow becomes repeatable
- the same task instructions are being repeated manually
- a feature creation pattern becomes standardized
- a recurring implementation task deserves a reusable checklist

### Update `.ai/README.md` when

- a new internal guide is added
- the read order changes
- the documentation structure changes

### Update `README.md` when

- onboarding or setup changes
- stack changes
- the project purpose changes
- the structure summary becomes outdated
- the public project entry explanation becomes misleading

---

## Auto-Growth Rules

The documentation system should grow with the project.

### Extend an existing file when

- the new guidance clearly belongs to its topic
- the change is a refinement of an existing rule
- the structure still remains readable

### Create a new file when

- the topic becomes too large for the current file
- the topic has become reusable across many tasks
- the guidance is specialized enough to deserve its own reference
- the existing file would become mixed or hard to maintain

### Examples of future files that may be justified

- `.ai/auth-session.md`
- `.ai/table-patterns.md`
- `.ai/form-patterns.md`
- `.ai/permissions-and-roles.md`
- `.ai/dashboard-metrics.md`
- `.ai/crud-patterns.md`

When a new internal guide is added, it must also be added to `.ai/README.md`.

---

## Structure Evolution Rules

The docs should describe the current project honestly.

Do not write documentation as if the project is already more mature than it is.

Document:

- what exists now
- what is standard now
- what direction has been chosen
- what is still optional or evolving

Be explicit when something is:

- a current rule
- a likely future direction
- still flexible
- not yet finalized

This keeps the documentation trustworthy.

---

## Decision Logging Rules

Add or update an entry in `.ai/decisions.md` when a change affects:

- shared architecture
- shared API behavior
- shared state management rules
- shared UI conventions
- cross-feature structure
- long-term technical choices
- anything that future work should not keep re-debating

Each decision entry should include:

- date
- short title
- context
- decision
- consequence
- docs to revisit

If a decision evolves, update the existing entry or add a follow-up entry that clearly explains the change.

Do not allow conflicting undocumented assumptions to accumulate.

---

## Prompt Maintenance Rules

Prompts should be added or updated when a task pattern is likely to repeat.

Examples:

- creating a CRUD feature
- integrating an endpoint
- creating a list page
- creating a form flow
- refactoring a feature
- updating docs after shared changes

Prompt files should be:

- task-oriented
- reusable
- aligned with the documented architecture
- consistent with the UI system and state rules

Do not create prompts that conflict with `.ai/` rules.

---

## Definition Of Done For Documentation

Documentation work is done when:

- the changed behavior is reflected in the correct file
- the docs still match the real codebase direction
- shared patterns are discoverable
- repeated workflows are documented when useful
- old inaccurate guidance has been corrected
- future contributors or AI agents can continue work without unnecessary guessing

---

## Maintenance Principle

The documentation system should reduce chaos over time.

Every important implementation decision should make future work easier, not more confusing.

Good documentation in this project is:

- current
- honest
- specific
- actionable
- reusable