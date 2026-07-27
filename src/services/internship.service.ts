// Internship Service Layer

export interface Internship {
  id: string;
  title: string;
  company: string;
  logo?: string;
  description: string;
  requirements: string[];
  type: 'remote' | 'hybrid' | 'onsite';
  duration: string;
  location: string;
  tags: string[];
  postedAt: string;
}

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  status: 'applied' | 'reviewing' | 'interviewing' | 'offered' | 'rejected';
  appliedAt: string;
}

// Mock database values
const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer Intern',
    company: 'Stripe',
    description: 'Help build the next generation of online transaction UI elements using React and Tailwind.',
    requirements: ['Proficient in HTML/CSS/JS', 'Experience with modern frameworks like React', 'Understanding of web accessibility'],
    type: 'remote',
    duration: '6 Months',
    location: 'San Francisco, CA (Remote)',
    tags: ['React', 'Tailwind', 'TypeScript'],
    postedAt: '2026-07-15',
  },
  {
    id: 'job-2',
    title: 'Backend Software Engineer Intern',
    company: 'Google',
    description: 'Work with cloud databases and high-performance routing infrastructures using Go and Python.',
    requirements: ['Understanding of database architectures', 'Familiarity with RESTful APIs', 'Basic Go or Python experience'],
    type: 'hybrid',
    duration: '3 Months',
    location: 'New York, NY',
    tags: ['Go', 'Python', 'Docker'],
    postedAt: '2026-07-18',
  }
];

export const InternshipService = {
  // Get all active listings
  getInternships: async (): Promise<Internship[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_INTERNSHIPS), 400);
    });
  },

  // Submit profile to specific internship
  applyForInternship: async (internshipId: string, studentId: string): Promise<Application> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `app-${Math.random().toString(36).substr(2, 9)}`,
          internshipId,
          studentId,
          status: 'applied',
          appliedAt: new Date().toISOString().split('T')[0],
        });
      }, 600);
    });
  },

  // Post a new internship (Employer action)
  postInternship: async (internship: Omit<Internship, 'id' | 'postedAt'>): Promise<Internship> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...internship,
          id: `job-${Math.random().toString(36).substr(2, 9)}`,
          postedAt: new Date().toISOString().split('T')[0],
        });
      }, 500);
    });
  }
};
