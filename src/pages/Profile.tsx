
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Trophy, Clock, User, BarChart3, Settings, LogOut, HeartPulse, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile sidebar */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full mb-4 overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img 
                        src={user.avatarUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <div><User className="mr-2 h-4 w-4" /> Profile</div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <div><BarChart3 className="mr-2 h-4 w-4" /> Statistics</div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <div><Trophy className="mr-2 h-4 w-4" /> Achievements</div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <div><Settings className="mr-2 h-4 w-4" /> Settings</div>
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <Tabs defaultValue="profile">
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal details here</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={formData.name} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled
                          />
                          <p className="text-xs text-gray-500">Your email cannot be changed</p>
                        </div>
                        <Button type="submit">Save Changes</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="stats">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Learning Statistics</CardTitle>
                      <CardDescription>Track your progress and performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Quizzes Taken</h3>
                            <Search className="h-4 w-4 text-gray-400" />
                          </div>
                          <p className="text-3xl font-bold">12</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Score</h3>
                            <Trophy className="h-4 w-4 text-yellow-500" />
                          </div>
                          <p className="text-3xl font-bold">76%</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Spent</h3>
                            <Clock className="h-4 w-4 text-blue-500" />
                          </div>
                          <p className="text-3xl font-bold">4.5h</p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Technology</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Science</span>
                            <span className="text-sm font-medium">72%</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">History</span>
                            <span className="text-sm font-medium">63%</span>
                          </div>
                          <Progress value={63} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Languages</span>
                            <span className="text-sm font-medium">91%</span>
                          </div>
                          <Progress value={91} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Achievements</CardTitle>
                      <CardDescription>Badges and milestones you've reached</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3 mx-auto">
                            <Trophy className="h-6 w-6" />
                          </div>
                          <h3 className="font-semibold mb-1">Quiz Master</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Complete 10 quizzes</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3 mx-auto">
                            <HeartPulse className="h-6 w-6" />
                          </div>
                          <h3 className="font-semibold mb-1">Perfect Score</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Get 100% on any quiz</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center opacity-50">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mb-3 mx-auto">
                            <Flame className="h-6 w-6" />
                          </div>
                          <h3 className="font-semibold mb-1">Streak Master</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">7 day streak (locked)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
