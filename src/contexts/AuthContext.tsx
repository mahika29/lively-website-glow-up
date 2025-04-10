
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  userType: 'student' | 'teacher' | 'organization';
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes - in real implementation, this would be stored in a database
const mockUsers: User[] = [
  { id: '1', name: 'Demo Student', email: 'demo@example.com', avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg', userType: 'student', lastLogin: new Date().toISOString() },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatarUrl: 'https://randomuser.me/api/portraits/women/17.jpg', userType: 'teacher', lastLogin: new Date().toISOString() },
  { id: '3', name: 'John Doe', email: 'john@example.com', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg', userType: 'organization', lastLogin: new Date().toISOString() },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on app initialization
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUser = localStorage.getItem('quickQuizUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error loading saved user data:", error);
        localStorage.removeItem('quickQuizUser');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Mock login function - would connect to database in real implementation
  const login = async (email: string, password: string, userType: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    return new Promise(resolve => {
      setTimeout(() => {
        try {
          // First try to find existing user
          const foundUser = mockUsers.find(u => u.email === email) || {
            id: `user_${Date.now()}`,
            name: email.split('@')[0],
            email,
            avatarUrl: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 8) + 1}.jpg`,
            userType: userType as 'student' | 'teacher' | 'organization'
          };
          
          // Override with selected user type
          const loginUser = {
            ...foundUser,
            userType: userType as 'student' | 'teacher' | 'organization',
            lastLogin: new Date().toISOString()
          };
          
          setUser(loginUser);
          localStorage.setItem('quickQuizUser', JSON.stringify(loginUser));
          resolve(true);
        } catch (error) {
          console.error("Error during login:", error);
          resolve(false);
        } finally {
          setIsLoading(false);
        }
      }, 800);
    });
  };

  // Mock register function - would connect to database in real implementation
  const register = async (name: string, email: string, password: string, userType: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    return new Promise(resolve => {
      setTimeout(() => {
        try {
          const existingUser = mockUsers.find(u => u.email === email);
          
          if (existingUser) {
            resolve(false);
          } else {
            const newUser: User = {
              id: `user_${Date.now()}`,
              name,
              email,
              avatarUrl: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 8) + 1}.jpg`,
              userType: userType as 'student' | 'teacher' | 'organization',
              lastLogin: new Date().toISOString()
            };
            
            setUser(newUser);
            localStorage.setItem('quickQuizUser', JSON.stringify(newUser));
            resolve(true);
          }
        } catch (error) {
          console.error("Error during registration:", error);
          resolve(false);
        } finally {
          setIsLoading(false);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickQuizUser');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
