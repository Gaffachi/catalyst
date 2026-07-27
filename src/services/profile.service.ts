// Profile and Portfolio Service Layer

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  education: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
}

const MOCK_PROFILE: UserProfile = {
  id: 'mock-user-123',
  name: 'Alex Johnson',
  bio: 'ICT Student eager to learn modern responsive web styling and frontend system building.',
  skills: ['React', 'TypeScript', 'Tailwind CSS'],
  education: 'B.Sc. in Information Technology, Level 400',
  githubUrl: 'https://github.com/mock-alex',
};

const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Dashboard UI',
    description: 'A fully styled responsive web dashboard built as a course project.',
    techStack: ['React', 'CSS Grid', 'Tailwind'],
    githubUrl: 'https://github.com/mock-alex/ecom-ui',
  }
];

export const ProfileService = {
  // Retrieve profile details
  getProfile: async (_userId: string): Promise<UserProfile> => {
    return new Promise((resolve) => {
      if (!_userId) return;
      setTimeout(() => resolve(MOCK_PROFILE), 300);
    });
  },

  // Save profile edits
  updateProfile: async (_userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...MOCK_PROFILE,
          ...updates,
        });
      }, 500);
    });
  },

  // Fetch portfolio projects
  getProjects: async (_userId: string): Promise<Project[]> => {
    return new Promise((resolve) => {
      if (!_userId) return;
      setTimeout(() => resolve(MOCK_PROJECTS), 300);
    });
  },

  // Add a new project card
  addProject: async (_userId: string, project: Omit<Project, 'id'>): Promise<Project> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...project,
          id: `proj-${Math.random().toString(36).substr(2, 9)}`,
        });
      }, 500);
    });
  }
};
