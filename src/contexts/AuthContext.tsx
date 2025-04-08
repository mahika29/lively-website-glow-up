
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  { id: '1', name: 'Demo User', email: 'demo@example.com', avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatarUrl: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: '3', name: 'John Doe', email: 'john@example.com', avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth
    const savedUser = localStorage.getItem('quizzyUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('quizzyUser', JSON.stringify(foundUser));
          resolve(true);
        } else {
          resolve(false);
        }
        
        setIsLoading(false);
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
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
            avatarUrl: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 8) + 1}.jpg`
          };
          
          setUser(newUser);
          localStorage.setItem('quizzyUser', JSON.stringify(newUser));
          resolve(true);
        }
        
        setIsLoading(false);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizzyUser');
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
