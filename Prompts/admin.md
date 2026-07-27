Proceed with Phase 5C: Admin / Coordinator Portal Implementation.

The following Catalyst stakeholder portals are completed:

✓ Student Portal
✓ Mentor Portal
✓ Employer Portal

Do not modify existing Student, Mentor, or Employer features.

Create the Admin / Coordinator Workspace that provides platform governance, verification workflows, analytics, and operational management.

================================================

OBJECTIVE

Build a professional Admin Portal that enables Catalyst coordinators to:

- manage platform users
- verify mentors
- verify employers
- approve opportunities
- monitor student outcomes
- manage partnerships
- analyze platform performance
- generate reports
- manage platform announcements


The Admin Portal is the governance layer connecting:

Student

Mentor

Employer

Admin


================================================

ROUTES

Create:


/dashboard/admin


/dashboard/admin/users


/dashboard/admin/students


/dashboard/admin/mentors


/dashboard/admin/employers


/dashboard/admin/opportunities


/dashboard/admin/partnerships


/dashboard/admin/analytics


/dashboard/admin/reports


/dashboard/admin/notifications


/dashboard/admin/settings


================================================

ADMIN SIDEBAR


Create a dedicated Admin Sidebar.


Navigation:


Overview

User Management

Students

Mentor Verification

Employer Verification

Opportunity Management

Partnerships

Analytics

Reports

Notifications

Settings

Logout


Requirements:

- Active route highlighting
- Responsive mobile navigation
- Lucide icons
- Catalyst design consistency


================================================

ADMIN DASHBOARD OVERVIEW


Create:

AdminStats.tsx


Display KPI cards:


Total Students

Active Mentors

Verified Employers

Active Opportunities

Successful Placements

Pending Approvals



Example:


Students

2,450


Mentors

180


Employers

75


Opportunities

320


Placements

145


Pending Reviews

24



Use existing Catalyst KPI card style.


================================================

USER MANAGEMENT


Route:


/dashboard/admin/users


Create:


UserManagementPage.tsx

UserTable.tsx


Display:


Name

Email

Role

Registration Date

Account Status

Actions


Roles:


Student

Mentor

Employer

Admin



Actions:


View User

Edit User

Suspend Account

Activate Account



Add filters:


Role

Status

Search


================================================

STUDENT MANAGEMENT


Route:


/dashboard/admin/students


Create:


StudentManagementPage.tsx

StudentOverviewCard.tsx


Display:


Student Name

Programme

Career Readiness Score

Profile Completion

Applications

Employment Status


Example:


Alex Mensah


MSc Information Technology


Readiness:

84%


Applications:

6


Status:

Seeking Employment


================================================

MENTOR VERIFICATION


Route:


/dashboard/admin/mentors


Purpose:


Verify mentors before they can guide students.


Create:


MentorVerificationTable.tsx

VerificationCard.tsx


Display:


Mentor Name

Company

Experience

Expertise

Verification Status


Workflow:


Pending Review

↓

Verification

↓

Approved

↓

Active Mentor



Actions:


Approve

Reject

Request More Information



================================================

EMPLOYER VERIFICATION


Route:


/dashboard/admin/employers


Purpose:


Ensure organizations on Catalyst are legitimate.


Create:


EmployerVerificationTable.tsx


Display:


Company Name

Industry

Registration Status

Documents

Verification Status


Workflow:


Pending

↓

Review

↓

Verified Employer



Actions:


Approve

Reject

Request Documents



================================================

OPPORTUNITY MANAGEMENT


Route:


/dashboard/admin/opportunities


Purpose:


Review employer-created opportunities.


Create:


OpportunityApprovalBoard.tsx


Display:


Company

Opportunity Title

Type

Applications

Status



Opportunity Types:


INTERNSHIP

GRADUATE_PROGRAM

FULL_TIME

CONTRACT



Actions:


Approve Opportunity

Reject Opportunity

Archive Opportunity



Approved opportunities should appear in the Student Marketplace.


================================================

PARTNERSHIP MANAGEMENT


Route:


/dashboard/admin/partnerships


Create:


PartnershipManagement.tsx


Manage:


Universities

Companies

