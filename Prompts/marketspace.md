Proceed with Phase 4E: Career Marketplace Enhancement.

The current Student Portal contains an "Internship Opportunities" feature.

We are expanding this feature into a complete career opportunity ecosystem.

Rename the feature from:

"Internship Opportunities"

to:

"Marketplace"


The Marketplace should support:

- Internships
- Graduate Programs
- Full-Time Employment
- Contract Roles

Do not rebuild the feature from scratch.

Extend the existing implementation.

================================================

OBJECTIVE

Transform the current internship listing page into a Career Marketplace where students discover opportunities based on:

- skills
- career goals
- portfolio
- employment readiness
- career preferences


The experience should feel like a career intelligence platform, not a simple job board.


================================================

ROUTE UPDATE


Change:

/dashboard/student/internships


to:


/dashboard/student/marketplace


Update:

- folder names
- route references
- sidebar navigation labels
- internal naming


The sidebar item should become:


Marketplace


Remove:

Internships


================================================

PAGE STRUCTURE


Create the new Marketplace page structure:


/dashboard/student/marketplace



Layout:


Career Marketplace


        ↓


Career Intelligence KPI Section


        ↓


Recommended For You


        ↓


Opportunity Categories


        ↓


All Opportunities


        ↓


Filters and Search



================================================

1. CAREER MARKETPLACE KPI SECTION


Add KPI cards at the top.


Create:


MarketplaceStats.tsx


Display:


Total Opportunities

Example:

48


Matching Your Skills

Example:

15


Applications Submitted

Example:

6


Interview Invitations

Example:

2


Offers Received

Example:

1



Design:

Use the existing Catalyst card design.

Maintain consistent spacing and alignment.


================================================

2. OPPORTUNITY CATEGORY SUMMARY


Add category breakdown.


Create:


OpportunityCategoryStats.tsx


Display:


Internships

20


Graduate Programs

8


Full-Time Employment

15


Contract Roles

5



Use badges/icons.

================================================

3. EMPLOYMENT READINESS SUMMARY


Connect Marketplace with the student's career readiness.


Add:


EmploymentReadinessCard.tsx



Display:


Employment Readiness Score:

78%


Eligible Opportunities:


✓ 12 Internships

✓ 8 Graduate Programs

✓ 5 Full-Time Roles



================================================

4. PERSONALIZED RECOMMENDATIONS


Create:


RecommendedOpportunities.tsx



Section title:


Recommended For You


Each recommendation should display:


Job title

Company

Opportunity type

Match score

Reason for recommendation



Example:


Junior Software Engineer


Stripe Tech


87% Match


Why:

✓ React skill

✓ SQL skill

✓ Portfolio verified



================================================

5. UPDATE OPPORTUNITY DATA MODEL


Update existing opportunity types.


Replace internship-only models.



Create:


OpportunityType:


INTERNSHIP

GRADUATE_PROGRAM

FULL_TIME

CONTRACT



Opportunity:


id

company

title

type

location

workMode

requiredSkills[]

deadline

description

experienceLevel

matchScore

applicationStatus



================================================

6. IMPROVE OPPORTUNITY CARDS


Update:


OpportunityCard.tsx



New structure:


Job Title


Company


Opportunity Type Badge


Location


Deadline


Required Skills


Match Score


Application Status



Example:


Junior Software Engineer


Stripe Tech


FULL-TIME


87% Match


React | TypeScript | SQL


[Apply Now]



================================================

7. APPLICATION STATUS SUPPORT


The Apply button should support different states.


States:


Apply Now


Applied


Under Review


Assessment


Interview


Offer


Accepted


Rejected



Update button appearance based on status.


================================================

8. IMPROVE CARD ALIGNMENT


Fix current UI issues:


- Equal card height
- Consistent title spacing
- Prevent uneven layouts
- Keep buttons aligned at the bottom
- Limit title display to two lines
- Maintain responsive grid


All opportunity cards should have identical structure.


================================================

9. SEARCH AND FILTER IMPROVEMENTS


Update:


OpportunityFilter.tsx



Add filters:


Opportunity Type:

- Internship
- Graduate Program
- Full-Time
- Contract


Skills


Location


Work Mode


Company


Experience Level



================================================

10. UPDATE STUDENT SERVICES


Rename:


internship.service.ts


to:


marketplace.service.ts



Update all references.


Support:


getOpportunities()

getRecommendedOpportunities()

applyOpportunity()


================================================

11. UPDATE MOCK DATA


Update:


mockData.ts



Add realistic opportunities:


Example:



Company:

Hubtel Ghana


Role:

Junior Software Engineer


Type:

FULL_TIME


Skills:

React

Node.js

SQL



Company:

Google Ghana


Role:

Graduate Software Engineer


Type:

GRADUATE_PROGRAM



Company:

Google Cloud Labs


Role:

Cloud Infrastructure Intern


Type:

INTERNSHIP



================================================

12. UPDATE DOCUMENTATION


Update:


CHANGELOG.md


Add:


Phase 4E Career Marketplace Enhancement


PROJECT_STATUS.md


Update:

Student opportunity discovery expanded from internship tracking to complete career marketplace.


FEATURES.md


Rename:


Internship Opportunities


to:


Career Marketplace



Update status:

Completed


DECISIONS.md


Add:


Decision:

Rename Internship Opportunities to Marketplace.


Reason:

Catalyst supports the complete student employment lifecycle including internships, graduate programs, and full-time employment.


================================================

IMPLEMENTATION RULES


Maintain:


- Next.js architecture
- Existing student feature structure
- TypeScript
- React Hook Form
- Zod validation
- shadcn/ui components
- Existing Catalyst design system


Do not:


- Build Employer Portal yet
- Remove Application Tracker
- Remove Internship functionality


Internships should become one category inside Marketplace.


================================================

FINAL RESPONSE


Provide:


1. Routes changed

2. Components created/updated

3. Feature improvements

4. Data model changes

5. Mock data updates

6. Documentation updates

7. Build verification


Stop after completing Phase 4E.