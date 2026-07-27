// Mentorship Service Layer

export interface Mentor {
  id: string;
  name: string;
  company: string;
  title: string;
  specialty: string[];
  bio: string;
  rating: number;
  availableDays: string[];
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  studentId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'completed';
  notes?: string;
}

const MOCK_MENTORS: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Sarah Connor',
    company: 'Meta',
    title: 'Senior Frontend Architect',
    specialty: ['React', 'CSS Grid', 'System Design'],
    bio: '10+ years designing consumer interfaces. Passionate about mentoring next-generation UI builders.',
    rating: 4.9,
    availableDays: ['Monday', 'Wednesday'],
  },
  {
    id: 'mentor-2',
    name: 'John Miller',
    company: 'Amazon Web Services',
    title: 'Lead DevOps Engineer',
    specialty: ['Kubernetes', 'AWS', 'CI/CD Pipelines'],
    bio: 'Cloud architecture expert. Helping students transition from local code to scalable cloud deployments.',
    rating: 4.8,
    availableDays: ['Thursday', 'Friday'],
  }
];

export const MentorshipService = {
  // Retrieve available mentors
  getMentors: async (): Promise<Mentor[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_MENTORS), 400);
    });
  },

  // Create a calendar booking
  bookSession: async (session: Omit<MentorshipSession, 'id' | 'status'>): Promise<MentorshipSession> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...session,
          id: `session-${Math.random().toString(36).substr(2, 9)}`,
          status: 'pending',
        });
      }, 500);
    });
  }
};
