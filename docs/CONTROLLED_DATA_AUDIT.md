# Catalyst Controlled Data Audit Report

**Date:** July 24, 2026  
**Scope:** Full platform — Frontend forms, onboarding flows, dashboards, search/filter systems, matching logic, admin functions  
**Instruction:** Analysis only. No code changes. Blueprint for frontend redesign phase.

---

## Executive Summary

The Catalyst platform currently accepts the majority of its structured data as **free-text string inputs**. Skills, industries, career goals, academic programmes, availability, and technology stacks are all typed by hand with no normalization or validation against a predefined list.

This creates three compounding problems:

1. **Data Inconsistency** — "Python", "python", "PYTHON", "Python 3", and "Python programming" are stored as five different skill values that will never match each other in any filter, recommendation, or analytics query.
2. **Broken Matching** — The platform's mentor-student and employer-student matching algorithms rely on skill overlap. With free-text data, the overlap calculation will fail silently and return zero matches for users who have the same skill spelled differently.
3. **Unreliable Analytics** — Admin reports aggregating top demanded skills or top student competencies will fragment data into hundreds of near-duplicate rows instead of clean counts.

**Verdict:** Across all 4 portals, **19 fields must be converted to controlled data** before backend integration. 14 fields can safely remain free text.

---

## Section 1: User Role Field Analysis

### 1.1 Student — Field Classification

| Field | Form Location | Should Be Controlled? | Reason |
|---|---|---|---|
| Bio / Personal Statement | Onboarding Step 1 | **No — Free Text** | Personal, narrative, unique per person |
| LinkedIn URL | Onboarding Step 1 | **No — URL validated** | Unique user link |
| GitHub URL | Onboarding Step 1 | **No — URL validated** | Unique user link |
| Institution / University | Onboarding Step 2 | **YES** | Must match partner university list for analytics, matching, and verification |
| Major / Programme | Onboarding Step 2 | **YES** | Drives employer filtering by "BSc Computer Science" vs free-text variants |
| Academic Level | Onboarding Step 2 | **YES** | Should be a fixed set: 100, 200, 300, 400, Postgraduate Year 1/2 |
| Graduation Year | Onboarding Step 2 | **YES** | Should be a select of valid year range (2025–2030), not free text |
| Skills | Onboarding Step 3 | **YES** | Core matching field — most critical controlled data item |
| Career Goal | Onboarding Step 4 | **YES** | Used for employer filtering and mentor assignment |
| Career Status | Profile | **YES** | Should be a fixed set of statuses (Seeking Internship, Open to Full-Time, etc.) |
| Preferred Job Types | Profile | **YES** | Should be multi-select from fixed types (Internship, Graduate Program, etc.) |
| Preferred Work Modes | Profile | **YES** | Should be multi-select: Remote, Hybrid, On-site |
| Preferred Locations | Profile | **YES** | Should be multi-select from a city/country list |
| Preferred Industries | Profile | **YES** | Should be multi-select from standardized industry taxonomy |
| Availability Date | Profile | **No — Date picker** | A date, not a category |
| Project Title | Portfolio Form | **No — Free Text** | Unique project names |
| Project Description | Portfolio Form | **No — Free Text** | Narrative content |
| Tech Stack (Project) | Portfolio Form | **YES** | Same as Skills — must map to controlled skill list |
| Project Status | Portfolio Form | **YES** | Already controlled: "In Progress" / "Completed" — keep as-is ✅ |

### 1.2 Mentor — Field Classification

| Field | Form Location | Should Be Controlled? | Reason |
|---|---|---|---|
| Bio | Onboarding Step 1 | **No — Free Text** | Narrative professional summary |
| Company Name | Onboarding Step 1 | **No — Free Text** | Company names are too varied to predefine |
| Job Title | Onboarding Step 1 | **No — Free Text** | Too varied, but could have suggestions |
| Specialty Tags | Onboarding Step 2 | **YES** | Must match against student skill list for mentor-student pairing |
| Available Days | Onboarding Step 3 | **YES** | Should be multi-select checkboxes: Mon, Tue, Wed, Thu, Fri, Sat, Sun |
| Working Hours (Start/End) | Availability page | **YES** | Should be time-range pickers, not free text |
| Timezone | Availability page | **YES** | Should be a standardized timezone dropdown (GMT, WAT, etc.) |
| Industry | Profile Edit | **YES** | Must match standardized industry taxonomy |
| Expertise Areas | Profile Edit | **YES** | Must match controlled skill/domain list |

