# Backend Integration Issues — Catalyst Platform

**Date:** July 24, 2026  
**Author:** Phase 7 Readiness Audit  
**Purpose:** Identify all problems, missing features, and structural patterns that will cause friction, bugs, or require significant refactoring during Phase 7 (Backend Integration)

---

## CRITICAL ISSUES — Will Break Without Fixing

---

### ISSUE 1: Password is Completely Ignored at Login

**Files:**
- `src/store/use-auth-store.ts`
- `src/features/auth/components/LoginForm.tsx`

**Problem:**

```typescript
// LoginForm only passes email — password is silently dropped
const user = await login(data.email)   // ← password NEVER sent

// Auth store login() never receives or validates password
login: async (email: string, role?: UserRole) => { ... }  // ← no password param
```

The Zod schema validates password format (min 8 chars, uppercase, numbers, special chars) but the validated value is **never forwarded to the auth function**. This means when a real API is wired, the login call will be missing the password field entirely and the backend will reject every login attempt with a 400 or 401 error.

**Fix Required:**
- Change `login(data.email)` → `login(data.email, data.password)`
- Add `password: string` parameter to the `login()` function signature in the store
- Send `{ email, password }` in the real API call body

---

### ISSUE 2: `registerUser()` Never Sends the Password

**Files:**
- `src/features/auth/components/RegisterForm.tsx`
- `src/store/use-auth-store.ts`

**Problem:**

```typescript
// RegisterForm — password collected by Zod but thrown away
await registerUser(data.email, data.name)  // ← password missing

// Store function signature has no password parameter
registerUser: async (email: string, name: string) => { ... }
```

All password data passes Zod validation but is never forwarded to the registration function. A real backend requires the password in the registration payload to hash and store it.

**Fix Required:**
- Add `password: string` to `registerUser()` signature
- Pass `data.password` from the form
- Send `{ name, email, password }` to the real `POST /api/auth/register` endpoint

---

### ISSUE 3: User ID is Randomly Generated Every Login Session

**File:** `src/store/use-auth-store.ts`

**Problem:**

```typescript
const mockUser: User = {
  id: `usr-${Math.random().toString(36).substr(2, 9)}`,  // NEW ID on every login
  ...
}
```

Every time a user logs in, they receive a brand-new randomly generated ID. In a real backend the user ID is a foreign key linked to the user's profile, applications, sessions, and portfolio. A new ID on each login means the user loses all their server-side data on every login, and any API call using `user.id` as a route parameter will return 404.

**Fix Required:**
- Remove random ID generation from the auth store
- Use the `id` returned from the real API login response
- Store the server-assigned ID in zustand

---

### ISSUE 4: Auth Token / Session Cookie — Completely Absent

**File:** `src/store/use-auth-store.ts`

**Problem:**

The auth store persists `{ user, isAuthenticated, profileStatus }` to localStorage with no token. In a real system, every authenticated API request requires a Bearer token in the `Authorization` header. Without a token, every API call will return `401 Unauthorized`.

**What is missing:**
- `accessToken: string | null` field in the auth store
- Token refresh logic for JWT expiry
- A fetch wrapper / Axios interceptor that attaches the token to every request
- Logout that calls `POST /api/auth/logout` to invalidate the server-side session

---

### ISSUE 5: Onboarding Data is Logged and Discarded

**File:** `src/features/auth/components/StepperWizard.tsx`

**Problem:**

```typescript
const onSubmit = (data: Record<string, unknown>) => {
  console.log("Onboarding completed dataset:", data)  // ← only logged, never saved
  setOnboardingStatus("completed")
  router.push(`/dashboard/${role}`)
}
```

All the validated onboarding form data — institution, bio, skills, LinkedIn, GitHub, company, sector, registration number — is collected, validated by Zod, and then **only printed to the console**. It is never stored anywhere. The backend will have users with no profiles.

**Fix Required:**
- Replace `console.log(...)` with a real API call: `await ProfileService.submitOnboarding(role, data)`
- Handle errors and show feedback to the user if the API call fails

---

### ISSUE 6: `createOpportunity()` Hardcodes the Employer Identity

**File:** `src/features/employer/services/opportunity.service.ts`

