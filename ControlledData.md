Perform a complete Controlled Data Architecture Audit of the entire Catalyst platform.

Do NOT modify any code yet.

The purpose of this audit is to identify all areas in the system where data should be converted from free-text/manual entry into predefined controlled data before implementing frontend changes.

Analyze the entire platform:

- Frontend
- Backend
- Database schema
- APIs
- User onboarding flows
- Dashboards
- Forms
- Search/filter systems
- Matching/recommendation logic
- Admin functions

The goal is to create a clear blueprint of what needs to become controlled data.

================================================

1. USER ROLE ANALYSIS

Analyze all user roles:

- Student
- Mentor
- Employer
- Admin

For each role, list:

- Profile fields
- Registration fields
- Onboarding fields
- Dashboard fields
- Editable information

Identify which fields are:

A. Should remain free text
(example: biography, personal statement, project description)

B. Should become predefined controlled data
(example: skills, industries, career goals)

Explain the reason for each decision.

================================================

2. FRONTEND FORM AUDIT

Scan all frontend forms and identify:

- Text inputs
- Text areas
- Select dropdowns
- Multi-select fields
- Checkboxes
- Search fields

For every field, provide:

Field Name:
Current Input Type:
Current Behaviour:
Problem:
Should it become controlled data? (Yes/No)
Recommended Data Source:

Example format:

Field:
Student Skills

Current:
Free text input

Problem:
Python, python, PYTHON, Pyhton create duplicate values

Recommendation:
Convert to searchable multi-select connected to Skill database

================================================

3. CONTROLLED DATA CANDIDATE LIST

Create a complete list of all fields that should have predefined values.

Categorize them:

A. Skills

Examples:
- Python
- React
- SQL
- Cloud Computing

B. Career Goals

Examples:
- Software Engineer
- Data Scientist
- Cybersecurity Analyst

C. Industries

Examples:
- Information Technology
- Banking
- Telecommunications

D. Academic Information

Examples:
- Programmes
- Departments
- Levels

E. Experience Levels

Examples:
- Beginner
- Intermediate
- Advanced

F. Mentorship Data

Examples:
- Mentorship goals
- Areas of support
- Availability

G. Employer Data

Examples:
- Opportunity types
- Job categories
- Industry sectors

H. Portfolio Data

Examples:
- Project categories
- Technology categories

================================================

4. DATA CONSISTENCY RISK ANALYSIS

Identify where inconsistent data can break system functionality.

Examples:

Student enters:
"Python"

Mentor enters:
"python programming"

Will matching fail?

Identify all similar risks.

Look specifically at:

- Mentor matching
- Employer-student matching
- Search functionality
- Filtering
- Analytics
- Recommendations
- Reports

================================================

5. DATABASE IMPACT ANALYSIS

Review the current database schema.

Identify:

- Existing tables that need reference tables
- Missing relationships
- Fields currently storing text that should become IDs

Example:

Current:

Student:
skills = "Python, React"

Recommended:

Student
 |
StudentSkill
 |
Skill

Provide the required database changes.

================================================

6. API IMPACT ANALYSIS

Review existing APIs.

Identify:

- APIs that currently accept free text
- APIs that should return controlled options
- New APIs required

Example:

Current:

POST /student/profile

Receives:

{
skills:"Python"
}


Recommended:

GET /skills

Returns:

[
{
id:1,
name:"Python"
}
]


================================================

7. ADMIN MANAGEMENT REQUIREMENTS

Identify which controlled data should be managed by administrators.

Create a list:

Admin should manage:

- Skills
- Career paths
- Industries
- Programmes
- Locations
- Opportunity categories
- Mentorship categories

Explain why.

================================================

8. PRIORITY RANKING

Rank all required controlled data changes:

Priority 1:
Critical before matching and recommendation

Priority 2:
Important for system consistency

Priority 3:
Future improvements

================================================

9. FINAL REPORT FORMAT

Produce a detailed report:

# Catalyst Controlled Data Audit Report

## Executive Summary

## Current Problems Found

## Fields That Must Become Controlled Data

## Fields That Can Remain Free Text

## Frontend Components Requiring Changes

## Backend Changes Required Later

## Database Changes Required Later

## API Changes Required Later

## Implementation Priority Order

## Recommended Next Step

Do not implement anything.
Do not generate code.
Only analyze and provide the complete blueprint for the frontend redesign phase.