### 1.3 Employer — Field Classification

| Field | Form Location | Should Be Controlled? | Reason |
|---|---|---|---|
| Company Name | Onboarding / Profile | **No — Free Text** | Official registered name |
| Industry / Sector | Onboarding / Profile | **YES** | Core filter — "FinTech", "Fintech", "Financial Technology" are currently different values |
| Company Size / Scale | Onboarding / Profile | **YES** | Should be fixed bands: 1–50, 51–200, 201–500, 500+ employees |
| Location | Onboarding / Profile | **YES** | Should be a multi-select city/region list |
| Website URL | Onboarding | **No — URL validated** | Unique per company |
| Registration Number | Onboarding | **No — Free Text** | Official regulatory identifier |
| Company Overview | Profile Edit | **No — Free Text** | Narrative mission statement |
| Opportunity Title | Opportunity Form | **No — Free Text** | Job-specific, too varied to control |
| Opportunity Type | Opportunity Form | **YES** | Already controlled: INTERNSHIP, GRADUATE_PROGRAM, FULL_TIME, CONTRACT ✅ |
| Experience Level | Opportunity Form | **YES** | Already controlled: Internship, Entry Level, Junior, Mid Level ✅ |
| Work Mode | Opportunity Form | **YES** | Already controlled: On-site, Hybrid, Remote ✅ |
| Required Skills | Opportunity Form | **YES** | Must map to the same controlled skill list students use |
| Salary Range | Opportunity Form | **No — Free Text** | Too variable; ranges differ by role and currency |
| Application Requirements | Opportunity Form | **YES** | Should be multi-select checklist: Resume, Transcript, GitHub, Portfolio Link |
| Opportunity Description | Opportunity Form | **No — Free Text** | Narrative role description |
| Contact Email | Profile | **No — Email validated** | Unique contact |
| Contact Phone | Profile | **No — Format validated** | Unique contact |

### 1.4 Admin — Field Classification

| Field | Form Location | Should Be Controlled? | Reason |
|---|---|---|---|
| Announcement Title | Notifications page | **No — Free Text** | Unique per announcement |
| Announcement Message | Notifications page | **No — Free Text** | Narrative content |
| Announcement Type | Notifications page | **YES** | Already controlled: Career Event, Platform Update, Training Opportunity, Maintenance Notice ✅ |
| Announcement Audience | Notifications page | **YES** | Already controlled: All Users, Students, Mentors, Employers ✅ |
| Platform Settings toggles | Settings page | **YES** | Already boolean controls ✅ |

---

## Section 2: Frontend Form Audit

### All 10 Forms — Field-by-Field Assessment

---

**FORM: Student Onboarding — StepperWizard.tsx**

| Field | Current Input | Problem | Controlled? | Recommended Source |
|---|---|---|---|---|
| Bio | `<textarea>` free text | None — narrative content | No | Free text |
| LinkedIn URL | `<input type="text">` | URL format validated by Zod | No | Free text + URL validation |
| GitHub URL | `<input type="text">` | URL format validated by Zod | No | Free text + URL validation |
| Institution | `<input type="text">` | "UG", "Univ of Ghana", "University of Ghana" are stored as 3 different values | **YES** | Dropdown — `GET /api/institutions` |
| Major | `<input type="text">` | "BSc IT", "B.Sc. Information Technology", "Info Tech" all mean the same thing | **YES** | Searchable select — `GET /api/programmes` |
| Level | `<input type="text">` | "400", "Level 400", "4th Year" stored as different strings | **YES** | Select — fixed options: 100, 200, 300, 400, Postgrad Yr 1, Postgrad Yr 2 |
| Graduation Year | `<input type="text">` | "2026", "26", "2026/27" all accepted | **YES** | Select — year range dropdown 2025–2032 |
| Skills | `<input type="text">` free text, comma-separated | "React, react, React.js, ReactJS" all stored as different skills | **YES** | Tag multi-select — `GET /api/skills` |
| Career Goal | `<input type="text">` free text | "Software Engineer", "SWE", "Backend Dev" are unmatched in analytics | **YES** | Searchable select — `GET /api/career-goals` |

---

**FORM: Mentor Onboarding — StepperWizard.tsx**

