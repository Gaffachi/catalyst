# Changelog: Catalyst

All notable changes to the Catalyst project will be documented in this file.

## [Unreleased]

## [Phase 6: Cross-Portal Gaps Resolution & Full Feature Parity] - 2026-07-24
**Phase**: All Cross-Portal Gaps Resolved Across Student, Mentor, Employer, and Admin Spaces  
**Changes**:
- **Notifications Inbox**: Added `/notifications` page to Student, Mentor, and Employer spaces powered by a shared `NotificationInbox` component filtering Admin announcements.
- **Admin Personal Profile**: Deployed `/dashboard/admin/profile` page and `AdminProfileCard` component.
- **Admin Inbox & Dispute Channel**: Deployed `/dashboard/admin/messages` page with multi-thread stakeholder communication.
- **Student Interview Tracking**: Deployed `/dashboard/student/interviews` page and `InterviewCard` component.
- **Employer Recruitment Reports**: Deployed `/dashboard/employer/reports` page and `EmployerReportCard` component.
- **Mentor Analytics & Impact Workspace**: Deployed `/dashboard/mentor/analytics` page and `MentorAnalyticsCard` component.
- **Mentor Sidebar Restructuring**: Updated Mentor sidebar to category-grouped layout matching Student, Employer, and Admin navigation standards.
- **Student Mentor Availability Schedule**: Embedded read-only `MentorAvailabilityView` grid inside `/dashboard/student/mentorship`.
- **Student Employer Company Directory**: Deployed `/dashboard/student/employers` directory page under Opportunities.
**Phase**: Admin Platform Governance Workspace Deployed  
**Changes**:
- Deployed complete **Admin Workspace** under `/dashboard/admin/*`:
  - Created shared layout with dedicated sticky Admin Sidebar in [layout.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/layout.tsx).
  - Created governance control panel overview displaying 6 KPI stat cards and pending review queues in [page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/page.tsx).
  - Created user account management table supporting role/status filters and account suspension in [users/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/users/page.tsx).
  - Created student cohort outcome monitoring page tracking readiness and employment status in [students/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/students/page.tsx).
  - Created mentor verification and credentials audit queue in [mentors/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/mentors/page.tsx).
  - Created employer corporate registration audit table in [employers/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/employers/page.tsx).
  - Created opportunity listing approval and moderation board in [opportunities/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/opportunities/page.tsx).
  - Created institutional & corporate partnership manager in [partnerships/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/partnerships/page.tsx).
  - Created platform-wide intelligence and analytics dashboard in [analytics/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/analytics/page.tsx).
  - Created operational report generator and mock export center in [reports/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/reports/page.tsx).
  - Created platform broadcast announcement manager in [notifications/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/notifications/page.tsx).
  - Created governance policy and security settings in [settings/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/admin/settings/page.tsx).
**Phase**: Employer Recruitment Workspace Deployed  
**Changes**:
- Deployed complete **Employer Workspace** under `/dashboard/employer/*`:
  - Created shared layout with dedicated sticky Employer Sidebar in [layout.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/layout.tsx).
  - Created recruitment dashboard overview displaying 6 KPI stat cards and quick active opportunity list in [page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/page.tsx).
  - Created corporate profile edit and view components in [profile/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/profile/page.tsx).
  - Created opportunity management portal for posting and closing INTERNSHIP, GRADUATE_PROGRAM, FULL_TIME, and CONTRACT listings in [opportunities/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/opportunities/page.tsx).
  - Created verified talent discovery search engine with readiness score and mentor audit filters in [talent/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/talent/page.tsx).
  - Created candidate profile viewer displaying academic history, skills, and approved mentor evaluations in [candidates/[id]/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/candidates/%5Bid%5D/page.tsx).
  - Created 7-stage Kanban application screening board in [applications/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/applications/page.tsx).
  - Created technical screen and interview management hub in [interviews/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/interviews/page.tsx).
  - Created visual talent conversion pipeline funnel in [pipeline/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/pipeline/page.tsx).
  - Created candidate chat communications hub in [messages/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/messages/page.tsx).
  - Created recruitment analytics dashboard in [analytics/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/analytics/page.tsx).
  - Created employer portal notification settings in [settings/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/employer/settings/page.tsx).
**Phase**: Mentor Guidance & Competency Tracking Workspace Deployed  
**Changes**:
- Deployed complete **Mentor Workspace** under `/dashboard/mentor/*`:
  - Created shared layout with Mentor Sidebar and responsive menu structures in [layout.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/layout.tsx).
  - Created dashboard overview showing KPI stats row and quick task queues in [page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/page.tsx).
  - Created assigned student listings with table/card view toggle controls and detail drawers in [students/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/students/page.tsx).
  - Created project repository evaluation panel in [portfolio-reviews/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/portfolio-reviews/page.tsx).
  - Created student career readiness evaluation scorecard forms in [career-assessments/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/career-assessments/page.tsx).
  - Created video session appointment scheduler in [sessions/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/sessions/page.tsx).
  - Created schedule availability configuration calendar forms in [availability/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/availability/page.tsx).
  - Created message chat threads center in [messages/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/messages/page.tsx).
  - Created report and progress metric charts in [reports/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/reports/page.tsx).
  - Created profile edit credential form pages in [profile/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/profile/page.tsx).
  - Created settings pages for notification logs and visibility select preferences in [settings/page.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/dashboard/mentor/settings/page.tsx).
  - Established shared mock services and procedural cohort generator.

