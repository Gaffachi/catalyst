# Frontend Architecture: Catalyst

This document defines the code organization rules, file locations, component models, and data synchronization workflows for Catalyst.

## 1. Directory Structure

The project follows a **Feature-Based Scalable Architecture**. Feature folders contain all elements unique to that capability, preventing cross-directory pollution.

```
src/
├── app/                  # Next.js App Router (Pages & Routing Layouts)
│   ├── (auth)/           # Route grouping for login/onboarding
│   ├── (dashboard)/      # Route grouping for multi-tenant portals
│   ├── contact/          # Public Contact support page
│   ├── features/         # Features catalog page
│   └── page.tsx          # Public Landing page
│
├── components/           # Presentation-Only UI Elements
│   ├── ui/               # Atom-level Radix primitives (shadcn)
│   └── common/           # Brand-level elements (Navbar, Footer, Sidebar)
│
├── features/             # Business Logic Feature Bundles
│   └── [feature-name]/   # e.g., internships, mentorship, portfolio
│       ├── components/   # Feature-specific subcomponents
│       ├── hooks/        # Feature-specific React state hooks
│       ├── schemas/      # Zod validation structures
│       ├── services/     # Feature-scoped client-side logic
│       └── types/        # Type definitions specific to this module
│
├── services/             # Core Global Service Abstraction Layer
│   ├── auth.service.ts
│   ├── internship.service.ts
│   ├── mentorship.service.ts
│   └── profile.service.ts
│
├── hooks/                # Global Reusable UI Hooks
│   ├── use-toast.ts
│   └── use-window-size.ts
│
├── lib/                  # Library configs and global variables
│   ├── mock-db.ts        # Seed arrays simulating database storage
│   └── utils.ts          # Styles merge scripts (cn utility)
│
├── store/                # Zustand Global State Slices
│   ├── use-auth-store.ts # Session details, roles, permissions
│   └── use-app-store.ts  # Workspace states, drawer/modals triggers
│
└── types/                # Global TypeScript Model Files
    └── models.d.ts       # Platform objects (Student, Mentor, Job, Session)
```

---

## 2. Component Hierarchy

Catalyst enforces a strict nested component structure to control styling and state:

```
                  +-----------------------------------+
                  |           Root Layout             |  (app/layout.tsx)
                  +-----------------------------------+
                                    |
                  +-----------------------------------+
                  |          Page Wrapper             |  (app/[route]/page.tsx)
                  +-----------------------------------+
                                    |
                  +-----------------------------------+
                  |        Feature Container          |  (features/[feature]/components/)
                  +-----------------------------------+
                                    |
                  +-----------------------------------+
                  |        Presentation Card          |  (features/[feature]/components/)
                  +-----------------------------------+
                                    |
                  +-----------------------------------+
                  |         Atomic Primitives         |  (components/ui/)
                  +-----------------------------------+
```

- **Page Wrapper**: Performs routing validations, establishes metadata, and mounts corresponding feature components.
- **Feature Container**: Manages state, connects to custom hooks, triggers services requests, and handles interaction flows.
- **Presentation Card**: Receives props, handles styles, and fires event callbacks (no direct state mutation).
- **Atomic Primitives**: Accessible primitives (buttons, inputs, tooltips) built on Radix UI.

---

## 3. Data Flow

Data moves in a **unidirectional loop** to ensure predictability:

1. **User Action**: Student triggers an action (e.g., clicks "Apply for Internship").
2. **Feature Hook Call**: The click fires a handler inside a custom hook (e.g., `useApplyInternship`).
3. **Service Layer Execution**: The hook triggers the appropriate service method (e.g., `InternshipService.applyForInternship`).
4. **Zustand / State Mutation**: On success, the service returns the new record, updating the Zustand Store or local React state.
5. **UI Render**: The component re-renders with the updated state (e.g., changing the button to showing "Applied").

---

## 4. State Management Strategy

We divide states into three categories:

- **Local UI State**: Kept within components via React `useState` (e.g., dropdown open/close state, current input values).
- **Global Application State**: Managed via **Zustand** stores (e.g., active user session roles, toast queues, mobile sidebar open toggle).
- **Persisted Client State**: Zustand hydrated to `localStorage` (e.g., keeping mock applications persistent between browser page reloads).

---

## 5. Future Backend Integration Approach

Our service abstraction layers inside `src/services` and `src/features/[feature]/services` are designed to decouple the UI from backend implementation details:

- **Mock Phase**: Services run asynchronous local timeouts returning mock data from `lib/mock-db.ts`.
- **Backend Sync Phase**: 
  - Swap mock service functions with standard `fetch` or `axios` operations pointing to environment URL properties (`process.env.NEXT_PUBLIC_API_URL`).
  - Implement **TanStack Query** (React Query) inside feature-specific hooks to handle API caching, background updates, auto-refetching, and pagination keys logic.