| Field | Current Input | Problem | Controlled? | Recommended Source |
|---|---|---|---|---|
| Bio | `<textarea>` free text | None — narrative | No | Free text |
| Company | `<input type="text">` | Valid free text | No | Free text |
| Job Title | `<input type="text">` | Valid free text | No | Free text |
| Specialty Tags | `<input type="text">` comma-separated | Same as student skills — values must be identical for matching to work | **YES** | Tag multi-select — same `GET /api/skills` |
| Available Days | `<input type="text">` | "Mon-Wed", "Mondays", "Monday, Wednesday" are not parseable for scheduling | **YES** | Multi-select checkboxes: Mon / Tue / Wed / Thu / Fri / Sat / Sun |

---

**FORM: Employer Onboarding — StepperWizard.tsx**

| Field | Current Input | Problem | Controlled? | Recommended Source |
|---|---|---|---|---|
| Company Name | `<input type="text">` | Valid — official name | No | Free text |
| Website | `<input type="text">` | URL validated by Zod | No | Free text + URL validation |
| Company Size (Scale) | `<input type="text">` | "1000+ employees", "1000 employees", "Large" — no standard for filtering | **YES** | Select — `GET /api/company-sizes` |
| Industry Sector | `<input type="text">` | "FinTech", "Fintech & Digital Payments", "Financial Technology" all different | **YES** | Select — `GET /api/industries` |
| Registration Number | `<input type="text">` | Valid — official regulatory code | No | Free text |

---

**FORM: Employer Profile — CompanyProfileForm.tsx**

| Field | Current Input | Problem | Controlled? | Recommended Source |
|---|---|---|---|---|
| Company Name | `<input>` free text | Valid — no issue | No | Free text |
| Industry | `<input>` free text | Same issue as onboarding sector field | **YES** | Select — `GET /api/industries` |
| Company Size | `<input>` free text | Same issue as onboarding scale field | **YES** | Select — `GET /api/company-sizes` |
| Location | `<input>` free text | "Accra", "Accra, Ghana", "Greater Accra" are different filter values | **YES** | Select / searchable — `GET /api/locations` |
| Website URL | `<input>` | Zod URL validated | No | Free text + URL validation |
| Contact Email | `<input>` | Zod email validated | No | Free text + email validation |
| Contact Phone | `<input>` | Format-only validated | No | Free text + phone format |
| Company Overview | `<textarea>` | Narrative content | No | Free text |

---

**FORM: Opportunity Creation — OpportunityForm.tsx**

| Field | Current Input | Problem | Controlled? | Recommended Source |
|---|---|---|---|---|
| Position Title | `<input>` free text | Valid — job-specific | No | Free text |
| Opportunity Type | `<select>` | Already controlled — no issue ✅ | Already controlled | Enum |
| Experience Level | `<select>` | Already controlled — no issue ✅ | Already controlled | Enum |
| Work Mode | `<select>` | Already controlled — no issue ✅ | Already controlled | Enum |
| Location | `<input>` free text | "Accra", "Accra, GH", "Accra Ghana" — filtering broken | **YES** | Select — `GET /api/locations` |
| Deadline | `<input type="date">` | Date picker — fine | No | Date picker |
| Salary / Stipend | `<input>` free text | Valid — too variable to control | No | Free text |
| Required Skills | `<input>` comma-separated | Must match student skill list exactly for matching to work | **YES** | Tag multi-select — `GET /api/skills` |
| Application Requirements | Hardcoded array `["Resume / CV", "GitHub Portfolio"]` | Not user-configurable at all | **YES** | Multi-select checklist |
| Description | `<textarea>` | Narrative content | No | Free text |

---

**FORM: Portfolio Project — ProjectForm.tsx**

| Field | Current Input | Problem | Controlled? | Recommended Source |
|---|---|---|---|---|
| Title | `<input>` free text | Valid — project name | No | Free text |
| Description | `<textarea>` | Narrative content | No | Free text |
| Technologies Used | `<input>` comma-separated | "Next.js", "NextJS", "next js" all different | **YES** | Tag multi-select — `GET /api/skills` |
| GitHub URL | `<input>` | URL validated | No | Free text + URL validation |
| Live URL | `<input>` | URL validated | No | Free text + URL validation |
| Project Status | `<select>` | Already controlled — In Progress / Completed ✅ | Already controlled | Enum |

---

**FORM: Marketplace Filters — marketplace/page.tsx**

