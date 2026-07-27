# Development Rules & Coding Standards: Catalyst

## 1. TypeScript Strictness
- **Strict Mode Enabled**: Set `"strict": true` in `tsconfig.json`. Explicit typing is required.
- **No Implicit `any`**: Do not use `any`. If a type cannot be determined easily, use generics or `unknown` combined with type guards.
- **Null & Undefined Safety**: Check for `null` and `undefined` using optional chaining (`?.`) and nullish coalescing (`??`).

## 2. Reusable UI Components
- Follow the atomic design principles layered in `src/components`:
  - **shadcn/ui Primitives**: Core interactive elements (e.g., Dialog, Tooltip, Dropdown) built with Radix.
  - **Shared/Common Components**: Cross-cutting custom components (e.g., custom file-upload wrappers, generic alert indicators).
- Keep component sizes manageable (< 200 lines). Break sub-elements into sub-components.

## 3. Clean Architecture Guidelines
- **Separate Presentation from Logic**: Put complex queries, form controls, and state calculations into custom React hooks (e.g., `useInternshipSearch.ts`) rather than polluting JSX layout code.
- **Pure Functions**: Isolate parsing, date formatting, and business calculations in `/lib/utils.ts` or feature-specific helper files.

## 4. DRY (Don't Repeat Yourself)
- If code is copied more than twice, abstract it into a utility function or hook.
- Leverage shared Tailwind utility layers or design system CSS variables in `global.css` instead of recreating styles in every file.

## 5. Responsive Design (Mobile-First)
- All layout definitions must be tested on multiple viewport breakpoints:
  - Mobile (default, no prefix)
  - Tablet (`md:`)
  - Laptop (`lg:`)
  - Desktop (`xl:` and `2xl:`)
- Avoid fixed width definitions. Use percentage structures, CSS flexbox, or grid configurations combined with `max-w-screen-xx`.

## 6. Accessibility (A11y) Requirements
- All interactive controls must support keyboard access (`tabIndex`, `:focus` styles).
- Include appropriate ARIA labels (`aria-label`, `aria-describedby`) for buttons or custom visual elements that contain no direct text.
- Maintain a contrast ratio of at least 4.5:1 for normal body text relative to background colors.

## 7. Code Formatting & Naming Conventions
- **Files**: Use `kebab-case` for file and directory names (e.g., `resume-builder.tsx`, `use-active-sessions.ts`).
- **React Components**: Use PascalCase (e.g., `StudentDashboardLayout.tsx`).
- **Variables & Functions**: Use camelCase (e.g., `const applicantCount = 10;`, `const handleUserOnboard = () => {}`).
- **Constants**: Use UPPERCASE with underscores (e.g., `const MAX_UPLOAD_LIMIT = 5242880;`).
- **Hooks**: Must start with the prefix `use` (e.g., `usePortfolioData.ts`).
