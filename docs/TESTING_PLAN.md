# Testing Plan: Catalyst

This plan defines the quality assurance methodologies applied during the development of the Catalyst frontend prototype.

## 1. Testing Strategy Overview

The testing strategy ensures component isolation, correct multi-role routing access, visual responsiveness, and form validation error-handling.

```
       +---------------------------------------------+
       |             End-to-End Testing              |
       |         (Core Multi-Role Workflows)         |
       +---------------------------------------------+
                              |
            +-----------------------------------+
            |        Integration Testing        |
            |   (Forms, Zustand State Mutations) |
            +-----------------------------------+
                              |
                  +-----------------------+
                  |     Unit Testing      |
                  |  (UI Elements, Utils) |
                  +-----------------------+
```

---

## 2. Testing Layers

### 2.1 Unit & Component Testing
- **Goal**: Validate that utility functions and individual atom UI components behave correctly under varying inputs.
- **Target Components**:
  - Button states (loading, disabled, hover).
  - Badge text color matching (e.g., green for Accepted, red for Rejected).
  - Form field custom validations (e.g., email patterns).
- **Execution**: Mock tests verifying component rendering without breaking styles or failing standard event triggers.

### 2.2 Integration & Form Validation Testing
- **Goal**: Ensure validation schemas prevent incorrect submissions.
- **Targets**:
  - Onboarding Stepper Form: verify that moving to Step 2 requires valid inputs in Step 1.
  - Job Posting Form: verify that empty salary ranges or missing description text trigger errors.
  - Mock DB State Updates: verify that applying to a job actually adds the application item to the student dashboard profile list.

### 2.3 Visual & Responsive Testing
- **Goal**: Ensure layout readability and compatibility across multiple display sizes.
- **Breakpoints Matrix**:
  - *Mobile (375px - 425px)*: verify sidebar collapses into a hamburger menu; dashboard metrics stack vertically.
  - *Tablet (768px)*: check grid transitions (e.g., two columns instead of one).
  - *Desktop (1024px - 1440px)*: full dashboard sidebars, data tables, and graphs visibility.

### 2.4 User Flow (End-to-End) Validation Scenarios

Here are the key paths that must work seamlessly:

#### Scenario A: Student Career Readiness Loop
1. User logs in -> selects "Student" role.
2. Navigates to **Portfolio** -> adds a new project with skills tags -> verifies card displays on profile.
3. Opens **Internship Hub** -> filters by skills -> clicks "Apply" -> verifies status changes to "Applied".
4. Navigates to **Mentors Directory** -> searches for a matching skill -> schedules session.

#### Scenario B: Employer Recruitment Flow
1. Recruiter registers -> creates company profile.
2. Posts a new internship opening -> fills in skills requirements.
3. Reviews applicant profiles -> switches an applicant's status from "Applied" to "Interviewing" via kanban.

#### Scenario C: Admin Management Flow
1. Administrator accesses panel -> views global registration chart.
2. Reviews list of pending employer verification requests -> clicks "Approve".