| Field | Current Input | Problem | Controlled? | Recommended Source |
|---|---|---|---|---|
| Search Query | `<input>` text search | Searches title + company — reasonable | No | Free text search |
| Type Filter | `<select>` | Already controlled ✅ | Already controlled | Enum |
| Work Mode Filter | `<select>` | Already controlled ✅ | Already controlled | Enum |
| Experience Filter | `<select>` | Already controlled ✅ | Already controlled | Enum |
| Location Filter | `<input>` free text | Substring match only — "Accra" doesn't match "Accra, Ghana" | **YES** | Select — `GET /api/locations` |
| Skills Filter | `<input>` free text | User types "React" but data has "React.js" — no match | **YES** | Select — `GET /api/skills` |

---

**FORM: Talent Discovery Filters — talent/page.tsx**

| Field | Current Input | Problem | Controlled? | Recommended Source |
|---|---|---|---|---|
| Search Query | `<input>` text | Searches name, programme, skills — reasonable | No | Free text search |
| Minimum Score | Range slider (0–100) | Numeric — fine | No | Range slider |
| Mentor Verified Toggle | Checkbox | Boolean — fine | No | Checkbox |

---

## Section 3: Controlled Data Candidate List

### A. Skills / Technologies
The most critical controlled data list. Used for student profiles, mentor specialties, opportunity requirements, and project tech stacks. All four must reference the same canonical list.

**Recommended starter set (expandable by Admin):**

```
Frontend: React, Next.js, Vue.js, Angular, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, Figma, UI/UX Design
Backend: Node.js, Express.js, Python, Django, FastAPI, Java, Spring Boot, PHP, Laravel, Go, Rust
Database: PostgreSQL, MySQL, MongoDB, Redis, Firebase, SQLite, Supabase
Mobile: Flutter, Dart, React Native, Swift, Kotlin, Android, iOS
Cloud/DevOps: AWS, Google Cloud, Azure, Docker, Kubernetes, Linux, CI/CD, Git, GitHub Actions
Data/AI: Data Analysis, Machine Learning, Pandas, NumPy, Scikit-Learn, TensorFlow, PowerBI, SQL
Security: Network Security, Cybersecurity, Penetration Testing, SIEM, Compliance
Other: REST API, GraphQL, Microservices, Agile/Scrum, System Design, Problem Solving
```

### B. Career Goals / Roles
Used for student onboarding and employer search targeting.

```
Software Engineer, Backend Developer, Frontend Developer, Full-Stack Developer,
Mobile App Engineer, DevOps Engineer, Cloud Solutions Architect, Data Analyst,
Data Scientist, Machine Learning Engineer, Cybersecurity Analyst, Network Engineer,
Database Administrator, Product Manager, UI/UX Designer, QA/Test Engineer,
IT Support Specialist, Business Analyst, Systems Analyst
```

### C. Industry Sectors
Used for employer profiles, company onboarding, and student preferred industries.

```
Financial Technology (FinTech), Telecommunications, E-Commerce & Retail,
Software & SaaS, Cloud Computing & Infrastructure, Cybersecurity,
Health Technology (HealthTech), Education Technology (EdTech),
Media & Entertainment, Logistics & Supply Chain, Agriculture Technology (AgriTech),
Banking & Finance, Government & Public Sector, NGO & Non-Profit,
Manufacturing & Engineering, Consulting & Professional Services
```

### D. Academic Information

**Institutions (Ghana-specific — expandable):**
```
University of Ghana (UG), Kwame Nkrumah University of Science and Technology (KNUST),
University of Cape Coast (UCC), Ashesi University, Ghana Institute of Management and Public Administration (GIMPA),
University of Professional Studies Accra (UPSA), Academic City College,
Accra Technical University, Koforidua Technical University, Amalitech Training Academy
```

**Programmes:**
```
BSc Computer Science, BSc Information Technology, BSc Computer Engineering,
BSc Software Engineering, BSc Data Science, BSc Electrical Engineering,
MSc Information Technology, MSc Computer Science, MSc Data Science,
MBA Technology Management, HND Information Technology
```

**Academic Levels:**
```
Level 100, Level 200, Level 300, Level 400, Postgraduate Year 1, Postgraduate Year 2, Alumni/Graduate
```

### E. Experience Levels
```
Internship (0 experience), Entry Level (0–1 year), Junior (1–3 years),
Mid Level (3–5 years), Senior (5+ years)
```

