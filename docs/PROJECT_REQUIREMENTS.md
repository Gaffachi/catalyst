# Project Requirements: Catalyst

This document details the functional and non-functional requirements for the Catalyst platform.

## 1. User Roles & Persona Permissions

The system operates under a role-based access control (RBAC) model supporting four user types:

- **Students**: Core beneficiaries. Access to self-assessment tools, resume building, portfolio showcases, mentor scheduling, internship postings, and application tracking.
- **Mentors**: Advisors. Access to scheduled dashboard, mentee matching lists, student portfolios reviews, feedback forms, and video/chat scheduler settings.
- **Employers**: Recruiters. Access to company profile designer, job/internship posting boards, applicant profile filters, resume reviews, and direct interview scheduling tools.
- **Administrators**: Managers. Access to platform configuration, user approval & moderation panels, global activity dashboard, content audit logs, and analytical reports.

## 2. Functional Requirements

### 2.1 User Registration & Onboarding
- **Multi-Role Authentication**: Sign-up flow must allow selecting a role (Student, Mentor, Employer).
- **Profile Onboarding Wizard**: A step-by-step form to collect crucial profile initialization data:
  - *Students*: Education details, core skills, career interests.
  - *Mentors*: Industry field, company, areas of expertise, years of experience.
  - *Employers*: Company name, website, industry category, registration verification documents.

### 2.2 Profile Management
- **Student Career Profile**:
  - Interactive profile summarizing education, project portfolios, technical skills, and certified badges.
  - Integration with Git repositories (mocked for demo) to pull active project listings.
- **Mentor Profile**:
  - Displaying bio, experience, verified credentials, and scheduling calendar integrations.
- **Employer Company Profile**:
  - Displaying branding assets, mission statements, culture highlights, and list of current openings.

### 2.3 Career Dashboard
- **Student Dashboard**:
  - Recommended actions (e.g., "Complete profile", "Apply to matched internship").
  - Skill progression tracker (radial or bar charts representing skill scores).
  - List of upcoming mentorship sessions and job application statuses.
- **Mentor/Employer Dashboards**:
  - Task lists (e.g., "Review candidate profiles", "Approve pending sessions").
  - Quick statistics overview.

### 2.4 Internship Coordination & Job Board
- **Job/Internship Posting**: Employers can post, edit, or archive internship roles with structured tags (e.g., Python, UI/UX, remote, full-time).
- **Application Engine**: Students can search, filter, and apply directly using their Catalyst profile.
- **Application Status Tracker**: Kanban-style board or list tracking stages (Applied, Under Review, Interviewing, Offered, Rejected).

### 2.5 Mentorship Engine
- **Mentor Discovery Directory**: Advanced search with filtering by industry, skills, and availability.
- **Booking System**: Interactive calendar allowing students to reserve open slots in a mentor’s schedule.
- **Feedback & Review Logs**: Archive of session summaries, career suggestions, and ratings given by mentors to students (and vice versa).

### 2.6 Digital Portfolio Builder
- **Project Showcases**: Students can list detailed academic or personal projects, including screenshots, tech stack tags, role descriptions, and project links.
- **Verification Badges**: Automated or admin-approved badges validating critical project work or course completions.

### 2.7 Analytics & Reporting
- **Platform Analytics (Admin)**: Charts displaying active users, application completion rates, top hired skills, and mentorship session counts.
- **Employer Metrics**: Visual dashboards tracking candidate applicant conversion, interview ratios, and diversity demographics.

## 3. Non-Functional Requirements

- **Usability (UX)**: Fast and fluid desktop and mobile responsive performance. Interactive micro-states (hovers, loaders, skeletal screens) to improve the perceived speed.
- **Accessibility (A11y)**: Conform to WCAG 2.1 AA standards, utilizing Radix UI primitives to ensure screen-reader friendliness and complete keyboard navigation.
- **Performance**: High performance targets (90+ mobile/desktop PageSpeed targets), leveraging Next.js App Router server components.
- **Security**: Data isolation between tenants. Standard OAuth token handling, CSRF prevention, and strict validation of inputs via Zod.
