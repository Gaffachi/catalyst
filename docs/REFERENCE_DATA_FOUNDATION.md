# 🏛️ Reference Data Foundation — Implementation & Architecture Report

**Date:** July 24, 2026  
**Platform Version:** Catalyst v0.6.0  
**Phase:** Controlled Data Architecture Refactoring (Foundation Stage)

---

## 🎯 Executive Summary

The **Reference Data Foundation** for the Catalyst platform has been designed and implemented as a dedicated, decoupled feature module (`src/features/reference/`). This module serves as the **single source of truth** for all controlled data across all 4 platform portals (Student, Mentor, Employer, Admin).

This phase establishes the architectural foundation without breaking existing business logic, mutating active forms prematurely, or altering matching algorithms. The system is now fully equipped with:
- **Canonical Type Definitions** (`reference.types.ts`) for 19 controlled domains.
- **Seeded Reference Datasets** (`reference.data.ts`, `skills.data.ts`) containing 70+ structured skills, 15 industries, 10 institutions, 19 career goals, and location taxonomies.
- **Async Data Service** (`reference.service.ts`) providing search, filter, and lookup APIs.
- **Reusable Frontend Selectors** (`ReferenceSelect`, `SkillTagInput`, `DomainSelectors.tsx`) with searchability, loading states, multi-select tag displays, and validation support.
- **Barrel Module Exports** (`src/features/reference/index.ts`) for simple platform-wide integration.

---

## 1. Reference Data Architecture

The reference architecture organizes controlled data into a hierarchical tree of reference domains. Every domain model extends `ReferenceItem` to guarantee standard system properties.

```
Reference Module (src/features/reference/)
  ├── types/
  │   └── reference.types.ts (Canonical schemas & interfaces)
  ├── constants/
  │   ├── skills.data.ts (Taxonomy of 70+ skills across 9 categories)
  │   └── reference.data.ts (Institutions, Industries, Career Goals, Cities, etc.)
  ├── services/
  │   └── reference.service.ts (Single source of truth data fetcher)
  └── components/
      ├── ReferenceSelect.tsx (Generic single & multi-select UI)
      ├── SkillTagInput.tsx (Tag input with category filtering)
      └── DomainSelectors.tsx (10 pre-configured domain selector components)
```

### Standard Base Properties (`ReferenceItem`)
Every reference record contains:
- `id: number` — Primary key
- `name: string` — Display name / label
- `description?: string` — Optional contextual detail
- `isActive: boolean` — Soft-delete / active status toggle
- `displayOrder: number` — UI ordering preference
- `createdAt: string` — Timestamp
- `updatedAt: string` — Timestamp

### Domain Hierarchies & Relationships
```
[Country: GH] ──► [Region: Greater Accra] ──► [City: Accra]
[SkillCategory: Frontend] ──► [Skill: React (aliases: ["React.js"])]
[CareerCategory: Software Eng] ──► [CareerGoal: Backend Developer]
[Institution: UG] ──► [Programme: MSc Information Technology]
```

---

## 2. Database Design (Target Relational Schema)

When backend integration occurs (Phase 7), the simulated constants will map directly to this PostgreSQL / MySQL relational structure.

### Core Reference Tables
```sql
-- 1. Skills
CREATE TABLE skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE skill_aliases (
  id INT PRIMARY KEY AUTO_INCREMENT,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  alias VARCHAR(100) NOT NULL
);

-- 2. Career Goals
CREATE TABLE career_goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0
);

-- 3. Industries
CREATE TABLE industries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  sector VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE
);

-- 4. Institutions & Programmes
CREATE TABLE institutions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  short_name VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  location VARCHAR(150) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE programmes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institution_id INT REFERENCES institutions(id),
  name VARCHAR(200) NOT NULL,
  level VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- 5. Locations Taxonomy
CREATE TABLE countries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL
);

CREATE TABLE regions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  country_id INT REFERENCES countries(id),
  name VARCHAR(100) NOT NULL
);

CREATE TABLE cities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  region_id INT REFERENCES regions(id),
  country_id INT REFERENCES countries(id),
  name VARCHAR(100) NOT NULL,
  display_label VARCHAR(150) NOT NULL
);
```

### Join Tables (Entity Relationships)
```sql
CREATE TABLE student_skills (
  student_id VARCHAR(50) REFERENCES students(id),
  skill_id INT REFERENCES skills(id),
  proficiency_level INT DEFAULT 50,
  PRIMARY KEY (student_id, skill_id)
);

CREATE TABLE opportunity_required_skills (
  opportunity_id VARCHAR(50) REFERENCES opportunities(id),
  skill_id INT REFERENCES skills(id),
  PRIMARY KEY (opportunity_id, skill_id)
);

CREATE TABLE mentor_specialties (
  mentor_id VARCHAR(50) REFERENCES mentors(id),
  skill_id INT REFERENCES skills(id),
  PRIMARY KEY (mentor_id, skill_id)
);
```

---

## 3. Backend Module Structure

The backend reference module will mirror the frontend architecture for modularity:

```
src/modules/reference/
  ├── reference.controller.ts     # HTTP request handlers
  ├── reference.service.ts        # Business logic & caching layer
  ├── reference.repository.ts     # ORM / DB access methods
  ├── reference.router.ts         # Express / Next API route definitions
  ├── dtos/                       # Data Transfer Objects & Zod validation
  │   ├── create-reference.dto.ts
  │   └── query-reference.dto.ts
  └── types/                      # Canonical backend interfaces
```

---

## 4. API Design Specifications

All endpoints serve standardized JSON payloads with support for **searching**, **sorting**, **pagination**, and **active filtering**.

