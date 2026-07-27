Using the completed FRONTEND_MIGRATION_BLUEPRINT.md and the implemented Reference Data Foundation as the source of truth, begin the Controlled Frontend Migration.

This is an implementation phase.

The objective is to migrate the frontend from free-text inputs to the new reusable Reference Data components without breaking existing functionality.

==================================================
IMPLEMENTATION PRINCIPLES
==================================================

Follow these principles throughout the migration:

• Preserve all existing functionality.
• Maintain backward compatibility.
• Do not modify business logic.
• Do not modify authentication.
• Do not modify APIs unless absolutely required.
• Reuse the existing Reference Data Foundation.
• Reuse the existing DomainSelector components.
• Keep all migrations incremental and reversible.
• Complete and verify one phase before beginning the next.
• Run TypeScript validation after each completed phase.
• Fix all compilation issues before proceeding.

==================================================
PHASE 1 — SHARED INFRASTRUCTURE
==================================================

Review all reusable components created in the Reference Data Foundation.

Verify:

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

PortfolioCategorySelector

Confirm that every selector:

• supports React Hook Form
• supports Zod validation
• supports loading states
• supports disabled states
• supports searching
• supports async data loading
• supports default values
• supports edit mode
• supports accessibility
• supports keyboard navigation

Fix any issues before migrating forms.

==================================================
PHASE 2 — LOW COMPLEXITY FORMS
==================================================

Begin with ONLY the low complexity forms identified in the blueprint.

These include:

• ProjectForm
• OpportunityForm
• CompanyProfileForm
• TalentFilters
• OpportunityFilter

Replace only the fields identified in the migration blueprint.

Leave all remaining free-text fields untouched.

Verify:

validation

saving

editing

loading

search

filtering

==================================================
PHASE 3 — STUDENT PROFILE
==================================================

Migrate Student Profile.

Replace only controlled fields.

Examples:

Skills

Career Goal

Industry

Institution

Programme

Academic Level

Location

Experience Level

Keep free text fields unchanged.

Verify:

Profile updates

Existing records

Editing

Display

==================================================
PHASE 4 — MENTOR PROFILE
==================================================

Replace:

Skills

Industries

Mentorship Goals

Experience

Location

Availability

Leave biography and narrative fields unchanged.

Verify:

Profile editing

Mentor search

Display

==================================================
PHASE 5 — EMPLOYER PROFILE
==================================================

Replace:

Industry

Company Size

Location

Opportunity Types

Employment Types

Keep:

Company Overview

Company Description

Mission

Vision

Free text.

==================================================
PHASE 6 — ONBOARDING WIZARDS
==================================================

Only after all profile pages are stable.

Update:

Student Stepper

Mentor Stepper

Employer Stepper

Replace only fields identified in the blueprint.

Maintain all existing navigation.

Maintain all existing validation.

==================================================
PHASE 7 — SEARCH & FILTERS
==================================================

Update:

Talent Search

Mentor Search

Employer Search

Opportunity Search

Replace free-text filters with Reference Data selectors.

Ensure filtering continues to function correctly.

==================================================
PHASE 8 — LEGACY CLEANUP
==================================================

After all forms are verified:

Remove obsolete text-input implementations that have been replaced.

Remove duplicate validation.

Remove unused helper functions.

Remove obsolete constants.

Do not remove anything still in use.

==================================================
QUALITY GATES
==================================================

After EACH phase:

Run TypeScript compilation.

Run linting.

Verify:

No runtime errors

No broken imports

No broken routing

No state management regressions

No validation regressions

No UI regressions

No accessibility regressions

No performance regressions

==================================================
DELIVERABLE AFTER EACH PHASE
==================================================

Produce:

Files modified

Components migrated

Fields migrated

Issues encountered

Issues fixed

Remaining work

Readiness for next phase

==================================================
FINAL DELIVERABLE
==================================================

When every migration phase is complete, generate a comprehensive Frontend Migration Report containing:

• Forms migrated
• Components reused
• Fields converted to controlled data
• Fields intentionally left as free text
• Removed legacy code
• Validation improvements
• Performance improvements
• Risk assessment
• Remaining technical debt
• Final migration readiness score

Do not skip phases.

Do not migrate high-complexity onboarding until all lower-risk forms have been successfully completed and verified.