### F. Mentorship Availability
**Days:**
```
Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
```
**Timezones:**
```
GMT (Ghana Mean Time / UTC+0), WAT (West Africa Time / UTC+1), EAT (East Africa Time / UTC+3),
CET (Central European Time / UTC+1), BST (British Summer Time / UTC+1)
```

### G. Employer / Opportunity Data

**Company Size Bands:**
```
1–10 Employees (Startup), 11–50 Employees (Small), 51–200 Employees (Medium),
201–500 Employees (Large), 500+ Employees (Enterprise)
```

**Application Requirements:**
```
Resume / CV, Cover Letter, GitHub Portfolio Link, Live Demo / Portfolio URL,
Academic Transcript, Degree Certificate, Mentor Verification Letter,
Professional Reference, Certifications, Writing Sample
```

### H. Portfolio / Project Data

**Project Categories:**
```
Web Application, Mobile Application, API / Backend Service, Data Science / ML Model,
Desktop Application, IoT / Embedded System, DevOps / Infrastructure, Research / Paper,
Open Source Contribution, UI/UX Design
```

**Project Status:** (Already controlled)
```
In Progress, Completed
```

---

## Section 4: Data Consistency Risk Analysis

### Risk 1: Skills Mismatch — HIGH PRIORITY

**Scenario:**
- Student enters during onboarding: `"React, Typescript, node.js"`
- Employer enters in opportunity form: `"React, TypeScript, Node.js"`
- Platform runs skill overlap matching

**Result:** Zero matches despite identical skills. The strings `"Typescript"` ≠ `"TypeScript"` and `"node.js"` ≠ `"Node.js"` under case-sensitive string comparison.

**Impact:** Mentor-student pairing, employer-student matching, marketplace recommendations — all three core value-add features fail silently.

---

### Risk 2: Industry Mismatch — MEDIUM

**Scenario:**
- Employer onboards with sector: `"FinTech & Digital Payments"`
- Student sets preferred industry: `"Financial Technology"`
- Admin report groups by industry sector

**Result:** Two records that represent the same sector appear as separate categories in analytics. The employer and student are never cross-matched on industry preference.

---

### Risk 3: Institution Mismatch — MEDIUM

**Scenario:**
- Student enters institution: `"KNUST"`
- Analytics report queries for `"Kwame Nkrumah University of Science and Technology"`

**Result:** The student is not counted in the KNUST cohort report. Partnership analytics for university engagement will be inaccurate.

---

### Risk 4: Career Goal Mismatch — HIGH

**Scenario:**
- Student career goal: `"Software Engineer"`
- Mentor expertise area: `"Software Engineering"`
- Mentor assignment algorithm checks for overlap

**Result:** "Software Engineer" ≠ "Software Engineering" — no match found. The student is assigned to a less relevant mentor.

---

### Risk 5: Location Filter Failure — MEDIUM

**Scenario:**
- Opportunity location stored as: `"Accra, Ghana"`
- Student filters marketplace with location text input: `"Accra"`

**Result:** The substring match `"Accra, Ghana".includes("Accra")` happens to work by coincidence. But `"Greater Accra"` doesn't match `"Accra"`. And international comparisons completely break.

---

### Risk 6: Tech Stack Project Matching — HIGH

**Scenario:**
- Student portfolio project tech stack: `["Next.js", "PostgreSQL", "IoT"]`
- Employer filters talent by skill: `"NextJS"`

**Result:** Zero results. The employer cannot find the student even though the student has the exact skill under a different label.

---

### Risk 7: Analytics Fragmentation — HIGH

**Scenario:**
- Admin opens Skills Demand Report
- Underlying skill data contains: "React", "React.js", "ReactJS", "react", "React JS", "React 18"

**Result:** The report shows 6 separate skill entries instead of one consolidated "React" count. The analytics are meaningless for skills-based reporting.

---

## Section 5: Database Impact Analysis

The platform currently has no live database — this section describes the schema changes required when the database is built.

### Current Problematic Pattern

```
Student table:
  skills = "React, TypeScript, Python"  ← single comma-separated string column

Opportunity table:
  requiredSkills = ["React", "TypeScript"]  ← JSON array (still not normalized)
```

### Required Database Architecture

**Skill Reference Table:**
```sql
Skill
  id          INT PRIMARY KEY AUTO_INCREMENT
  name        VARCHAR(100) UNIQUE  -- "React"
  category    VARCHAR(50)          -- "Frontend"
  createdAt   DATETIME
```

