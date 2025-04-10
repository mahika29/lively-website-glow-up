
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  userType: 'student' | 'teacher' | 'organization';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  { id: '1', name: 'Demo Student', email: 'demo@example.com', avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg', userType: 'student' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatarUrl: 'https://randomuser.me/api/portraits/women/17.jpg', userType: 'teacher' },
  { id: '3', name: 'John Doe', email: 'john@example.com', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg', userType: 'organization' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth
    const savedUser = localStorage.getItem('quickQuizUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        // For demo, allow any credentials, but assign the correct user type
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
          userType: userType as 'student' | 'teacher' | 'organization'
        };
        
        setUser(loginUser);
        localStorage.setItem('quickQuizUser', JSON.stringify(loginUser));
        resolve(true);
        
        setIsLoading(false);
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string, userType: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          resolve(false);
        } else {
          const newUser: User = {
            id: `user_${Date.now()}`,
            name,
            email,
            avatarUrl: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 8) + 1}.jpg`,
            userType: userType as 'student' | 'teacher' | 'organization'
          };
          
          setUser(newUser);
          localStorage.setItem('quickQuizUser', JSON.stringify(newUser));
          resolve(true);
        }
        
        setIsLoading(false);
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