**Problem:**

```typescript
static async createOpportunity(data: ...) {
  const newOpp: Opportunity = {
    ...data,
    companyId: "comp-hubtel",     // ← hardcoded forever
    companyName: "Hubtel Ghana",  // ← hardcoded forever
  }
}
```

Every opportunity ever created is attributed to "Hubtel Ghana". In a multi-employer system, the `companyId` must come from the logged-in employer's auth session, not a hardcoded constant.

**Fix Required:**
- Read the authenticated employer's `companyId` from `useAuthStore().user.id`
- Derive `companyName` from the employer's saved profile fetched from the backend

---

### ISSUE 7: `createAnnouncement()` Hardcodes the Admin Author

**File:** `src/features/admin/services/notification.service.ts`

**Problem:**

```typescript
author: "Dr. Kwesi Appiah (Admin)",  // ← hardcoded — applies to any admin
```

Any admin who creates an announcement will be falsely attributed to "Dr. Kwesi Appiah". The `author` field must be derived from the currently authenticated admin's `user.name` in the auth store.

---

## HIGH SEVERITY ISSUES — Will Cause Data or Logic Bugs

---

### ISSUE 8: Duplicate `UserRole` Type Defined in Two Files

**Files:**
- `src/features/auth/types/auth.types.ts`
- `src/features/student/types/student.types.ts`

The same `UserRole = "student" | "mentor" | "employer" | "admin"` union type is declared independently in two separate feature domains. When the backend introduces changes (e.g. a `"superadmin"` role), only one copy will be updated causing type divergence.

**Fix Required:** Create `src/types/shared.types.ts` with the canonical `UserRole` and import from that single source everywhere.

---

### ISSUE 9: `Opportunity` Type Has Two Incompatible Shapes

**Files:**
- `src/features/student/types/student.types.ts` — has `matchScore`, `applicationStatus`, `applied`, `companyName?`, `role?`
- `src/features/employer/types/employer.types.ts` — has `companyId`, `salaryRange`, `applicationRequirements`, `applicantCount`

These represent the same database entity but with completely different fields. When a single `/api/opportunities` endpoint is built, the response shape must satisfy both — but the two types are currently incompatible.

**Fix Required:**
- Define a canonical `Opportunity` entity type derived from the API schema
- Create portal-specific view-models (`StudentOpportunityView`, `EmployerOpportunityView`) that extend or pick from the canonical type

---

### ISSUE 10: Student and Employer Application Stores Are Completely Unlinked

**Files:**
- `src/features/student/services/mockData.ts` — `mockApplications: Application[]`
- `src/features/employer/services/mockData.ts` — `mockApplications: EmployerApplication[]`

When a student applies for a job in the marketplace, it only updates the student's local array. The employer's application Kanban board is completely unaware. In a real backend, a single application record serves both views. These two isolated stores will be resolved when both call the same real API endpoint.

---

### ISSUE 11: `matchScore` is Hardcoded Static Data

**File:** `src/features/student/services/mockData.ts`

```typescript
matchScore: 75,  // hardcoded
matchScore: 82,  // hardcoded
```

The match score should be a computed value derived by comparing the student's skills with the opportunity's `requiredSkills`. If the backend returns opportunities without a `matchScore` field, the marketplace UI will break with undefined values and broken sorting.

**Fix Required:** Either compute match scores server-side (recommended) and return them in the API response, or implement a client-side scoring function in the service layer.

---

### ISSUE 12: Marketplace Directly Mutates a Shared Array

**File:** `src/features/student/services/marketplace.service.ts`

```typescript
// Direct object mutation — incompatible with real API responses
const opp = mockInternships.find((o) => o.id === id)
opp.applicationStatus = "Applied"  // ← mutates shared module-level object
opp.applied = true
```

This mutation pattern is incompatible with immutable API JSON responses. When the real `PATCH /api/applications` is called, local state must be updated through React `setState`, not by mutating a shared module array.

---

### ISSUE 13: Skills Collected as String, Stored as Structured Object

**Files:**
- `src/features/auth/schemas/auth.schema.ts` — `skills: z.string()`
- `src/features/student/types/student.types.ts` — `skills: Skill[]` (objects with `name`, `level`, `category`)

