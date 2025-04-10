
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: 'student' | 'teacher' | 'organization' | string[];
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    if (user && requiredUserType) {
      // Check if the user has the required user type
      const hasRequiredType = Array.isArray(requiredUserType) 
        ? requiredUserType.includes(user.userType)
        : user.userType === requiredUserType;
      
      if (!hasRequiredType) {
        toast({
          title: "Access Denied",
          description: `This section is only available for ${Array.isArray(requiredUserType) ? requiredUserType.join(' or ') : requiredUserType} accounts.`,
          variant: "destructive"
        });
      }
    }
  }, [user, requiredUserType, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to login and store the current path to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  // Check if the user has the required user type
  if (requiredUserType) {
    const hasRequiredType = Array.isArray(requiredUserType) 
      ? requiredUserType.includes(user.userType)
      : user.userType === requiredUserType;
      
    if (!hasRequiredType) {
      return <Navigate to="/" />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
