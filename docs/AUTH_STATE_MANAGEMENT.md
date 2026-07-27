# Authentication State Management: Catalyst

This document details the frontend state management, permission matrices, route guards, and simulated credential profiles designed for Catalyst.

---

## 1. Authentication State Model (Zustand Store)

Catalyst utilizes a centralized **Zustand Auth Store** to manage session parameters, user configurations, and loading indicators.

```typescript
interface UserSession {
  id: string
  name: string
  email: string
  role: "student" | "mentor" | "employer" | "admin" | null
}

interface AuthStore {
  user: UserSession | null
  profileStatus: "uncompleted" | "onboarding" | "completed" | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, role: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<UserSession>) => void
  setOnboardingStatus: (status: "uncompleted" | "onboarding" | "completed") => void
}
```

### Property Descriptions
- `user`: Holds the active session model (unique identifier, display name, verified email, and role authorization).
- `profileStatus`: Tracks if a user has completed the onboarding steppers profile registry (`uncompleted`, `onboarding`, or `completed`).
- `isAuthenticated`: Evaluates true if a user profile is logged in.
- `isLoading`: Tracks asynchronous requests (login processing, onboarding submissions, logouts).
- `login()`: Action triggering mock validation endpoints and initializing the Zustand session.
- `logout()`: Action resetting all session values and redirecting to the root landing page.
- `updateUser()`: Helper action updating the active user session metadata.

---

## 2. User Session Lifecycle

The state transitions during onboarding follow this data lifecycle:

1.  **Visitor**: `user: null`, `isAuthenticated: false`. No profile payload exists.
2.  **Register**: The visitor submits base credentials. `user: { id, email, role: null }`, `profileStatus: "uncompleted"`.
3.  **Account Created**: System creates a baseline user entry and loads the **Role Selector**.
4.  **Profile Setup**: On role selection, `profileStatus` shifts to `"onboarding"`. The user fills in stepper wizard forms.
5.  **Authenticated Session**: Upon wizard completion, `profileStatus` updates to `"completed"`, `isAuthenticated` becomes `true`.
6.  **Role Dashboard**: Secure client routes mount. The user enters their role-specific dashboard.

---

## 3. Role Permission Matrix

The system enforces strict multi-tenant boundary checks:

| Role | Allowed Dashboard Routing | Permitted Key Actions |
| :--- | :--- | :--- |
| **Student** | `/dashboard/student/*` | Portfolio edits, internships applications, mentorship reservations. |
| **Mentor** | `/dashboard/mentor/*` | Active mentee lookups, feedback evaluations, scheduler updates. |
| **Employer** | `/dashboard/employer/*` | Internship role postings, applicant Kanban changes, talent search. |
| **Admin** | `/dashboard/admin/*` | Global metrics views, company credential verifications, moderation. |

---

## 4. Protected Route Strategy

Routes are split into public pages and layout-checked dashboards:

### 4.1 Public Routes
` / ` | `/about` | `/features` | `/contact` | `/login` | `/register`

### 4.2 Protected Routes
- `/dashboard/student/*` (Requires role `student`)
- `/dashboard/mentor/*` (Requires role `mentor`)
- `/dashboard/employer/*` (Requires role `employer`)
- `/dashboard/admin/*` (Requires role `admin`)

### 4.3 Routing Guard Logic
- A custom `<AuthGuard>` wrapper checks if `isAuthenticated` is true. If not, it redirects the request to `/login`.
- It then evaluates the user's role against the current path category (e.g. checks if a student is attempting to open `/dashboard/admin/`). If there is a mismatch, it redirects them to their correct role-specific dashboard landing page.

---

## 5. Mock Authentication Strategy

For local development and project presentation, the system seeds four accounts:

- **Student**: `student@catalyst.edu`
- **Mentor**: `mentor@catalyst.edu`
- **Employer**: `employer@catalyst.edu`
- **Admin**: `admin@catalyst.edu`

*Security Note*: Password validation is simulated in client-side services layers. Any password string is accepted for development accounts to facilitate testing during design reviews.

---

## 6. Authentication UI Components

The following modules will be created under `src/features/auth/components/`:

- **LoginForm**: Form handling email inputs, passwords, remember toggles, and validation warnings.
- **RegisterForm**: Core sign-up form mapping initial email and validation rules.
- **RoleSelector**: Interactive interface displaying three large cards (Student, Mentor, Employer) with role descriptors.
- **StepperWizard**: Subcomponent managing onboarding wizard tabs, back/next controls, and validation gates.
- **PasswordInput**: Accessible password field with eye-icons to reveal character lines.
- **AuthGuard**: Layout routing wrapper checking roles and managing redirects.
