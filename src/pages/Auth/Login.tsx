
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [userType, setUserType] = useState('student');
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password, userType);
      
      if (success) {
        toast({
          title: "Login successful",
          description: `Welcome back to Quick Quiz as ${userType}!`
        });
        navigate('/');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try demo@example.com",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Login to Quick Quiz</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Account Type</Label>
                <RadioGroup 
                  value={userType} 
                  onValueChange={setUserType}
                  className="flex flex-col space-y-2 mt-2"
                >
                  <div className="flex items-center space-x-2 p-2 border rounded-md">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="flex-1 cursor-pointer">
                      <div className="font-medium">Student</div>
                      <div className="text-xs text-muted-foreground">Access to join and create tests</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-2 border rounded-md">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher" className="flex-1 cursor-pointer">
                      <div className="font-medium">Teacher</div>
                      <div className="text-xs text-muted-foreground">Access to create, modify and deploy tests</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-2 border rounded-md">
                    <RadioGroupItem value="organization" id="organization" />
                    <Label htmlFor="organization" className="flex-1 cursor-pointer">
                      <div className="font-medium">Organization</div>
                      <div className="text-xs text-muted-foreground">Full access to all services</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                <div className="text-sm text-right">
                  <Link to="/forgot-password" className="text-quiz-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-quiz-primary hover:bg-quiz-accent"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging in...' : 'Log in'} {!isLoggingIn && <LogIn className="ml-2 h-4 w-4" />}
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-quiz-primary hover:underline font-medium">
                  Register
                </Link>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                For demo, use: demo@example.com / any password
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
