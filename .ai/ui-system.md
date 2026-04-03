# UI System Guide

## Purpose

This file defines the visual and interaction system for the admin dashboard.

The project does not yet have a final design file, so this document acts as the base design system and consistency guide.

Its goal is to ensure the dashboard always feels like one product.

---

## Core Design Philosophy

The dashboard must always feel:

- simple
- clean
- modern
- practical
- readable
- low-noise
- business-focused
- consistent

The interface should support speed, clarity, and stability over visual experimentation.

This is an admin dashboard, not a marketing website.

---

## Main Rule

The AI agent has freedom to choose the exact visual implementation only inside a shared system.

That means:

- the agent may establish the base look
- the agent may choose the core color direction
- the agent may choose the card and layout style
- the agent may choose spacing and visual rhythm

But once the base system is established, the agent must reuse it consistently.

It must not redesign the dashboard per page, per module, or per feature.

The product must look unified.

---

## Dashboard Personality

The visual personality should be:

- calm
- structured
- modern
- efficient
- trustworthy
- not flashy
- not decorative-heavy

Prefer a design style that feels appropriate for inventory management and admin workflows.

---

## Color System Rules

### General Approach

Use a restrained color palette.

Recommended structure:

- one primary accent color
- neutral grayscale foundation
- semantic status colors for success, warning, danger, and info
- subtle background surfaces
- strong readable text contrast

### Rules

- do not use many unrelated accent colors
- do not assign a new main color to each page
- do not overuse saturated colors
- do not use bright gradients as a default design language
- use semantic colors for meaning, not decoration

### Suggested Intent

- primary color → key actions, active states, links, focus states
- neutral tones → layout, surfaces, borders, dividers, tables
- success color → successful actions, healthy states
- warning color → caution, stock issues, pending issues
- danger color → destructive actions, critical states
- info color → informational badges and statuses

---

## Typography Rules

Typography must prioritize readability.

### Principles

- clear visual hierarchy
- strong page titles
- readable body text
- smaller muted metadata where needed
- avoid decorative font usage

### Rules

- use a consistent font stack
- use a predictable type scale
- do not invent different type scales per page
- keep table text readable
- keep forms readable
- use muted text for secondary details, not low-contrast unreadable text

### Hierarchy Suggestion

- page title
- section title
- card title
- body text
- helper text
- caption / metadata

The exact scale can be chosen, but it must be reused consistently.

---

## Spacing System

Spacing should be consistent and deliberate.

### Rules

- use one spacing scale across the dashboard
- keep page padding consistent
- keep card padding consistent
- keep vertical rhythm consistent between sections
- keep form field spacing consistent
- keep table toolbar spacing consistent

Avoid:

- random spacing values
- cramped layouts
- overly spacious layouts that waste screen efficiency
- changing spacing rhythm from one page to another

A clean spacing system is one of the strongest signals of a stable product.

---

## Layout System

The dashboard should use a consistent app shell.

### Default Layout Pattern

- left sidebar navigation
- top bar for page context and actions if needed
- consistent page container
- page header section
- main content area structured into cards, blocks, or table sections

### Page Structure Pattern

Each page should usually follow a pattern like:

1. page header
2. optional actions row
3. optional filters/search row
4. main content
5. pagination or secondary sections when needed

### Rules

- keep page width and padding consistent
- keep title and action alignment consistent
- keep content blocks aligned to the same rhythm
- avoid reinventing layout patterns per module

---

## Card System

Cards are a primary dashboard building block.

Use cards for:

- stats
- grouped content
- forms
- filters
- lists
- detail sections

### Card Rules

- consistent border radius
- consistent padding
- consistent shadow or border style
- consistent title area
- subtle surface separation
- avoid overly decorative card treatments

Cards should feel quiet and structured.

---

## Table System

Tables are central to this dashboard.

Tables must follow one reusable visual pattern.

### Shared Table Pattern

A standard table area should usually include:

- section title
- optional table actions
- search and filters row
- table body
- empty/loading/error states
- pagination

### Table Rules

- use one row style across modules
- use one header style across modules
- use one actions-cell pattern across modules
- use one pagination style across modules
- use one selection pattern across modules
- use one empty state style across modules

### Visual Principles

- readable density
- clear columns
- restrained row actions
- visible hover and active states
- subtle separators
- status badges where useful

Avoid:

- a different table style per feature
- oversized actions clutter
- inconsistent alignment
- decorative table chrome that adds noise

---

## Filter Bar System

Filters must also feel consistent.

### Standard Filter Row

A filters bar may include:

- search input
- dropdown filters
- status filters
- reset button
- apply button when needed
- view controls only if necessary