**Many-to-Many Join Tables:**
```sql
StudentSkill
  studentId   INT REFERENCES Student(id)
  skillId     INT REFERENCES Skill(id)
  level       INT  -- 0-100 proficiency
  PRIMARY KEY (studentId, skillId)

OpportunitySkill
  opportunityId  INT REFERENCES Opportunity(id)
  skillId        INT REFERENCES Skill(id)
  PRIMARY KEY (opportunityId, skillId)

MentorSpecialty
  mentorId    INT REFERENCES Mentor(id)
  skillId     INT REFERENCES Skill(id)
  PRIMARY KEY (mentorId, skillId)
```

**Other Reference Tables Required:**
```sql
Institution (id, name, shortName, location, type)
Programme (id, name, institutionId, level)
Industry (id, name, sector, description)
Location (id, city, region, country, countryCode)
CompanySize (id, label, minEmployees, maxEmployees)
CareerGoal (id, title, description, industryId)
MentorshipAvailability (id, mentorId, dayOfWeek, startTime, endTime, timezone)
```

### Existing Fields That Become Foreign Keys

| Current Column | Current Type | Changes To |
|---|---|---|
| `Student.skills` | `string` | Removed → `StudentSkill` join table |
| `Student.institution` | `string` | → `institutionId INT FK` |
| `Student.major` | `string` | → `programmeId INT FK` |
| `Student.careerGoals` | `string[]` | → `StudentCareerGoal` join table |
| `Student.preferredIndustries` | `string[]` | → `StudentIndustry` join table |
| `Opportunity.requiredSkills` | `string[]` | → `OpportunitySkill` join table |
| `Opportunity.location` | `string` | → `locationId INT FK` |
| `Employer.industry` | `string` | → `industryId INT FK` |
| `Employer.companySize` | `string` | → `companySizeId INT FK` |
| `MentorProfile.specialty` | `string` | → `MentorSpecialty` join table |

---

## Section 6: API Impact Analysis

### APIs That Currently Accept Free Text That Must Change

| Endpoint (Future) | Field | Current | Required Change |
|---|---|---|---|
| `POST /api/auth/onboarding/student` | `skills` | `"React, TypeScript"` string | `skillIds: [1, 7]` integer array |
| `POST /api/auth/onboarding/student` | `institution` | `"University of Ghana"` string | `institutionId: 3` |
| `POST /api/auth/onboarding/student` | `major` | `"BSc Information Technology"` string | `programmeId: 12` |
| `POST /api/auth/onboarding/student` | `careerGoal` | `"Software Engineer"` string | `careerGoalId: 5` |
| `POST /api/auth/onboarding/mentor` | `specialty` | `"React, UI/UX"` string | `skillIds: [1, 14]` array |
| `POST /api/auth/onboarding/employer` | `sector` | `"FinTech"` string | `industryId: 2` |
| `POST /api/opportunities` | `requiredSkills` | `["React", "Node.js"]` string array | `skillIds: [1, 3]` integer array |

### New Reference Data APIs Required

```
GET  /api/skills                  Returns all skills, filterable by category
GET  /api/skills?category=Frontend
GET  /api/institutions            Returns all partner institutions
GET  /api/programmes              Returns all academic programmes
GET  /api/industries              Returns all industry sectors
GET  /api/locations               Returns all supported cities/regions
GET  /api/career-goals            Returns all standard career role titles
GET  /api/company-sizes           Returns company size band labels
```

All reference API responses follow the pattern:
```json
[
  { "id": 1, "name": "React", "category": "Frontend" },
  { "id": 2, "name": "Python", "category": "Backend" }
]
```

### Matching API Requirements

The following endpoint must exist for the platform's matching features to work correctly:

```
GET /api/students/:id/opportunity-matches
  → Returns opportunities ranked by skill overlap (server-side computation)

GET /api/opportunities/:id/candidate-matches
  → Returns students ranked by skill overlap with the opportunity

GET /api/mentors/match?studentId=:id
  → Returns mentors whose specialty skills overlap with student's skills
```

These cannot be built without controlled skill IDs — the matching logic requires exact ID-to-ID comparison, not string similarity.

---

## Section 7: Admin Management Requirements

Administrators must be able to manage all reference data through the Admin portal. The following controlled data lists should be admin-managed:

