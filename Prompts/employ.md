Proceed with Phase 4D: Career Employment Pathway Enhancement.

The Student Portal (Phase 4C) is completed and approved.

The current platform supports:
- Career Profile
- Skills Development
- Portfolio Builder
- Internship Opportunities
- Application Tracker
- Mentorship

Now extend Catalyst into a complete employability ecosystem by adding full-time employment support.

Do not redesign existing features.

Build on the existing student architecture.

================================================

OBJECTIVE

Transform Catalyst from an internship-focused platform into a complete university-to-industry employment platform.

The student journey should become:


Career Preparation

        ↓

Skills Development

        ↓

Portfolio Validation

        ↓

Mentorship Support

        ↓

Internship Opportunities

        ↓

Graduate Employment

        ↓

Career Growth


================================================

1. UPDATE STUDENT CAREER PROFILE


Update:

/dashboard/student/profile


Add:


Career Status Section


Options:


- Exploring career opportunities

- Seeking internship

- Seeking graduate employment

- Open to full-time roles

- Currently employed


Add:


Employment Preferences:


Preferred Job Types:

- Internship
- Graduate Program
- Full-Time Employment
- Contract


Preferred Industries:

- Software Development
- Cloud Computing
- Networking
- Data
- Cybersecurity


Preferred Work Mode:

- Remote
- Hybrid
- On-site


Preferred Locations:

- Accra
- Ghana
- International


Availability Date:

Example:

September 2026


================================================

2. UPDATE INTERNSHIP OPPORTUNITY SYSTEM


The current internship module should become a general opportunity marketplace.


Update:

/dashboard/student/internships


Rename internally:

Opportunity Marketplace


Support opportunity categories:


Internship

Graduate Trainee

Full-Time Employment

Contract Role


================================================

3. UPDATE OPPORTUNITY DATA MODEL


Update student types:


src/features/student/types/student.types.ts


Add:


OpportunityType:


"INTERNSHIP"

"GRADUATE_PROGRAM"

"FULL_TIME"

"CONTRACT"


Opportunity:


{
 id,

company,

title,

type,

location,

workMode,

requiredSkills[],

description,

deadline,

experienceLevel

}


Example:


{
company:
"Hubtel Ghana",

title:
"Junior Software Engineer",

type:
"FULL_TIME",

skills:

[
"React",
"Node.js",
"SQL"
],

experience:

"Entry Level"

}


================================================

4. UPDATE OPPORTUNITY CARDS


Update:

OpportunityCard.tsx


Display:


Company

Role

Opportunity Type Badge


Examples:


Internship


Graduate Program


Full-Time Employment


Required Skills


Location


Apply Button



Use different badges for opportunity categories.


================================================

5. UPDATE APPLICATION TRACKER


Update:

/dashboard/student/applications


The tracker should support employment applications.


Pipeline:


Applied

↓

Under Review

↓

Assessment

↓

Interview

↓

Offer

↓

Accepted



Rejected remains available.


Update Application model:


Add:


opportunityType


company


position


applicationDate


currentStage


================================================

6. ADD CAREER READINESS EMPLOYMENT SCORE


Enhance:

CareerScoreCard.tsx


Current:

Career Readiness


Expand into:


Employment Readiness Score


Calculation display:


Skills:

30%


Portfolio:

25%


Mentor Evaluation:

20%


Profile Completion:

15%


Career Goals:

10%



Example:


Employment Readiness:

82%


Status:

Ready for Entry-Level Opportunities


================================================

7. ADD EMPLOYMENT RECOMMENDATION SECTION


On:

/dashboard/student


Add:


Recommended Career Opportunities


Display:


Based on:

- student skills
- career goals
- portfolio
- readiness score


Example:


Recommended:


Junior Backend Developer

Match:

87%


Reason:

Matches Python + SQL skills


================================================

8. ADD EMPLOYER VISIBILITY PREPARATION


Prepare student profile for employer discovery.


Add:


Profile Visibility Setting:


Allow employers to view my profile:


ON/OFF



When enabled employers can see:


- skills
- portfolio
- career goals
- readiness score
- mentor verification


================================================

9. UPDATE MOCK DATA


Update:

mockData.ts


Add:


Full-time opportunities:


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



================================================

10. UPDATE DOCUMENTATION


Update:


CHANGELOG.md


Add:


Phase 4D Career Employment Pathway Enhancement


PROJECT_STATUS.md


Update:

Student Portal expanded from internship management to complete employability lifecycle.



FEATURES.md


Update:


Opportunity Marketplace

Status:

In Progress


Employment Tracking

Status:

Completed


Career Readiness Score

Status:

Completed



DECISIONS.md


Add:


Decision:

Catalyst supports full employment lifecycle, not only internships.


Reason:

Students require a pathway from academic preparation to sustainable employment.


================================================

IMPLEMENTATION RULES


Maintain:

- Existing Next.js architecture
- Existing student feature structure
- Existing shadcn/ui components
- Existing Zustand state management
- Existing mock service pattern


Do not:

- Implement employer dashboard yet
- Implement backend APIs yet
- Remove existing internship features


================================================

FINAL RESPONSE


Provide:


1. Features added

2. Routes updated

3. Components modified

4. New employment workflow

5. Mock employment data added

6. Build verification

7. Documentation updates


Stop after completing Phase 4D.