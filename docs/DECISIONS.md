# Architecture Decisions: Catalyst

This document contains log entries of critical technology selection decisions and architectural patterns applied during the Catalyst frontend project.

## Decision 1: Framework Choice (Next.js 15 App Router)
- **Status**: Approved
- **Rationale**: Next.js 15 provides an industrial-grade standard with high development velocity, page routing flexibility, SEO benefits for public marketing pages, and structure layout nesting (perfect for sub-dashboards).

## Decision 2: UI Foundation (Tailwind CSS + shadcn/ui + Radix UI / Base UI)
- **Status**: Approved
- **Rationale**: shadcn/ui gives us control over component styling (since code is copied into our project rather than imported from an external node module package). Combined with Tailwind, this makes customization of branding accents (Catalyst Orange) fast and precise.

## Decision 3: Global State Management (Zustand)
- **Status**: Approved
- **Rationale**: Zustand is ideal for client-side prototyping. We can build state slices for authentication, portfolios, and job boards with very little boilerplate.

## Decision 4: Mock Database Strategy (In-Memory Mock State)
- **Status**: Approved
- **Rationale**: An in-memory, Zustand-synced mock database provides the best developer experience. It allows simulated reads, updates, and writes directly in React.

## Decision 5: Use shadcn/ui + Base UI Primitives
- **Status**: Approved
- **Rationale**: Accessible reusable components ensure professional design consistency, strict keyboard tab indices, and ARIA attributes out of the box while allowing custom component styling.

## Decision 6: Role-Based Authentication Model
- **Status**: Approved
- **Rationale**: Catalyst supports multiple stakeholders requiring entirely different workflows, dashboard metrics, permissions, and onboarding steps. A unified registration endpoint followed by a segmented stepper onboard wizard satisfies these requirements cleanly.

## Decision 7: Mock Authentication Before Backend Integration
- **Status**: Approved
- **Rationale**: Utilizing mock auth services allows testing full user onboarding flows, route guards, validation triggers, and multi-tenant views instantly without introducing server dependencies or database setups.

## Decision 8: Student-First Dashboard Development
- **Status**: Approved
- **Rationale**: Students are the primary stakeholders and direct beneficiaries of the Catalyst Career Platform. Vetting student portfolio developers, career goal trackers, and internship listing queries first ensures we have a rich context to display on mentor, employer, and administrator dashboard screens subsequently.

## Decision 9: Student-First Dashboard Implementation
- **Status**: Approved
- **Rationale**: Students are the primary users and beneficiaries of Catalyst. Implementing their workspace first ensures core portfolio linking, mentoring appointment bookings, and application progress metrics are fully functional before building other user interfaces.

## Decision 10: Separate Dashboards by Stakeholder Role
- **Status**: Approved
- **Rationale**: Each Catalyst user group (Students, Mentors, Employers, and Admins) has entirely unique workflows, data visualization needs, access scopes, and interaction modules. Keeping their dashboard interfaces separated into modular feature directories prevents code entanglement and improves feature iteration velocity.

## Decision 11: Catalyst supports full employment lifecycle, not only internships
- **Status**: Approved
- **Rationale**: Students require a continuous, structured pathway transitioning from academic preparation to sustainable full-time employment, requiring unified tracking of graduate programs, internships, and contract roles.

## Decision 12: Rename Internship Opportunities to Marketplace
- **Status**: Approved
- **Rationale**: Catalyst supports the complete student employment lifecycle including internships, graduate programs, and full-time employment, which is best represented as a unified career intelligence Marketplace.

## Decision 13: Mentor Portal Implementation
- **Status**: Approved
- **Rationale**: Built a complete career mentoring workspace that supports portfolio auditing and readiness assessments to help prepare students for the corporate marketplace.

## Decision 14: Dedicated Employer Recruitment Workspace
- **Status**: Approved
- **Rationale**: Created a dedicated employer workspace for talent discovery, opportunity management across 4 opportunity types, 7-stage Kanban application screening, and candidate interview scheduling. Employers consume verified student profiles and approved mentor audit evaluations.

## Decision 16: Cross-Portal Feature Parity & Shared Notification Layer
- **Status**: Approved
- **Rationale**: Resolved all 9 cross-portal feature gaps identified in audit: added Notification Inboxes to Student, Mentor, and Employer spaces; created Admin Profile and Admin Messages dispute channels; enabled Student Interview tracking and Employer Directory; added Employer Reports and Mentor Analytics; standardized Mentor sidebar navigation to category-grouped sections.