The onboarding form collects skills as a freetext comma-separated string (e.g. `"React, TypeScript, Python"`). The `StudentProfile` type stores skills as structured `Skill[]` objects. There is no transformation logic anywhere to bridge this mismatch.

**Fix Required:** Either add a skill tag-input UI that builds the structured array before submission, or add a server-side parser that normalises raw strings into skill objects.

---

### ISSUE 14: Settings Changes Are Not Persisted

All settings services update a module-level in-memory variable. On page refresh all settings reset to their defaults. No `PATCH /api/settings` call is wired. The current optimistic update pattern will also need error rollback logic once the real API can fail.

---

### ISSUE 15: `MentorProfile` Has No `id` Field

**File:** `src/features/mentor/types/mentor.types.ts`

```typescript
export interface MentorProfile {
  name: string
  bio: string
  // ... NO id field
}
```

Every other entity type has a primary key. Without an `id`, the mentor profile cannot be fetched by a route parameter, cannot be updated with `PATCH /api/mentors/:id`, and cannot be linked to sessions or students in the database.

---

## MEDIUM SEVERITY ISSUES — Structural Gaps

---

### ISSUE 16: No Pagination — All Data Loaded at Once

Every service loads the entire dataset in a single call (`[...applicationsStore]` — all 50 records; `[...mockUsers]` — all 100 records). In production, the backend will paginate responses (`?page=1&limit=20`). No list page has pagination UI or the ability to handle paginated API responses.

---

### ISSUE 17: No Error State in Any Page Component

Every page tracks `isLoading` but has no `error` state. If the real API returns a 500 or a network failure occurs, the page will silently display a blank empty state with no message. Users will have no way to know something went wrong.

**Fix Required:** Add `const [error, setError] = React.useState<string | null>(null)` to every page and render a visible error UI block when `error` is non-null.

---

### ISSUE 18: No Fetch Abort / Potential Memory Leaks

All `useEffect` data fetching calls have no cleanup or abort controller. If a user navigates away before the fetch resolves, the `.then(setData)` callback will fire on an unmounted component. With real API latency this becomes a reliable source of memory leaks.

**Fix Required:** Use `AbortController` with native `fetch`, or adopt a data-fetching library (SWR or TanStack Query) that handles cancellation automatically.

---

### ISSUE 19: `rememberMe` Checkbox is Cosmetic Only

**File:** `src/features/auth/components/LoginForm.tsx`

The "Remember me for 30 days" checkbox is rendered in the UI and captured by React Hook Form, but its value is never read in `onSubmit` and never forwarded to the auth store. A real backend uses this flag to issue either a short-lived or long-lived JWT. Currently it has no effect.

---

### ISSUE 20: No File Upload Infrastructure

The following fields point to fake static strings in the mock data:

| Field | Type | Fake Value |
|---|---|---|
| `StudentProfile.resumeUrl` | `string?` | `/uploads/alex-mensah-resume.pdf` |
| `MentorVerification.credentialsUrl` | `string?` | `https://catalyst.edu.gh/docs/credentials-sj.pdf` |
| `EmployerVerification.documentsUrl` | `string?` | `https://catalyst.edu.gh/docs/hubtel-registration.pdf` |

There is no file input UI, no file upload service method, no multipart form data handling, and no cloud storage integration (S3, Firebase Storage, or Cloudinary) anywhere in the codebase. File uploads affect three core platform workflows: mentor credential verification, employer company verification, and student resume submission.

---

### ISSUE 21: `NotificationInbox` Directly Imports the Admin Service

**File:** `src/features/shared/components/NotificationInbox.tsx`

```typescript
import { NotificationService } from "@/features/admin/services/notification.service"
```

The shared `NotificationInbox` component used by Student, Mentor, and Employer portals imports directly from the admin feature domain. When replaced with real APIs, the admin announcement management endpoint and the student/mentor/employer read endpoint will be separate routes with different auth scopes. This coupling must be broken.

**Fix Required:** Create a dedicated `NotificationService` inside `src/features/shared/services/` that calls the appropriate read-only announcements endpoint.

---

### ISSUE 22: Message `senderId`/`recipientId` Not Linked to Real Users