| Data Type | Why Admin Controls It |
|---|---|
| **Skills** | Prevents duplicates and fragmentation; admin curates the canonical taxonomy |
| **Career Goals / Roles** | Ensures alignment with partner employer role categories |
| **Industries** | Must match employer registration categories and student preferences exactly |
| **Partner Institutions** | Only verified partner universities should appear in student dropdowns |
| **Academic Programmes** | Must be tied to specific institutions (e.g. "BSc CS" at KNUST ≠ "BSc CS" at UG) |
| **Locations** | Governs which cities are supported for opportunity and talent filtering |
| **Company Size Bands** | Standardizes employer categorization for analytics |
| **Announcement Types** | Admin controls what categories of announcements can be sent |

**Recommended Admin UI additions:**
- A **Reference Data Management** section in the Admin portal
- CRUD pages for: Skills, Industries, Institutions, Programmes, Career Goals, Locations
- Ability to merge duplicate entries (e.g. merge "React.js" into "React")
- Soft-delete (deactivate) without deleting historical data

---

## Section 8: Priority Ranking

### Priority 1 — Critical Before Matching and Recommendation Features

These must be controlled before any matching logic is implemented. Without them, the platform's core value proposition fails.

| # | Item | Affected Feature |
|---|---|---|
| 1 | **Skills** (student, mentor, opportunity, project) | Mentor matching, Employer-Student matching, Marketplace recommendations |
| 2 | **Career Goals** | Mentor assignment, employer targeting |
| 3 | **Industry Sectors** (student preferences, employer profile) | Cross-portal industry filtering, analytics |
| 4 | **Opportunity Required Skills** (employer form) | Student match score computation |

### Priority 2 — Important for System Consistency

These affect data quality and analytics accuracy, but the platform can operate without them initially.

| # | Item | Affected Feature |
|---|---|---|
| 5 | **Partner Institutions** (student onboarding) | University cohort analytics, partnership reports |
| 6 | **Academic Programmes** | Graduate level filtering by employers |
| 7 | **Locations** (student, opportunity, employer) | Location-based filtering across all portals |
| 8 | **Company Size** | Employer categorization in Admin |
| 9 | **Availability Days / Timezone** (mentor) | Session scheduling accuracy |
| 10 | **Application Requirements** (opportunity form) | Consistent requirements checklist |

### Priority 3 — Future Improvements

These are enhancements that improve UX but do not break current functionality.

| # | Item | Note |
|---|---|---|
| 11 | **Project Categories** | Better portfolio browsing for employers |
| 12 | **Career Status** | Already partially controlled in student types |
| 13 | **Preferred Work Modes** | Already an enum in student types |
| 14 | **Preferred Job Types** | Already mapped to OpportunityType enum |

---

## Fields That Must Become Controlled Data

1. Student Skills (onboarding, profile)
2. Student Career Goals (onboarding, profile)
3. Student Institution (onboarding, profile)
4. Student Academic Programme / Major (onboarding, profile)
5. Student Academic Level (onboarding, profile)
6. Student Preferred Industries (profile)
7. Mentor Specialty Tags (onboarding, profile)
8. Mentor Available Days (onboarding, availability)
9. Mentor Working Hours / Timezone (availability page)
10. Employer Industry Sector (onboarding, profile)
11. Employer Company Size (onboarding, profile)
12. Employer / Opportunity Location (profile, opportunity form)
13. Opportunity Required Skills (opportunity form)
14. Opportunity Application Requirements (opportunity form — hardcoded, needs multi-select)
15. Project Tech Stack (portfolio form)
16. Marketplace Location Filter (filter UI)
17. Marketplace Skills Filter (filter UI)
18. Graduation Year (onboarding — should be a year-select, not free text)
19. Admin-managed Announcement Types (already controlled — verify stays consistent)

---

## Fields That Can Remain Free Text

1. Bio / Personal Statement (all roles)
2. LinkedIn URL (student, mentor)
3. GitHub URL (student, mentor)
4. Company Name (employer, mentor)
5. Job Title (mentor)
6. Registration / License Number (employer)
7. Company Overview / Mission (employer)
8. Opportunity Title (employer)
9. Opportunity Description / Role Requirements (employer)
10. Salary / Stipend Range (employer)
11. Project Title (student)
12. Project Description (student)
13. Project GitHub URL (student)
14. Project Live Demo URL (student)

---

## Frontend Components Requiring Changes

