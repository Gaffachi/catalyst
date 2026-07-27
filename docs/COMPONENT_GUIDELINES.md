# React Component Guidelines: Catalyst

This document defines the strict practices required for creating, naming, placing, and styling React components on the Catalyst platform.

---

## 1. Component Naming Conventions

Consistency in naming ensures a clean file hierarchy and predictable imports.

- **Component Names**: Must use `PascalCase` (e.g., `InternshipCard.tsx`, `MentorFeedbackPanel.tsx`).
- **File Names**: Must exactly match the component name (e.g., `InternshipCard.tsx`).
- **Callback Props**: Must be prefixed with `on` followed by the action verb (e.g., `onSelectProfile`, `onPostSubmit`).
- **Handler Functions**: Must be prefixed with `handle` (e.g., `const handleSelectProfile = () => {}`).

---

## 2. Directory Placement Structure

Where a component is placed depends on its scope of use across the platform.

```
src/
├── components/
│   ├── ui/               # Atom-level presentation elements (shadcn/base)
│   └── common/           # Platform-wide structure skeletons (header, footers)
│
└── features/
    └── [feature-name]/
        └── components/   # Scope-locked elements unique to this feature
```

### 2.1 Component Types

#### UI Primitives (`src/components/ui/`)
- Presentation-only, highly generic.
- Accept styling classes and direct callbacks.
- Must not connect to Zustand stores, hooks, or external API endpoints.

#### Shared Skeletons (`src/components/common/`)
- Skeletons that structure global routes (e.g., `Navbar`, `Footer`, `Sidebar`).
- Handle global route listeners.

#### Feature Components (`src/features/[feature]/components/`)
- Tied to business domains (e.g., `JobPostForm.tsx` inside `features/internships/`).
- Import UI primitives and style them.
- Can connect to feature hooks and service abstraction layers.

---

## 3. Reusability Expectations

- **Single Responsibility**: Each component must do one thing. If a card component also renders a detailed input modal, split it into two components.
- **Pure Rendering**: Prefer standard state-free presentation components. Pass parameters down using props.
- **No Style Hardcoding**: Avoid setting fixed margins inside reusable components. Let parents define container spacing.

---

## 4. Responsive & Styling Design Rules

- **Mobile-First Breakpoints**: Always code the layout first for mobile viewports (no media query prefix) and incrementally add size styles:
  - `sm:` (min-width: 640px) - Large mobile / Small tablets
  - `md:` (min-width: 768px) - Tablets (collapses navigations, expands grids)
  - `lg:` (min-width: 1024px) - Laptops (normal viewports)
  - `xl:` (min-width: 1280px) - Desktops
- **CSS Variable Integration**: Use Tailwind color tokens mapping to the design system (e.g., `bg-background`, `text-primary`, `border-border`) rather than hardcoding hex numbers.
- **Component States styling**: Ensure hover, focus, active, and disabled states are visually clear and comply with WCAG accessibility standards.
- **Overflow Prevention**: Avoid setting fixed pixel widths. Use percentage structures, CSS flexbox, or grid configurations.