**File:** `src/features/mentor/types/mentor.types.ts`

The `Message` interface has `senderId` and `recipientId` fields, but in all mock data these are set to static strings like `"mentor-sarah"` or `"student-alex"` that do not correspond to any real `user.id` values in the system. When a real user sends a message, `senderId` must come from `useAuthStore().user.id` and `recipientId` must be a real user ID fetched from the backend.

---

### ISSUE 23: Mentor Student List Is Not Tied to Real Assignments

**File:** `src/features/mentor/services/mockData.ts`

The mentor portal shows 25 generic generated students assigned to the mentor. These have no link to real student accounts in the system. In a real backend, students are assigned to mentors through a relational table and `GET /api/mentor/students` should return only students assigned to the logged-in mentor's `user.id`.

---

## SUMMARY TABLE

| # | Issue | Severity | Portal |
|---|---|---|---|
| 1 | Password not passed to `login()` | 🔴 CRITICAL | All |
| 2 | Password not passed to `registerUser()` | 🔴 CRITICAL | Auth |
| 3 | User ID regenerated on every login | 🔴 CRITICAL | All |
| 4 | No auth token / JWT storage | 🔴 CRITICAL | All |
| 5 | Onboarding data only `console.log()`'d | 🔴 CRITICAL | All |
| 6 | `createOpportunity()` hardcodes Hubtel identity | 🔴 CRITICAL | Employer |
| 7 | `createAnnouncement()` hardcodes admin author | 🔴 CRITICAL | Admin |
| 8 | Duplicate `UserRole` type in two features | 🟠 HIGH | Student, Auth |
| 9 | `Opportunity` type has two incompatible shapes | 🟠 HIGH | Student, Employer |
| 10 | Student and Employer application stores unlinked | 🟠 HIGH | Student, Employer |
| 11 | `matchScore` is hardcoded static data | 🟠 HIGH | Student |
| 12 | Marketplace directly mutates shared array | 🟠 HIGH | Student |
| 13 | Skills stored as string, typed as `Skill[]` object | 🟠 HIGH | Student, Auth |
| 14 | Settings changes not persisted across refresh | 🟠 HIGH | All |
| 15 | `MentorProfile` has no `id` field | 🟠 HIGH | Mentor |
| 16 | No pagination on any list page | 🟡 MEDIUM | All |
| 17 | No error state on any page component | 🟡 MEDIUM | All |
| 18 | No fetch abort / memory leak risk | 🟡 MEDIUM | All |
| 19 | `rememberMe` checkbox is cosmetic | 🟡 MEDIUM | Auth |
| 20 | No file upload infrastructure | 🟡 MEDIUM | Student, Mentor, Employer |
| 21 | `NotificationInbox` imports admin service directly | 🟡 MEDIUM | Student, Mentor, Employer |
| 22 | Message sender/recipient not linked to real users | 🟡 MEDIUM | All |
| 23 | Mentor student list not tied to real assignments | 🟡 MEDIUM | Mentor |

---

## RECOMMENDED INTEGRATION ORDER

### Phase 7A — Auth Foundation
1. Fix password passing in `login()` and `registerUser()`
2. Add `accessToken` to auth store + HTTP interceptor to attach token to all requests
3. Wire real JWT login — remove random ID generation
4. Submit onboarding form data to the backend

### Phase 7B — Data Type Normalization
5. Create `src/types/shared.types.ts` with canonical entity types
6. Reconcile the two `Opportunity` shapes into one API contract
7. Add `id` field to `MentorProfile`

### Phase 7C — Service Layer Swap
8. Replace each `XxxService` method's `setTimeout` mock with real `fetch()` calls
9. Fix hardcoded `companyId` and `author` values (Issues 6–7)
10. Fix direct array mutation in `marketplace.service.ts` (Issue 12)
11. Fix skills string-to-object mismatch (Issue 13)

### Phase 7D — UI Hardening
12. Add `error` state to all page components
13. Add pagination controls to all list and table pages
14. Add file upload UI and cloud storage integration
15. Add fetch `AbortController` cleanup or migrate to TanStack Query / SWR

---

*Document generated: July 24, 2026 | Catalyst Platform v0.6.0*