### Rules

- keep control sizes consistent
- keep alignment consistent
- place controls in predictable order
- avoid overloading the row with too many equal-priority controls
- move complex filters into a drawer or modal if needed

The goal is fast scanning and predictable usage.

---

## Form System

Forms must follow one consistent structure.

### Form Principles

- clear labels
- consistent field spacing
- strong submit action
- clear validation messages
- grouped related fields logically
- avoid visual clutter

### Form Rules

- use one label style across all forms
- use one input height system across all forms
- use one helper/error message style across all forms
- keep action buttons aligned consistently
- use section grouping for larger forms
- destructive actions must be visually distinct from normal save actions

### Form Layout Guidance

Use:

- single-column form layout for simple forms
- structured grouped sections for larger forms
- two-column layouts only when readability stays strong and the content supports it

Do not build each feature’s form with a different layout philosophy.

---

## Buttons And Actions

Buttons must communicate hierarchy clearly.

### Action Levels

Use a stable action hierarchy such as:

- primary action
- secondary action
- ghost or subtle action
- destructive action

### Rules

- one page should rarely have many competing primary buttons
- destructive actions must be visually distinct
- repeated row actions should stay compact and consistent
- action placement should follow the same logic across pages

Do not invent a new button treatment in each module.

---

## Status Badges And Chips

Status indicators are important for dashboards.

Use them for:

- active/inactive
- in stock / low stock / unavailable
- archived / unread / read
- success / warning / error states
- role labels when useful

### Rules

- use a consistent badge shape
- use consistent semantic colors
- keep text short
- do not overload pages with too many badge variants
- avoid decorative badge usage without meaning

---

## Modals And Drawers

Modals and drawers must also follow one system.

Use them for:

- create/edit forms when appropriate
- confirmations
- archive/delete confirmation
- secondary workflows
- advanced filters when a toolbar row becomes crowded

### Rules

- consistent width logic
- consistent close behavior
- consistent footer actions
- consistent spacing
- clear destructive action presentation
- do not create a different modal style per feature

If the same interaction can be clearer as a full page, prefer the clearer option over forcing everything into modals.

---

## Empty, Loading, And Error States

These states must be shared and predictable.

### Loading States

Use a consistent loading approach such as:

- skeletons for tables and cards
- loading spinners only when appropriate
- avoid sudden layout jumps

### Empty States

Use empty states that are:

- clear
- calm
- actionable when possible
- visually aligned with the rest of the dashboard

### Error States

Error states should:

- explain the issue clearly
- offer retry when relevant
- use consistent styling
- not be overdramatic visually

Do not build a different loading, empty, or error language on each page.

---

## Icons And Visual Assets

Use icons in a restrained and functional way.

Rules:

- use one icon family
- keep icon sizing consistent
- use icons to support recognition, not to decorate every element
- avoid mixing many icon styles
- do not use heavy illustrations unless the design system clearly supports them

---

## Responsive Behavior

This is a dashboard, so desktop-first design is acceptable, but responsiveness still matters.

### Rules

- keep core workflows usable on smaller screens
- collapse layout intelligently
- handle tables carefully on narrower widths
- avoid breaking forms on medium screens
- keep page headers and actions usable when horizontal space is reduced

The responsive system should feel intentional, not patched.

---

## Accessibility Basics

Even without a full accessibility specification, the UI should follow baseline accessibility discipline.

Rules:

- maintain readable contrast
- use clear labels
- preserve focus visibility
- avoid color-only meaning when possible
- keep interactive targets usable
- keep form validation messages understandable

---

## Consistency Rules

When building new pages, the AI agent must ask:

- does this look like the same dashboard?
- does this reuse the same page shell?
- does this reuse the same spacing system?
- does this reuse the same table style?
- does this reuse the same form system?
- does this reuse the same action hierarchy?
- does this preserve the calm, clean product feel?

If the answer is no, the design is drifting.

---

## Anti-Patterns To Avoid

Avoid these patterns:

- redesigning the page shell per feature
- using a new accent color per page
- different table systems in different modules
- different form philosophies in different modules
- overcrowded actions and controls
- noisy shadows, borders, or gradients
- decorative-heavy UI that harms usability
- inconsistent card styles
- inconsistent status badge meanings
- inconsistent empty/loading/error patterns
- visual decisions that optimize novelty over stability

---

## Goal

The dashboard should feel like one coherent product with one visual language.

The UI system should help the AI agent make design decisions confidently while staying inside clear boundaries.

Good dashboard design in this project means:

- clarity
- consistency
- calm structure
- practical usability
- modern polish without noise