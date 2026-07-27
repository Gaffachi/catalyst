Using the Controlled Data Audit Report as the source of truth, implement the Reference Data Foundation for the Catalyst platform.

This is an architectural refactoring phase.

DO NOT update individual Student, Mentor, Employer, or Admin forms yet.

DO NOT modify the matching engine yet.

DO NOT change existing business logic yet.

The goal is to build a reusable foundation that every module in the platform will use.

==================================================
PHASE OBJECTIVE
==================================================

Create a centralized Reference Data architecture that eliminates inconsistent free-text values across the platform and becomes the single source of truth for controlled data.

The foundation must be scalable, reusable, maintainable, and ready for future AI-powered recommendations and analytics.

==================================================
STEP 1 — REVIEW THE AUDIT
==================================================

Read the Controlled Data Audit Report and extract every field identified as controlled data.

Organize them into logical reference domains.

Examples include (but are not limited to):

• Skills
• Skill Categories
• Career Goals
• Career Categories
• Industries
• Institutions
• Academic Programmes
• Academic Levels
• Graduation Years
• Countries
• Regions
• Cities
• Company Sizes
• Opportunity Types
• Opportunity Categories
• Employment Types
• Work Modes
• Experience Levels
• Mentorship Goals
• Mentorship Areas
• Availability
• Portfolio Categories
• Technology Categories

Determine if additional reference data tables are required.

==================================================
STEP 2 — DESIGN THE REFERENCE DATA ARCHITECTURE
==================================================

Design a centralized Reference Data module.

Create a clear architecture showing:

Reference Data
    ├── Skills
    ├── Skill Categories
    ├── Career Goals
    ├── Career Categories
    ├── Industries
    ├── Institutions
    ├── Programmes
    ├── Locations
    ├── Company Sizes
    ├── Opportunity Types
    ├── Employment Types
    ├── Mentorship Goals
    ├── Experience Levels
    └── Other reference tables

Every reference table should support:

• id
• name
• description (where appropriate)
• active/inactive status
• display order
• createdAt
• updatedAt

Where relationships exist, model them correctly.

Example:

Institution
    ↓
Programme

Skill Category
    ↓
Skill

Career Category
    ↓
Career Goal

Country
    ↓
Region
    ↓
City

==================================================
STEP 3 — CREATE A REFERENCE DATA MODULE
==================================================

Create a dedicated module for reference data.

The module should contain:

controllers
services
repositories
validation
routes
types
constants

The module must become the single source of truth for all controlled platform data.

==================================================
STEP 4 — DESIGN REUSABLE FRONTEND COMPONENTS
==================================================

DO NOT replace existing forms yet.

Instead create reusable components.

Examples:

ReferenceSelect

ReferenceMultiSelect

SkillSelector

CareerGoalSelector

IndustrySelector

InstitutionSelector

ProgrammeSelector

LocationSelector

ExperienceLevelSelector

CompanySizeSelector

MentorshipGoalSelector

OpportunityTypeSelector

EmploymentTypeSelector

PortfolioCategorySelector

Every selector must:

• support searching
• support loading states
• support disabled states
• support validation
• support single select
• support multi select where needed
• support async loading
• be reusable throughout the platform

Do not connect them to forms yet.

==================================================
STEP 5 — DESIGN REFERENCE APIs
==================================================

Create a standard API design.

Example:

GET /reference/skills

GET /reference/career-goals

GET /reference/industries

GET /reference/programmes

GET /reference/institutions

GET /reference/locations

GET /reference/company-sizes

GET /reference/opportunity-types

GET /reference/experience-levels

etc.

Every endpoint should support:

search

pagination

sorting

active filtering

==================================================
STEP 6 — ADMIN MANAGEMENT FOUNDATION
==================================================

Design an Admin Reference Data Management area.

Admins should eventually be able to:

Create

Edit

Archive

Restore

Search

Sort

Filter

Manage relationships

Examples:

Skills

Skill Categories

Career Goals

Industries

Institutions

Programmes

Locations

Employment Types

Opportunity Types

Mentorship Goals

Company Sizes

Do not build the full UI yet.

Create the architecture and navigation only.

==================================================
STEP 7 — DATA MIGRATION PLAN
==================================================

Produce a migration strategy.

Identify:

Current free-text fields

Future reference IDs

Database migration order

API migration order

Frontend migration order

Rollback strategy

Do NOT migrate data yet.

==================================================
STEP 8 — IMPLEMENTATION ROADMAP
==================================================

Create a phased implementation roadmap.

Phase A
Reference database foundation

Phase B
Backend APIs

Phase C
Reusable frontend selectors

Phase D
Admin reference management

Phase E
Replace Student forms

Phase F
Replace Mentor forms

Phase G
Replace Employer forms

Phase H
Replace Admin forms

Phase I
Update matching engine

Phase J
Update search, filters, analytics and recommendations

==================================================
IMPORTANT RULES
==================================================

• Do not break existing functionality.
• Do not replace existing forms yet.
• Do not introduce mock data.
• Reuse existing architecture where possible.
• Build components that can be shared across the entire platform.
• Keep backward compatibility until migration is complete.
• Follow the existing Catalyst project architecture and coding standards.

==================================================
DELIVERABLES
==================================================

Produce a comprehensive implementation report containing:

1. Reference Data Architecture
2. Database Design
3. Backend Module Structure
4. API Design
5. Frontend Component Architecture
6. Admin Management Architecture
7. Migration Strategy
8. Risk Assessment
9. Dependency Analysis
10. Detailed phased implementation plan

At the end, provide a readiness assessment indicating whether the Reference Data Foundation is complete and ready for migrating the Student, Mentor, Employer, and Admin modules.