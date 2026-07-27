Proceed with Phase 5A: Mentor Portal Implementation.

The Student Portal is complete and approved.

Do not modify the Student Portal.

Create the complete Mentor Workspace that supports student guidance, portfolio reviews, career readiness assessment, and mentorship management.

This portal should become the bridge between students and employers.

================================================

OBJECTIVE

Build a professional Mentor Portal that enables mentors to:

- monitor assigned students
- review portfolios
- evaluate career readiness
- conduct mentorship sessions
- provide feedback
- manage availability
- track mentorship performance

The Mentor Portal should help students become industry-ready before they enter the Marketplace.

================================================

ROUTES

Create the following routes:

/dashboard/mentor

/dashboard/mentor/students

/dashboard/mentor/portfolio-reviews

/dashboard/mentor/career-assessments

/dashboard/mentor/sessions

/dashboard/mentor/availability

/dashboard/mentor/messages

/dashboard/mentor/reports

/dashboard/mentor/profile

/dashboard/mentor/settings

================================================

SIDEBAR

Create a dedicated Mentor Sidebar.

Navigation:

Overview

Students

Portfolio Reviews

Career Assessments

Sessions

Availability

Messages

Reports

Profile

Settings

Logout

Use Lucide icons.

Support active navigation highlighting.

Support responsive mobile navigation.

================================================

MENTOR DASHBOARD

Dashboard Overview should display KPI cards.

Create:

MentorStats.tsx

Display:

Assigned Students

Upcoming Sessions

Pending Portfolio Reviews

Feedback Requests

Average Student Readiness

Completed Sessions

Use the same Catalyst KPI design language.

================================================

STUDENT MANAGEMENT

Route:

/dashboard/mentor/students

Create:

StudentTable.tsx

StudentCard.tsx

StudentDetailsDrawer.tsx

Each student should display:

Profile Picture

Name

Programme

Career Readiness Score

Employment Goal

Portfolio Status

Current Applications

Mentorship Status

Actions:

View Profile

Review Portfolio

Assess Readiness

Schedule Session

================================================

PORTFOLIO REVIEW

Route:

/dashboard/mentor/portfolio-reviews

Purpose:

Mentors evaluate student projects.

Display:

Project

Technologies

Repository

Demo Link

Submission Date

Review Status

Mentor Comments

Rating Categories:

Technical Skills

Architecture

Documentation

Problem Solving

Innovation

Overall Score

Actions:

Approve

Request Changes

Reject

Add Feedback

Approved portfolios should automatically become "Mentor Verified".

================================================

CAREER READINESS ASSESSMENT

Route:

/dashboard/mentor/career-assessments

Purpose:

Mentors evaluate employability.

Assessment Categories:

Technical Skills

Communication

Problem Solving

Professionalism

Teamwork

Leadership

Time Management

Portfolio Quality

Calculate:

Employment Readiness Score

Example:

Technical Skills

88%

Communication

80%

Problem Solving

84%

Overall Readiness

84%

Allow mentors to save assessments.

================================================

MENTOR SESSIONS

Route:

/dashboard/mentor/sessions

Display:

Upcoming Sessions

Completed Sessions

Cancelled Sessions

Each session includes:

Student

Date

Time

Meeting Topic

Duration

Status

Notes

Actions:

Start Session

Reschedule

Cancel

Complete Session

================================================

AVAILABILITY

Route:

/dashboard/mentor/availability

Allow mentors to manage:

Available Days

Working Hours

Breaks

Unavailable Dates

Timezone

Students should eventually book from these slots.

================================================

MESSAGES

Route:

/dashboard/mentor/messages

Create conversation interface.

Support:

Student conversations

Unread indicators

Search

Message history

Attachments (mock)

No real-time backend yet.

================================================

REPORTS

Route:

/dashboard/mentor/reports

Display KPIs:

Students Mentored

Projects Reviewed

Average Readiness

Sessions Completed

Approval Rate

Average Feedback Rating

Display trend cards and summary widgets.

================================================

PROFILE

Route:

/dashboard/mentor/profile

Display:

Photo

Bio

Industry

Specialization

Years of Experience

Current Company

Skills

LinkedIn

GitHub

Areas of Expertise

Editable form using React Hook Form + Zod.

================================================

SETTINGS

Route:

/dashboard/mentor/settings

Allow mentor to configure:

Notifications

Profile Visibility

Availability Preferences

Email Preferences

Password

Theme Preferences

================================================

COMPONENT STRUCTURE

Create:

src/features/mentor/

components/

hooks/

services/

types/

Create reusable components:

MentorDashboardHeader.tsx

MentorStats.tsx

StudentCard.tsx

StudentTable.tsx

PortfolioReviewCard.tsx

AssessmentCard.tsx

SessionCard.tsx

AvailabilityCalendar.tsx

ReportCard.tsx

================================================

SERVICES

Create:

mentor.service.ts

student-review.service.ts

assessment.service.ts

session.service.ts

availability.service.ts

report.service.ts

message.service.ts

Use mock services only.

Prepare structure for future backend integration.

================================================

MOCK DATA

Create realistic mentor data.

Example Mentor:

Sarah Johnson

Senior Software Engineer

Google Ghana

Experience:

8 Years

Assigned Students:

25

Completed Reviews:

63

Completed Sessions:

41

Average Student Readiness:

82%

Create at least:

25 students

50 portfolio reviews

40 mentorship sessions

30 career assessments

================================================

DESIGN REQUIREMENTS

Maintain the existing Catalyst design language.

Use:

Deep Blue primary

Catalyst Orange accent

White cards

Rounded corners

Professional spacing

Responsive layouts

Consistent KPI cards

Avoid dashboard clutter.

================================================

DOCUMENTATION

Update:

CHANGELOG.md

PROJECT_STATUS.md

FEATURES.md

ROADMAP.md

DECISIONS.md

Record:

Phase 5A Mentor Portal completed.

================================================

QUALITY REQUIREMENTS

All pages must:

- compile successfully
- have zero TypeScript errors
- have zero lint warnings
- be responsive
- use reusable components
- use TypeScript interfaces
- use mock services
- follow existing project architecture

================================================

FINAL RESPONSE

Provide:

1. Routes created
2. Components created
3. Services created
4. Mock data added
5. Features implemented
6. Build verification
7. Documentation updates

Stop after completing the Mentor Portal.