## [Phase 4E: Career Marketplace Enhancement] - 2026-07-23
**Phase**: Student Career Marketplace Completion  
**Changes**:
- Deployed general **Opportunity Marketplace** under `/dashboard/student/marketplace`:
  - Created [MarketplaceStats.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/MarketplaceStats.tsx) displaying overall openings and tracking indicators.
  - Created [OpportunityCategoryStats.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/OpportunityCategoryStats.tsx) mapping active listing distributions.
  - Created [EmploymentReadinessCard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/EmploymentReadinessCard.tsx) syncing eligibility checklists.
  - Created [RecommendedOpportunities.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/RecommendedOpportunities.tsx) presenting high-affinity career matches.
  - Created [OpportunityFilter.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/OpportunityFilter.tsx) with collapsible advanced filters.
  - Modified [OpportunityCard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/OpportunityCard.tsx) to enforce equal heights, title lines clamping, and custom actions supporting all 8 application stages.
  - Migrated student feature services to [marketplace.service.ts](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/services/marketplace.service.ts).

## [Phase 4D: Career Employment Pathway Enhancement] - 2026-07-23
**Phase**: Student Career & Employability Ecosystem Completion  
**Changes**:
- Deployed general **Opportunity Marketplace**:
  - Renamed internal UI components to represent general opportunities (Full-Time, Graduate Trainee, Contract, Internship).
  - Modified [OpportunityCard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/OpportunityCard.tsx) to implement color-coded type badges.
  - Updated [InternshipFilter.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/InternshipFilter.tsx) to support dropdown filtering by opportunity type categories.
- Enhanced **Student Profile Layout**:
  - Integrated Career Status options, preferred locations, and availability dates.
  - Built an interactive toggle controlling recruiter discovery matching.
- Expanded **Application Kanban Board**:
  - Upgraded [ApplicationBoard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/ApplicationBoard.tsx) to support a 7-stage pipeline (Applied, In Review, Assessment, Interview, Offers, Accepted, Rejected).
  - Added category badges directly on Kanban cards.
- Deployed **AI Career Recommendation Card**:
  - Renders matched opportunities with percentage ratings and matching reasons.
- Upgraded **Readiness Scores**:
  - Changed Career Readiness to Employment Readiness with detailed weighted parameter breakdowns.
- **UI Enhancements**:
  - Added "Home" navigation item to the public website navbar for improved navigation.

## [Phase 4: Student Dashboard Complete] - 2026-07-22
**Phase**: Student Dashboard Implementation  
**Changes**:
- Deployed Student Dashboard layouts:
  - [/dashboard/student](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/(dashboard)/dashboard/student/page.tsx): Main dashboard integrating career scorecards, profile gauges, skills portfolios, and application tracker boards.
  - [layout.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/app/(dashboard)/dashboard/student/layout.tsx): Sidebar navigation frames with mobile overlay menu drawers and sign-out buttons.
- Created student features components:
  - [DashboardHeader.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/DashboardHeader.tsx): Greeting headers showing student major/details.
  - [CareerScoreCard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/CareerScoreCard.tsx): Metric widget displaying index progress scores.
  - [ProfileCompletionCard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/ProfileCompletionCard.tsx): Checklist tracking profile setup gates.
  - [SkillProgressCard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/SkillProgressCard.tsx): Skill tags with platform course recommendation lists.
  - [PortfolioCard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/PortfolioCard.tsx): Codebase portfolios lists supporting new project uploads via form.
  - [MentorCard.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/MentorCard.tsx): Mentorship dashboard connecting booking schedulers and feedback logs.
  - [ApplicationTracker.tsx](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/components/ApplicationTracker.tsx): Application tracker with progress badges.
- Core hooks and data layers:
  - [student.service.ts](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/services/student.service.ts): Promise queries handling seed candidate 'Alex Mensah'.
  - [useStudentProfile.ts](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/hooks/useStudentProfile.ts): Profile hooks fetching mock student datasets.
  - [useCareerProgress.ts](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/hooks/useCareerProgress.ts): Computes indices from lists.
  - [student.types.ts](file:///C:/Users/USER/Documents/Gafaru/MPHIL/Second%20Sem/Assignments/IT%20PM/src/features/student/types/student.types.ts): Typings registry.
- Removed legacy duplicate `/dashboard/student` route pages to avoid path conflicts.

## [Phase 3: Authentication UI Complete] - 2026-07-22
**Phase**: Authentication & Onboarding UI Implementation  
- Configured routes: `/login`, `/register`, `/onboarding` onboarding steppers, and dashboard placeholders.
- Created Zustand session store: `use-auth-store.ts`.
- Built reusable authentication widgets.
- Updated authentication top navigations with Home redirect links.

## [Phase 2: Public Website Complete] - 2026-07-22
**Phase**: Public Platform Implementation  
- Created routes: `/about`, `/features`, `/mentorship`, `/internships`, `/employers`, and `/contact`.
- Created reusable components: `HeroSection.tsx`, `FeatureCard.tsx`, `UserRoleCard.tsx`, `SectionHeading.tsx`, and `CTASection.tsx`.
