# UI Wireframe Layouts: Catalyst

This document provides visual ASCII wireframe plans and key component mappings for the Catalyst platform.

---

## 1. Public Pages (Status: Fully Implemented)

### 1.1 Landing Page
```
+------------------------------------------------------------+
| [logo] Catalyst        Features   Contact      [Get Started] |
+------------------------------------------------------------+
|                                                            |
|          Empowering the Next Gen of ICT Professionals       |
|             Bridge the gap between class and career.       |
|                                                            |
|              [Explore Path]    [Join as Partner]           |
|                                                            |
|    +------------------+ +------------------+ +-----------+  |
|    | Student Paths    | | Mentors Hub      | | Employers |  |
|    | Skill profiles & | | Guide student    | | Search    |  |
|    | internships      | | growth paths     | | profiles  |  |
|    +------------------+ +------------------+ +-----------+  |
+------------------------------------------------------------+
```

### 1.2 Features Page
- **Grid Layout**: Three-column display detailing Career Guidance (with interactive skill mapping visual representations), Mentorship booking tools, and Internship coordination pipelines.

### 1.3 Contact Page
- **Split Layout**: Left side contains office address details and contact support emails. Right side hosts the Contact Form (Name, Email, Message, and Category dropdown) styled with clear validation states.

---

## 2. Authentication Flow

### 2.1 Login & Registration Screens
- **Side Panel Splitting**: Left side showcases a premium brand logo and testimonials slider. Right side displays a centered form with:
  - Input: Email
  - Input: Password (with hide/show toggler)
  - CTA button: `[Sign In]` or `[Create Account]`

### 2.2 Role Selection (Onboarding Wizard)
```
+------------------------------------------------------------+
|                       Step 1 of 3                          |
|                 Choose Your Platform Role                  |
|                                                            |
|   +-------------------+  +-------------------+  +-------+  |
|   |    [Student]      |  |     [Mentor]      |  | [Emp] |  |
|   | Build portfolio,  |  | Review student    |  | Hire  |  |
|   | search internships|  | work, guide paths |  | talent|  |
|   +-------------------+  +-------------------+  +-------+  |
|                                                            |
|                          [Next Step]                       |
+------------------------------------------------------------+
```

---

## 3. Student Dashboard & Sub-modules

### 3.1 Main Dashboard
```
+------------------------------------------------------------+
| [logo] Catalyst | Search...                      (profile) |
+------------------+-----------------------------------------+
| (nav)            | Welcome back, Alex!                     |
| > Dashboard      | +------------------+ +----------------+ |
|   Portfolio      | | Profile Progress | | Next Session   | |
|   Internships    | | [==== 80% ====]  | | Mentor: Sarah  | |
|   Mentorship     | +------------------+ | Time: 2:00 PM  | |
|                  |                      +----------------+ |
|                  | Recent Internship Application Statuses  | |
|                  | - Frontend Dev @ Google  [Interviewing] | |
|                  | - React intern @ Stripe  [Applied]      | |
+------------------+-----------------------------------------+
```

### 3.2 Portfolio Showcase
- **List-View Layout**: List of active academic projects. Each card contains the project name, links to GitHub/Live view, description, and list of technologies utilized. Clicking "Add Project" opens a responsive modal.

### 3.3 Internship Board
- **Filter-Search Layout**: Top search bar filters by role name, job types (Remote, Hybrid, On-site), and technology stack tags. Selecting a job opens a side panel detailing qualifications, role descriptions, and a `[Apply Now]` button.

### 3.4 Mentorship Booking
- **Profile Grid**: Grid of mentors showing photo, active fields (e.g., Cloud, Frontend, CyberSecurity), and review ratings. Clicking "Book Slot" displays an interactive inline calendar overlay showing available open booking times.

---

## 4. Mentor Dashboard

### 4.1 Mentee Management & Feedback Grid
```
+------------------------------------------------------------+
| [logo] Catalyst | Mentors Panel                 (profile) |
+------------------+-----------------------------------------+
| (nav)            | My Active Mentees                       |
| > Mentees        | +-------------------------------------+ |
|   Calendar       | | Name      | Status      | Feedback  | |
|   Evaluations    | |-----------|-------------|-----------| |
|                  | | Alex K.   | Active      | [Submit]  | |
|                  | | Sophia M. | Completed   | [Review]  | |
|                  | +-------------------------------------+ |
+------------------+-----------------------------------------+
```

---

## 5. Employer Dashboard

### 5.1 Internship Posting & Applicant Kanban
```
+------------------------------------------------------------+
| [logo] Catalyst | Recruiter Hub                 (profile) |
+------------------+-----------------------------------------+
| (nav)            | Candidate Applications Pipeline         |
|   Post Job       | +-----------+ +-----------+ +---------+ |
| > Pipeline       | | Applied   | | Interview | | Offered | |
|   Team           | |-----------| |-----------| |---------| |
|                  | | Alex (CV) | | Sarah (CV)| | Dave    | |
|                  | +-----------+ +-----------+ +---------+ |
+------------------+-----------------------------------------+
```

---

## 6. Admin Panel

### 6.1 Platform Analytics & Auditing
- **Charts Dashboard**: Visual metrics detailing user registration rates, application metrics, and active mentorship ratios.
- **Moderation Table**: Lists flagged jobs or unverified company profiles requiring manual verification checks with quick `[Approve]` / `[Reject]` controls.
