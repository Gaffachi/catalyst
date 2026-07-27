# Multi-Role Dashboard Architecture & UX Planning: Catalyst

This document defines the layouts, modules, component structure, and folder organizations for the Mentor, Employer, and Admin dashboards inside the Catalyst ecosystem.

---

## 1. Connected Ecosystem Map

```
                  [ Academic Department / Admin ]
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
  [ Students ]           [ Industry Mentors ]      [ Vetted Employers ]
Portfolio Showcases ──> Consultations Reviews ──> Internship Job Placements
```

---

## 2. Stakeholder Dashboards & Modules

### 2.1 Mentor Dashboard (`/dashboard/mentor`)
- **Purpose**: Allow industry professionals and faculty advisors to audit student skills and conduct consultations.
- **Key Modules**:
  - *Overview*: Summary indicators (assigned mentees, scheduled bookings tallies, pending portfolios reviews).
  - *Mentee Management*: Student profile overview grids, project repository checkoffs, competency ratings.
  - *Mentorship Sessions*: Interactive consultation schedule organizer.
  - *Feedback*: Form logs submitting session recommendations.
  - *Availability*: Calendar config toggling open consultancy hours.

### 2.2 Employer Dashboard (`/dashboard/employer`)
- **Purpose**: Connect partner organizations with emerging student cohorts.
- **Key Modules**:
  - *Company Profile*: Vetted profile attributes, sector tech stack preferences.
  - *Opportunity Management*: Creating and auditing internship job openings.
  - *Candidate Discovery*: Search grid filtering candidates by course levels and validated stack skills tags.
  - *Application Management*: Kanban pipeline tracking internship application stages:
    - `Applied` → `Review` → `Interview` → `Selected` → `Rejected`

### 2.3 Admin Dashboard (`/dashboard/admin`)
- **Purpose**: Department-level platform auditing and moderation dashboard.
- **Key Modules**:
  - *User Management*: Registry control lists spanning students, mentors, and employers.
  - *Employer Verification*: Moderator interface approving corporate account requests.
  - *Analytics*: Real-time analytics charts tracking registrations, sessions booked, and placement rates.
  - *Reports*: Downloadable CSV datasets reporting employability indicators.

---

## 3. Directory Structures

Features code will be organized inside separate folders:

```
src/features/
├── mentor/
│   ├── components/       # AssignedMenteesList, SessionsTimeline, FeedbackSubmitForm
│   ├── hooks/            # useMentorSessions, useMenteeProfiles
│   ├── services/         # mentor.service.ts
│   └── types/            # mentor.types.ts
│
├── employer/
│   ├── components/       # JobCreatorModal, CandidateSearchFilter, KanbanPipelineBoard
│   ├── hooks/            # useEmployerJobs, useApplicants
│   ├── services/         # employer.service.ts
│   └── types/            # employer.types.ts
│
└── admin/
    ├── components/       # UserAuditorTable, OrgVerificationPanel, AnalyticsCharts
    ├── hooks/            # usePlatformMetrics, useVerificationQueue
    ├── services/         # admin.service.ts
    └── types/            # admin.types.ts
```

---

## 4. Shared Component Reuse Blueprint

To enforce layout uniformity, Catalyst utilizes a shared layout package:

- **DashboardShell**: Standard viewport shell providing responsive grid spacing.
- **Sidebar**: Modular vertical navigation mapping active menu icons.
- **MetricCard**: Visual widget reporting integers, trend indices, and progress bars.
- **ProfileCard**: Card rendering bio metadata, links, and avatar components.
- **DataTable**: Table system supporting searching, column filtering, and paginations.
- **StatusBadge**: Badge component parsing active status codes into styled tag overlays.
- **Calendar**: Interactive calendar selector used for schedulers and bookings.

---

## 5. Implementation Sequence Recommendation

To construct the dashboard loops logically, I recommend the following sequence:

1.  **Employer Portal**: Permits creating internship openings (which will feed student opportunity search boards).
2.  **Mentor Portal**: Evaluates student codebase portfolios and session schedules.
3.  **Admin Portal**: Audits overall platform registrations, placements, and moderates company profiles.
