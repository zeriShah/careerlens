# CareerLens Engineering & Product Skills

This document defines how every screen, component, interaction and code should be created.

These rules have higher priority than visual creativity.

The objective is to make CareerLens feel like a real production SaaS application designed and built by experienced product designers and senior software engineers.

Never generate generic AI-looking interfaces.

---

# Product Mindset

Think like

- Senior Product Designer
- Senior Frontend Engineer
- Senior Backend Engineer
- UX Researcher

Never think like

- AI Template Generator
- Landing Page Generator
- Dribbble Designer

Every design decision should solve a user problem.

Never add components only because they look beautiful.

Functionality comes before decoration.

---

# Design Philosophy

CareerLens is a productivity application.

Not an AI application.

AI is only one capability.

The interface should communicate

Professional

Trustworthy

Fast

Minimal

Focused

Modern

Never futuristic.

---

# Visual Inspiration

Always take inspiration from

Linear

GitHub

Stripe

Vercel

Notion

Raycast

Clerk

Resend

Arc Browser

Never copy.

Only learn spacing, hierarchy and usability.

Never use inspiration from generic AI websites.

---

# UX Principles

Users should always know

Where they are

What they can do

What happens next

Every page must have

Page Title

Short Description

Primary Action

Secondary Actions

Content

Empty State

Loading State

Error State

Success Feedback

---

# UI Principles

Prefer whitespace over borders.

Prefer typography over colors.

Prefer layout over effects.

Prefer usability over animations.

Everything should have visual hierarchy.

Never clutter the interface.

---

# Color Usage

Use one primary color only.

Blue should represent actions.

Green should represent success.

Yellow should represent warnings.

Red should represent errors.

Everything else should stay neutral.

Never use random colors.

---

# Shadows

Very subtle.

Almost invisible.

Cards should separate content.

Not attract attention.

---

# Cards

Simple.

Clean.

Readable.

No heavy shadows.

No gradients.

No glassmorphism.

No glowing borders.

---

# Buttons

Primary

Solid Blue

Secondary

Outline

Ghost

Transparent

Danger

Red

Nothing else.

---

# Forms

Large labels.

Helpful placeholders.

Clear validation.

Helpful error messages.

Keyboard accessible.

---

# Typography

Inter

Readable

Consistent

Use typography to create hierarchy.

Never oversized marketing text.

---

# Icons

Lucide Icons only.

One icon style.

One size system.

No emoji icons.

No colorful illustrations.

---

# Spacing System

Use

4

8

12

16

20

24

32

40

48

64

Spacing must remain consistent everywhere.

---

# Border Radius

12px

Dialogs

16px

Buttons

10px

Inputs

10px

Never random values.

---

# Animations

Maximum

150–200ms

Fade

Slide

Opacity

Scale (very subtle)

Never bounce.

Never floating.

Never spinning backgrounds.

Never distracting animations.

---

# Responsive Thinking

Desktop first.

Tablet second.

Mobile last.

Every component should work on all screen sizes.

Never hide important functionality on mobile.

---

# Dashboard Thinking

Do not build admin dashboards.

Build workspaces.

Every screen should help users complete work.

Not display statistics.

Avoid unnecessary widgets.

---

# Navigation

Users should never get lost.

Sidebar must remain predictable.

Active states must always be visible.

Navigation hierarchy should remain shallow.

Avoid deeply nested menus.

---

# Empty States

Every empty page should explain

What this page does.

Why it is empty.

How to get started.

Include one clear CTA.

---

# Loading States

Never show blank pages.

Always use

Skeleton Loaders

Button Loading

Progress Indicators

---

# Error Handling

Always explain

What happened.

Why.

What users should do next.

Never expose backend errors.

---

# Tables

Readable.

Searchable.

Filterable.

Sortable when appropriate.

Pagination.

Sticky headers.

Professional spacing.

---

# Forms

Autosave where appropriate.

Prevent accidental loss.

Show success feedback.

---

# Content Writing

Write like a professional SaaS company.

Short sentences.

Clear language.

Avoid buzzwords.

Avoid AI hype.

Avoid marketing exaggeration.

---

# Accessibility

Keyboard navigation.

Focus states.

ARIA labels.

Semantic HTML.

High contrast.

Screen reader friendly.

---

# Code Quality

Always generate production-ready code.

Never generate demo code.

Never generate fake APIs.

Never hardcode data unless explicitly requested.

Separate

UI

Business Logic

API Calls

Hooks

Utilities

Types

Constants

---

# React Standards

Use

Functional Components

TypeScript

Reusable Components

Custom Hooks

React Router

TanStack Query

React Hook Form

Zod

Never create giant components.

Split responsibilities.

---

# Backend Standards

Express.js

Controllers

Services

Repositories

Middleware

Validation

JWT

bcrypt

Prisma

Environment Variables

Central Error Handling

---

# Database Standards

Neon PostgreSQL

UUID Primary Keys

Timestamps

Indexes

Foreign Keys

Normalized schema

Never duplicate data.

---

# API Standards

RESTful APIs.

Consistent responses.

Validation before business logic.

Proper HTTP status codes.

---

# Security

Hash passwords.

Validate input.

Sanitize data.

Protect routes.

Rate limiting ready.

Never expose secrets.

Never trust frontend validation.

---

# Performance

Lazy loading.

Memoization where needed.

Optimized queries.

Reusable components.

Avoid unnecessary re-renders.

---

# AI Features

AI assists users.

AI never replaces UX.

Never design around AI.

Design around user workflows.

---

# Human Touch

The application should never feel AI-generated.

Every screen should feel intentionally designed.

Every component should have a reason to exist.

Every interaction should solve a real user need.

Always ask

"If this product were built by Linear, Stripe, or GitHub, how would they solve this problem?"

Then implement that approach.

---

# Final Rule

When making any design or engineering decision, choose the solution that is

Simpler

Cleaner

More maintainable

More scalable

More professional

Never choose the flashier solution.

CareerLens should feel like a mature SaaS product, not an AI-generated template.