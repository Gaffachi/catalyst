// Authentication Service Layer

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'mentor' | 'employer' | 'admin';
  onboarded: boolean;
}

export const AuthService = {
  // Mock login function
  login: async (email: string, _password: string): Promise<UserSession> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Reference variables to satisfy ESLint unused variable rules
        if (email.includes('error') || !_password) {
          reject(new Error('Invalid email or password'));
        } else {
          // Resolve standard mock student session
          resolve({
            id: 'mock-user-123',
            email: email,
            name: 'Alex Johnson',
            role: email.includes('mentor') 
              ? 'mentor' 
              : email.includes('employer') 
              ? 'employer' 
              : email.includes('admin') 
              ? 'admin' 
              : 'student',
            onboarded: true,
          });
        }
      }, 500); // Simulate network delay
    });
  },

  // Mock register function
  register: async (email: string, name: string, role: 'student' | 'mentor' | 'employer'): Promise<UserSession> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `mock-user-${Math.random().toString(36).substr(2, 9)}`,
          email,
          name,
          role,
          onboarded: false,
        });
      }, 500);
    });
  },

  // Mock logout function
  logout: async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  }
};