### Standard Endpoints
```http
GET /api/v1/reference/skills?category=Frontend&search=react
GET /api/v1/reference/career-goals?search=software
GET /api/v1/reference/industries
GET /api/v1/reference/institutions
GET /api/v1/reference/programmes?institutionId=1
GET /api/v1/reference/locations/cities?countryId=1
GET /api/v1/reference/company-sizes
GET /api/v1/reference/opportunity-types
GET /api/v1/reference/experience-levels
GET /api/v1/reference/mentorship-goals
GET /api/v1/reference/project-categories
```

### Response Format
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "React",
      "category": "Frontend",
      "aliases": ["React.js", "ReactJS"],
      "isActive": true,
      "displayOrder": 1
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 50
  }
}
```

---

## 5. Frontend Component Architecture

All UI components are decoupled from specific page forms and consume the `ReferenceDataService`.

```
Component Tree:
[SkillSelector] ──► [SkillTagInput] ──► [ReferenceDataService.getSkills()]
[CareerGoalSelector] ──► [ReferenceSelect] ──► [ReferenceDataService.getCareerGoals()]
[IndustrySelector] ──► [ReferenceSelect] ──► [ReferenceDataService.getIndustries()]
[InstitutionSelector] ──► [ReferenceSelect] ──► [ReferenceDataService.getInstitutions()]
[LocationSelector] ──► [ReferenceSelect] ──► [ReferenceDataService.getCities()]
```

### Component Capabilities
- **Searchable Dropdowns**: Real-time client-side substring matching on name & aliases.
- **Async Loading States**: Displays loading spinners while fetching options.
- **Form Integration Ready**: Fully compatible with `react-hook-form` `Controller` and standard state hooks.
- **Accessibility & UX**: Keyboard navigation support, clean tag dismissals, outside-click auto-dismiss.

---

## 6. Admin Management Architecture

Administrators will manage the reference data taxonomy through a dedicated Admin sub-navigation panel:

```
Admin Portal Dashboard
  └── Reference Data Management (/dashboard/admin/reference)
      ├── Skills Taxonomy Manager (Create, Edit, Merge Aliases, Toggle Status)
      ├── Career Goals Manager
      ├── Industries & Sectors Manager
      ├── Institutions & Programmes Manager
      └── Locations & Cities Manager
```

### Core Admin Operations
1. **Create / Edit**: Add new skills, industries, or institutions as industry demands evolve.
2. **Archive / Deactivate**: Soft-delete deprecated items without corrupting historical records.
3. **Merge Duplicate Entries**: Combine legacy string entries into a canonical ID (e.g. merge "ReactJS" into ID #1 "React").

---

## 7. Migration Strategy

To transition from the legacy free-text prototype to the Controlled Data Architecture without downtime:

1. **Step A: Parallel Storage** — Add new `skillIds: number[]` fields alongside legacy `skills: string` fields in user stores.
2. **Step B: Frontend Selector Swap** — Swap form inputs to `SkillTagInput` and `DomainSelectors`. Form submit sends both raw text (for backward compatibility) and array of `ids`.
3. **Step C: Data Normalization Script** — Run backend script mapping existing string entries to reference IDs using alias matching.
4. **Step D: Legacy Cleanup** — Deprecate string columns after all matching logic points to ID tables.

---

## 8. Risk Assessment & Mitigation

| Risk | Impact | Mitigation Strategy |
|---|---|---|
| Missing rare skill in controlled list | User unable to select exact skill | Include "Other" fallback category & Admin skill request queue |
| Legacy string data during transition | Broken matching engine | Keep alias mapping array in `Skill` entity to normalize legacy text |
| High latency on large reference dropdowns | Laggy UI response | Preload core datasets (`loadAll()`) during application startup |

---

## 9. Dependency Analysis

```
Reference Module Dependencies:
├── React 19 (UI components & hooks)
├── Lucide React (Icons: Search, Chevron, X, Check)
├── Tailwind CSS v4 (Styling & responsive layout)
└── Zod / React Hook Form (Form validation compatibility)
```

No external charting, heavy UI, or third-party select libraries were added — zero bundle bloat.

---

## 10. Detailed Phased Implementation Plan & Roadmap

```
[Phase A: Reference Data Architecture Foundation] ──► ✅ COMPLETE
  ├── Reference Data Types (reference.types.ts)
  ├── Seed Datasets (skills.data.ts & reference.data.ts)
  ├── Service Layer (reference.service.ts)
  └── Reusable Selectors (ReferenceSelect, SkillTagInput, DomainSelectors)

[Phase B: Form Migration] ──► NEXT
  ├── Step B1: Student Onboarding & Profile Form Swap
  ├── Step B2: Mentor Onboarding & Availability Swap
  ├── Step B3: Employer Opportunity Creation Form Swap
  └── Step B4: Student Portfolio Showcase Form Swap

[Phase C: Matching & Search Engine Integration]
  ├── Update Student-Opportunity MatchScore calculation to use ID intersection
  └── Update Talent Discovery & Marketplace filters to use controlled IDs

[Phase D: Admin Reference Management UI]
  └── Build Admin CRUD UI for reference taxonomy management
```

---

## 🏁 Readiness Assessment

**Status: 100% COMPLETE & READY FOR MODULE MIGRATION**

The **Reference Data Foundation** is fully established in `src/features/reference/`. All types, data sets, service methods, and domain selectors are built, exported, and ready to be integrated into Student, Mentor, Employer, and Admin forms in the next phase.

---

*Report written: July 24, 2026 | Catalyst Platform v0.6.0*
