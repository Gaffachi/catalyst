Using the completed Reference Data Foundation as the source of truth, perform a comprehensive Frontend Form Migration Audit for the Catalyst platform.

The Reference Data Foundation has already been implemented.

DO NOT modify any code yet.

DO NOT replace any form inputs yet.

The goal of this audit is to determine exactly how every frontend form should migrate from free-text inputs to the new reusable Reference Data components.

==================================================
OBJECTIVE
==================================================

Analyze the entire frontend and identify every form, every field, and every component that should be migrated to the Reference Data Foundation.

Generate a detailed migration blueprint before implementation.

==================================================
STEP 1 — DISCOVER ALL FORMS
==================================================

Scan the entire frontend and locate every form including but not limited to:

• Student Registration
• Student Onboarding
• Student Profile
• Mentor Registration
• Mentor Onboarding
• Mentor Profile
• Employer Registration
• Employer Profile
• Opportunity Creation
• Opportunity Editing
• Portfolio Creation
• Portfolio Editing
• Search Filters
• Admin Forms
• Settings Pages
• Any modal containing editable data

Create a complete inventory.

==================================================
STEP 2 — ANALYZE EVERY FIELD
==================================================

For every form identify:

Field Name

Current Component

Current Data Type

Current Validation

Current Data Source

Should this field use the Reference Data Foundation?

YES / NO

If YES:

Which Reference Domain?

Examples:

Skills

Career Goals

Industries

Institutions

Programmes

Locations

Company Sizes

Opportunity Types

Experience Levels

Employment Types

Mentorship Goals

Portfolio Categories

Technology Categories

==================================================
STEP 3 — COMPONENT MAPPING
==================================================

Map every field to the reusable components already created.

Example:

Current

<TextInput />

↓

New

<SkillSelector />

or

<ReferenceMultiSelect domain="skills" />

Produce a complete mapping table.

==================================================
STEP 4 — DEPENDENCY ANALYSIS
==================================================

Identify dependencies between fields.

Examples:

Institution
↓

Programme

Country
↓

Region
↓

City

Skill Category
↓

Skills

Industry
↓

Career Goals

Opportunity Type
↓

Employment Type

Identify every cascading selector required.

==================================================
STEP 5 — MIGRATION COMPLEXITY
==================================================

Assign every form a migration complexity.

Low

Medium

High

Explain why.

Example:

Student Profile

Complexity:
Medium

Reason:

Multiple reusable selectors

Existing validation

Dependent dropdowns

==================================================
STEP 6 — BACKWARD COMPATIBILITY
==================================================

Identify areas where existing functionality could break.

Check:

Validation

API payloads

State management

React Hook Form integration

Zod schemas

Zustand stores

Search

Filtering

Editing existing records

Create recommendations to preserve backward compatibility.

==================================================
STEP 7 — IMPLEMENTATION ORDER
==================================================

Create the safest implementation sequence.

Example:

Phase 1

Shared Components

Phase 2

Student Forms

Phase 3

Mentor Forms

Phase 4

Employer Forms

Phase 5

Portfolio

Phase 6

Search Filters

Phase 7

Admin Forms

Phase 8

Remove legacy free-text components

==================================================
STEP 8 — FINAL REPORT
==================================================

Generate:

# Frontend Migration Blueprint

Include:

Executive Summary

Forms Discovered

Fields Requiring Migration

Fields Remaining Free Text

Component Mapping Table

Dependency Map

Risk Assessment

Migration Complexity
Recommended Implementation Order

Estimated Files To Modify

Expected Breaking Changes

Rollback Strategy

==================================================
IMPORTANT RULES
==================================================

• Do not modify any files.
• Do not generate implementation code.
• Do not replace components yet.
• Only analyze and produce the migration blueprint.
• Reuse the existing Reference Data Foundation and reusable selector components.
• Ensure the migration minimizes disruption to the current platform.

At the end, provide a migration readiness score (0–100%) and clearly state whether the platform is ready to begin replacing form inputs with the new Reference Data components.