| Component | Required Change |
|---|---|
| `StepperWizard.tsx` — Student Step 3 | Replace text input with tag multi-select for skills |
| `StepperWizard.tsx` — Student Step 2 | Replace institution + major text inputs with searchable selects |
| `StepperWizard.tsx` — Student Step 2 | Replace level text input with fixed-option select |
| `StepperWizard.tsx` — Student Step 2 | Replace graduation year text input with year-range select |
| `StepperWizard.tsx` — Student Step 4 | Replace career goal text input with searchable select |
| `StepperWizard.tsx` — Mentor Step 2 | Replace specialty text input with tag multi-select (same skill list) |
| `StepperWizard.tsx` — Mentor Step 3 | Replace availability text input with day checkboxes + time pickers |
| `StepperWizard.tsx` — Employer Step 1 | Replace scale text input with company size select |
| `StepperWizard.tsx` — Employer Step 2 | Replace sector text input with industry select |
| `CompanyProfileForm.tsx` | Replace industry + size + location text inputs with selects |
| `OpportunityForm.tsx` | Replace skills string input with tag multi-select; location with select; add app-requirements multi-select |
| `ProjectForm.tsx` | Replace techStackRaw text input with tag multi-select |
| `OpportunityFilter.tsx` (marketplace) | Replace location + skills text inputs with selects |
| Student profile page (preferred industries) | Add multi-select for industries |
| Admin portal | Add Reference Data Management section for Skills, Industries, Institutions, etc. |

---

## Backend Changes Required Later

- Create reference data tables: `Skill`, `Industry`, `Institution`, `Programme`, `Location`, `CompanySize`, `CareerGoal`
- Create join tables: `StudentSkill`, `MentorSpecialty`, `OpportunitySkill`, `StudentCareerGoal`, `StudentIndustry`
- Seed all reference tables with starter data sets
- Build `GET /api/skills`, `GET /api/industries`, `GET /api/institutions`, `GET /api/programmes`, `GET /api/locations`, `GET /api/career-goals`, `GET /api/company-sizes` reference endpoints
- Build server-side skill-overlap matching algorithm for `matchScore` computation
- Build `GET /api/students/:id/opportunity-matches` and `GET /api/opportunities/:id/candidate-matches`

---

## Database Changes Required Later

- Remove all free-text skills columns; replace with join tables (see Section 5)
- Add foreign key columns: `institutionId`, `programmeId`, `industryId`, `locationId`, `companySizeId`, `careerGoalId`
- All existing string-based filtered fields become normalized integer IDs

---

## API Changes Required Later

- All onboarding endpoints receive ID arrays instead of comma-separated strings
- All opportunity creation endpoints receive `skillIds: number[]` instead of `requiredSkills: string[]`
- All search/filter endpoints accept controlled `skillId`, `industryId`, `locationId` query params instead of free-text strings

---

## Implementation Priority Order

1. **Define Skills Reference Data** — most critical, blocks all matching
2. **Update Student Onboarding Skills Field** — tag multi-select UI
3. **Update Mentor Specialty Field** — same skill list, same component
4. **Update Opportunity Required Skills Field** — same skill list
5. **Update Project Tech Stack Field** — same skill list
6. **Define Career Goals Reference Data**
7. **Update Student Onboarding Career Goal Field**
8. **Define Industry Reference Data**
9. **Update Employer Onboarding + Profile Sector Fields**
10. **Update Student Preferred Industries Field**
11. **Define Institutions + Programmes**
12. **Update Student Academic Fields** (institution, programme, level, year)
13. **Define Locations**
14. **Update all location fields and filters**
15. **Build Admin Reference Data Management UI**

---

## Recommended Next Step

**Implement the Skills controlled data system first** — it is the single highest-impact item and is required by all four portals simultaneously (Student profile, Mentor profile, Employer opportunity, Student portfolio). Until skills are controlled, none of the platform's matching, recommendation, or analytics features can function correctly.

Concretely, the next step is:

1. Create `src/data/skills.ts` — a static predefined skills list as a stopgap before the backend API is ready
2. Build a reusable `SkillTagInput` component — searchable, multi-select tag input that reads from the skills list
3. Replace all 4 comma-string skill inputs with `SkillTagInput`
4. Update Zod schemas to accept `string[]` (array) instead of `string`

This can be done entirely on the frontend with static data and requires zero backend changes.

---

*Document generated: July 24, 2026 | Catalyst Platform v0.6.0 — Pre-Backend Integration Blueprint*
