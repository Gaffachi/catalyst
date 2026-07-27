# Student Dashboard Architecture & UX Planning: Catalyst

This document defines the layout grids, component structures, mock data schemas, and navigation guidelines for the Catalyst Student Dashboard.

---

## 1. Dashboard Purpose & Scope

The Student Dashboard serves as a **Career Command Center**. It helps students track their professional competencies, build verified portfolios, apply to coordinated internship listings, book mentoring calls, and audit placement goals.

---

## 2. Dashboard Information Architecture

The workspace is organized into seven sub-panels managed under the `/dashboard/student` route:

```
                  [ Student Dashboard ]
                            │
       ┌───────────┬────────┴──────────┬───────────┐
       ▼           ▼                   ▼           ▼
  [Overview]   [Portfolio]       [Internships]  [Mentorship]
   - Scores     - Projects        - Discovery    - Booking
   - Tasks      - Tech stacks     - Tracker      - Feedback
```

### 2.1 Overview Command Center
- **Objective**: Real-time progress monitoring.
- **Widgets**:
  - *Career Readiness Score*: Metric card displaying average competency assessment level.
  - *Profile Completion Tracker*: Visual slider showing completeness of profile steps.
  - *Reminders Panel*: Upcoming mentor session alerts and application status changes.

### 2.2 Career Profile
- **Objective**: General registry variables.
- **Fields**: Name, email, bio, LinkedIn, GitHub, programme (major), and level.

### 2.3 Skill Development
- **Objective**: Target stack gaps mapping.
- **Fields**: Current skills array, validated certifications, and courses list.

### 2.4 Portfolio Builder
- **Objective**: Project showcase cards.
- **Fields**: Project names, descriptors, tools used, repository links, and validation badges.

### 2.5 Internship Opportunities
- **Objective**: Discovery and query board.
- **Fields**: Position list, filters (Stack, type), company, description, and status.

### 2.6 Application Tracker
- **Objective**: Kanban status board tracking application progress:
  - `Applied` → `Under Review` → `Interviewing` → `Accepted` / `Rejected`

### 2.7 Mentorship Console
- **Objective**: Scheduler connection.
- **Fields**: Active mentors profiles, calendar slot selector, upcoming sessions details, and assessment log feedback records.

---

## 3. Component Hierarchy (`src/features/student/`)

The student features code is organized inside the student feature folder:

```
src/features/student/
├── components/
│   ├── DashboardHeader.tsx          # User welcome greetings and context titles
│   ├── CareerScoreCard.tsx          # Readiness gauge displays
│   ├── ProfileCompletionCard.tsx    # Completion progress bars
│   ├── SkillProgressCard.tsx        # Skill badges and gaps grids
│   ├── OpportunityCard.tsx          # Internship search listings cards
│   ├── ApplicationTracker.tsx       # Kanban pipeline checklists
│   ├── MentorCard.tsx               # Booking profile cards
│   └── PortfolioCard.tsx            # Project resume links cards
├── hooks/
│   ├── useStudentProfile.ts         # Hook fetching student attributes
│   └── useCareerProgress.ts         # Hook tracking application counts
├── services/
│   └── student.service.ts           # Client mock data queries
└── types/
    └── student.types.ts             # TypeScript definitions
```

---

## 4. Student Data Model Schema

```typescript
export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  badgeVetted: boolean
}

export interface Application {
  id: string
  jobTitle: string
  companyName: string
  appliedDate: string
  status: "Applied" | "Under Review" | "Interview" | "Accepted" | "Rejected"
}

export interface MentorSession {
  id: string
  mentorName: string
  date: string
  time: string
  status: "Scheduled" | "Completed" | "Cancelled"
  feedbackNotes?: string
}

export interface StudentProfile {
  id: string;
  name: string;
  programme: string;
  avatarUrl?: string;
  bio: string;
  skills: string[];
  careerGoals: string[];
  portfolio: Project[];
  applications: Application[];
  mentorSessions: MentorSession[];
  readinessScore: number; // 0 - 100
}
```

---

## 5. Dashboard Layout Design

- **Desktop View**: Split side layout:
  - *Left*: Fixed sidebar links (Overview, Portfolio, Jobs, Mentors).
  - *Right*: Active workspace panels with grid layouts.
- **Mobile View**: Stacked cards structure. Simple top mobile drawer menu and responsive padding configurations.

---

## 6. UX Design Principles

- **Motivating**: Uses badge indicators, progress bars, and upcoming steps instead of dry tables.
- **Career-Focused**: Emphasizes technical stacks, github links, and mentor reviews.
- **Professional**: Uses Slate scale colors with Catalyst Orange highlights. Avoids noisy dashboard widgets.

---

## 7. Presentation Seed Data Profile

- **Student ID**: `std-alex-mensah`
- **Name**: `Alex Mensah`
- **Programme**: `MSc Information Technology`
- **Skills**: `React`, `Python`, `Networking`, `Database Design`
- **Career Goal**: `Software Engineer`
- **Profile Completion**: 85%
- **Career Readiness Score**: 78%