Training Partners

Sponsors



Display:


Partner Name

Partner Type

Status

Contact Person



Actions:


Add Partner

Edit Partner

Deactivate Partner



================================================

PLATFORM ANALYTICS


Route:


/dashboard/admin/analytics


Create:


AdminAnalytics.tsx


Display:


STUDENT ANALYTICS


Registered Students

Active Students

Average Career Readiness

Employment Rate



MENTOR ANALYTICS


Active Mentors

Sessions Completed

Portfolio Reviews

Average Feedback Score



EMPLOYER ANALYTICS


Registered Companies

Jobs Posted

Applications Received

Hiring Conversion Rate



Use:

- KPI cards
- charts
- summary widgets


Keep charts simple and professional.


================================================

REPORTS


Route:


/dashboard/admin/reports


Create:


ReportGenerator.tsx


Available reports:


Student Progress Report

Employment Outcome Report

Mentorship Activity Report

Employer Engagement Report



Allow:

View Report

Export Mock Report


No real file generation required yet.


================================================

NOTIFICATIONS MANAGEMENT


Route:


/dashboard/admin/notifications


Create:


NotificationManager.tsx


Admin can create announcements:


Platform Updates

Career Events

Training Opportunities

Maintenance Notices



Fields:


Title

Message

Audience

Date


Audience:


All Users

Students

Mentors

Employers


================================================

SETTINGS


Route:


/dashboard/admin/settings


Allow:


Notification Preferences

Platform Settings

Security Settings

Admin Profile


================================================

COMPONENT STRUCTURE


Create:


src/features/admin/


Structure:


components/

hooks/

services/

types/


Create components:


AdminHeader.tsx

AdminStats.tsx

UserTable.tsx

StudentManagement.tsx

MentorVerification.tsx

EmployerVerification.tsx

OpportunityApprovalBoard.tsx

PartnershipCard.tsx

AnalyticsCard.tsx

ReportCard.tsx

NotificationManager.tsx


================================================

SERVICES


Create:


admin.service.ts


user-management.service.ts


verification.service.ts


opportunity-management.service.ts


analytics.service.ts


report.service.ts


notification.service.ts


partnership.service.ts


Use mock services only.

Prepare architecture for future backend API integration.


================================================

MOCK DATA


Create realistic administrative data.


Include:


100 students


25 mentors


15 employers


50 opportunities


20 pending approvals


10 partnerships


Generate realistic examples using existing Catalyst data structures.


================================================

INTEGRATION REQUIREMENTS


Connect Admin workflows conceptually with existing features:


Student Portal:

- Student profiles
- Career readiness
- Employment status


Mentor Portal:

- Mentor verification
- Portfolio reviews


Employer Portal:

- Company verification
- Opportunity approvals


Marketplace:

Approved employer opportunities should become available to students.


================================================

DESIGN REQUIREMENTS


Maintain Catalyst design system:


Colors:

Deep Blue primary

Catalyst Orange accent


Style:


Professional

Clean

Enterprise dashboard

Responsive


Use:

- existing components
- existing spacing system
- existing typography


Avoid:

- excessive charts
- cluttered layouts
- generic admin templates


================================================

DOCUMENTATION


Update:


CHANGELOG.md


Add:


Phase 5C Admin Portal Implementation completed.


PROJECT_STATUS.md


Update:


Admin governance workspace completed.


FEATURES.md


Add:


Admin Portal

User Management

Verification Workflows

Opportunity Approval

Analytics Dashboard

Reports


DECISIONS.md


Add:


Decision:

Create centralized Admin Portal.

Reason:

Catalyst requires governance, verification, and platform coordination.


ROADMAP.md


Mark Phase 5C as completed.


================================================

QUALITY REQUIREMENTS


Ensure:


- TypeScript compilation succeeds
- Zero lint warnings
- Responsive design
- Reusable components
- Existing architecture preserved
- Mock services only
- No backend implementation yet


================================================

FINAL RESPONSE


Provide:


1. Routes created

2. Components created

3. Services created

4. Admin workflows implemented

5. Mock data added

6. Documentation updates

7. Build verification


Stop after completing Phase 5C Admin Portal.