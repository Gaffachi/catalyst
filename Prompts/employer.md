Proceed with Phase 5B: Employer Portal Implementation.

The Student Portal and Mentor Portal are completed and approved.

Do not redesign or modify existing Student or Mentor features.

Create the Employer Workspace that connects companies with Catalyst students through talent discovery, opportunity creation, recruitment workflows, and employment placement.

================================================

OBJECTIVE

Build a professional Employer Portal that allows organizations to:

- create employment opportunities
- discover verified student talent
- review student profiles and portfolios
- manage applications
- shortlist candidates
- schedule interviews
- track hiring pipelines
- monitor recruitment analytics


The Employer Portal should consume:

Student data:
- career profiles
- skills
- portfolios
- employment preferences
- career readiness scores


Mentor data:
- verified portfolios
- readiness assessments
- approved feedback


================================================

ROUTES

Create:


/dashboard/employer


/dashboard/employer/profile


/dashboard/employer/opportunities


/dashboard/employer/talent


/dashboard/employer/candidates/[id]


/dashboard/employer/applications


/dashboard/employer/interviews


/dashboard/employer/pipeline


/dashboard/employer/analytics


/dashboard/employer/messages


/dashboard/employer/settings


================================================

EMPLOYER SIDEBAR


Create a dedicated Employer Sidebar.


Navigation:


Overview

Company Profile

Opportunities

Talent Discovery

Applications

Interviews

Talent Pipeline

Messages

Analytics

Settings

Logout


Requirements:

- Active route highlighting
- Responsive mobile navigation
- Lucide icons
- Catalyst branding consistency


================================================

EMPLOYER DASHBOARD OVERVIEW


Create:

EmployerStats.tsx


Display KPI cards:


Active Opportunities

Total Applicants

Shortlisted Candidates

Scheduled Interviews

Offers Sent

Successful Placements


Example:


Active Opportunities:
12


Applicants:
350


Shortlisted:
45


Interviews:
8


Offers:
3


Placements:
2


================================================

COMPANY PROFILE


Route:


/dashboard/employer/profile


Create:


CompanyProfilePage.tsx


Display:


Company Logo

Company Name

Industry

Company Size

Location

Website

Description

Verification Status


Example:


Hubtel Ghana


Industry:
FinTech


Status:

Verified ✓



Allow editing using:

React Hook Form

Zod validation


Create:


CompanyProfileCard.tsx

CompanyProfileForm.tsx


================================================

OPPORTUNITY MANAGEMENT


Route:


/dashboard/employer/opportunities


Purpose:

Allow employers to create and manage opportunities.


Support opportunity types:


INTERNSHIP

GRADUATE_PROGRAM

FULL_TIME

CONTRACT



Create:


OpportunityManagementPage.tsx


Features:


View Opportunities

Create Opportunity

Edit Opportunity

Close Opportunity


Opportunity fields:


Title

Type

Description

Required Skills

Experience Level

Location

Work Mode

Deadline

Salary Range

Application Requirements


Example:


Junior Backend Engineer


Type:

FULL_TIME


Skills:

Python

Django

PostgreSQL

API Development


================================================

CREATE OPPORTUNITY FORM


Create:


OpportunityForm.tsx


Use:


React Hook Form

Zod validation


Validate:


Required title

Opportunity type

Company

Skills

Deadline


================================================

TALENT DISCOVERY


Route:


/dashboard/employer/talent


This is a core Catalyst feature.


Create:


TalentSearch.tsx

CandidateCard.tsx

TalentFilters.tsx


Employers should search students by:


Skills

Programme

Career Readiness Score

Portfolio Availability

Mentor Verification

Location

Career Goals


Example candidate card:


Alex Mensah


MSc Information Technology


Career Readiness:

84%


Skills:

React

Python

SQL


Portfolio:

3 Projects


Mentor Verified:

✓


Actions:


View Profile

Invite to Apply


================================================

CANDIDATE PROFILE VIEW


Route:


/dashboard/employer/candidates/[id]


Create:


CandidateProfilePage.tsx


Display:


Student Profile

Academic Background

Skills

Career Goals

Employment Preferences

Portfolio Projects

Mentor Verification

Career Readiness Score


Important:

Employers should only see approved mentor feedback.

Do not expose private mentor notes.


================================================

APPLICATION MANAGEMENT


Route:


/dashboard/employer/applications


Create:


EmployerApplicationBoard.tsx


Use Kanban workflow:


Applied

↓

Reviewing

↓

Shortlisted

↓

Assessment

↓

Interview

↓

Offer

↓

Hired


Each application card displays:


Student Name

Position

Opportunity Type

Date Applied

Current Status


Actions:


Move Stage

View Candidate

Schedule Interview


================================================

INTERVIEW MANAGEMENT


Route:


/dashboard/employer/interviews


Create:


InterviewCard.tsx


Display:


Candidate

Position

Date

Time

Interview Type

Status

Notes


Actions:


Schedule

Reschedule

Complete

Cancel


================================================

TALENT PIPELINE


Route:


/dashboard/employer/pipeline


Create:


TalentPipeline.tsx


Visual Kanban:


Applicants

Shortlisted

Interview

Offer

Hired


Use drag-and-drop style UI simulation only.

No backend required.


================================================

ANALYTICS


Route:


/dashboard/employer/analytics


Create:


EmployerAnalytics.tsx


Display:


Applications Received

Average Candidate Readiness

Most Requested Skills

Hiring Conversion Rate

Successful Placements


Use cards and simple charts.


================================================

MESSAGING


Route:


/dashboard/employer/messages


Create:


EmployerMessaging.tsx


Support:


Candidate conversations

Unread messages

Search


Mock only.

No realtime backend.


================================================

SETTINGS


Route:


/dashboard/employer/settings


Allow:


Notification Preferences

Account Settings

Profile Visibility

Password Settings


================================================

COMPONENT STRUCTURE


Create:


src/features/employer/


components/

hooks/

services/

types/


Components:


EmployerHeader.tsx

EmployerStats.tsx

CompanyProfileCard.tsx

CompanyProfileForm.tsx

OpportunityCard.tsx

OpportunityForm.tsx

CandidateCard.tsx

TalentFilters.tsx

CandidateProfile.tsx

ApplicationCard.tsx

ApplicationBoard.tsx

InterviewCard.tsx

TalentPipeline.tsx

AnalyticsCard.tsx


================================================

SERVICES


Create:


employer.service.ts


company.service.ts


opportunity.service.ts


candidate.service.ts


application.service.ts


interview.service.ts


analytics.service.ts


message.service.ts


Use mock services only.

Prepare structure for future backend API integration.


================================================

MOCK DATA


Create realistic employer data.


Example:


Company:

Hubtel Ghana


Industry:

FinTech


Verification:

Verified


Opportunities:


1.

Junior Software Engineer

Type:

FULL_TIME


Skills:

React

Node.js

SQL


2.

Cloud Engineering Intern

Type:

INTERNSHIP


Skills:

AWS

Linux

Networking


Candidates:


Create at least:

30 student profiles

50 applications

20 opportunities

15 interviews


Use existing student profile structure.


================================================

DESIGN REQUIREMENTS


Maintain Catalyst design system:


Primary:

Deep Blue


Accent:

Catalyst Orange


Style:


Professional

Industry-focused

Modern recruitment platform


Avoid:


- generic HR dashboard
- excessive charts
- clutter


================================================

DOCUMENTATION


Update:


CHANGELOG.md


Add:

Phase 5B Employer Portal Implementation


PROJECT_STATUS.md


Update:

Employer recruitment workspace completed.


FEATURES.md


Add:


Employer Portal

Opportunity Management

Talent Discovery

Candidate Pipeline

Recruitment Analytics


DECISIONS.md


Add:


Decision:

Create dedicated employer workspace.

Reason:

Employers require specialized tools for discovering and recruiting Catalyst talent.


================================================

QUALITY REQUIREMENTS


Ensure:


- TypeScript compilation succeeds
- No lint warnings
- Responsive layouts
- Reusable components
- Existing architecture preserved
- Mock services used
- No backend implementation yet


================================================

FINAL RESPONSE


Provide:


1. Routes created

2. Components created

3. Services created

4. Employer workflows implemented

5. Mock data added

6. Documentation updates

7. Build verification


Stop after completing Phase 5B Employer Portal.