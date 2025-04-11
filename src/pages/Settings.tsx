
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Shield, 
  Eye, 
  Mic, 
  Video, 
  Info, 
  Bell, 
  Globe, 
  Database,
  Upload,
  Download,
  FileText
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { importQuizzesFromCSV, importResultsFromCSV } from '@/data/quizUtils';

const Settings = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Define states for various settings
  const [privacySettings, setPrivacySettings] = useState({
    shareData: true,
    shareActivity: false,
    allowNotifications: true,
    allowMic: false,
    allowVideo: false,
    allowWebAccess: true,
  });

  // Handle privacy setting changes
  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      // Show toast for the setting change
      toast({
        title: `${setting} ${newSettings[setting] ? 'enabled' : 'disabled'}`,
        description: `Your preference has been saved.`,
      });
      
      return newSettings;
    });
  };

  // Handle importing from Excel
  const handleImportFromExcel = () => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    
    fileInput.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;
      
      const file = target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const csvContent = e.target?.result as string;
        
        try {
          const importedQuizzes = importQuizzesFromCSV(csvContent);
          
          console.log('Imported quizzes:', importedQuizzes);
          
          toast({
            title: "Import successful",
            description: `Imported ${importedQuizzes.length} quizzes from CSV file.`,
          });
        } catch (error) {
          console.error('Import error:', error);
          
          toast({
            title: "Import failed",
            description: "There was an error importing the CSV file.",
            variant: "destructive"
          });
        }
      };
      
      reader.readAsText(file);
    });
    
    // Trigger file selection
    fileInput.click();
  };
  
  // Handle importing results from Excel
  const handleImportResults = () => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    
    fileInput.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;
      
      const file = target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const csvContent = e.target?.result as string;
        
        try {
          const importedResults = importResultsFromCSV(csvContent);
          
          console.log('Imported results:', importedResults);
          
          toast({
            title: "Import successful",
            description: `Imported ${importedResults.length} quiz results from CSV file.`,
          });
        } catch (error) {
          console.error('Import error:', error);
          
          toast({
            title: "Import failed",
            description: "There was an error importing the CSV file.",
            variant: "destructive"
          });
        }
      };
      
      reader.readAsText(file);
    });
    
    // Trigger file selection
    fileInput.click();
  };
  
  // Handle exporting results
  const handleExportResults = () => {
    // In a real app, you would fetch actual results from storage/database
    const resultsFromStorage = localStorage.getItem('quiz_results');
    
    if (!resultsFromStorage) {
      toast({
        title: "No results to export",
        description: "There are no quiz results available to export.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const results = JSON.parse(resultsFromStorage);
      
      // Create CSV content
      const headers = ["ID", "Quiz ID", "Username", "Score", "Time Taken", "Completed At"];
      const rows = results.map((result: any) => [
        result.id,
        result.quizId,
        result.username,
        result.score,
        result.timeTaken,
        result.completedAt
      ]);
      
      const csvContent = [
        headers.join(","),
        ...rows.map((row: any[]) => row.join(","))
      ].join("\n");
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `quiz_results_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export successful",
        description: "Quiz results have been exported to CSV file.",
      });
    } catch (error) {
      console.error('Export error:', error);
      
      toast({
        title: "Export failed",
        description: "There was an error exporting the quiz results.",
        variant: "destructive"
      });
    }
  };

  // Handle save settings
  const handleSaveSettings = () => {
    // Here you would typically save to a backend/database
    toast({
      title: "Settings saved",
      description: "Your preferences have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container max-w-6xl py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <Card>
              <CardHeader className="px-4 py-3 border-b">
                <CardTitle className="text-xl">Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="appearance" orientation="vertical" className="w-full">
                  <TabsList className="flex flex-col h-auto items-stretch rounded-none border-r bg-transparent p-0">
                    <TabsTrigger 
                      value="appearance" 
                      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 font-normal data-[state=active]:border-l-primary data-[state=active]:bg-muted"
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="privacy" 
                      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 font-normal data-[state=active]:border-l-primary data-[state=active]:bg-muted"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 font-normal data-[state=active]:border-l-primary data-[state=active]:bg-muted"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger 
                      value="integrations" 
                      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 font-normal data-[state=active]:border-l-primary data-[state=active]:bg-muted"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Integrations
                    </TabsTrigger>
                    <TabsTrigger 
                      value="help" 
                      className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 font-normal data-[state=active]:border-l-primary data-[state=active]:bg-muted"
                    >
                      <Info className="mr-2 h-4 w-4" />
                      Help & Support
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate(-1)}
            >
              Back to Dashboard
            </Button>
          </div>
          
          {/* Main content */}
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="appearance" className="w-full">
              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how Quick Quiz looks for you. Changes will apply to this browser only.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Theme</h3>
                          <p className="text-sm text-muted-foreground">
                            Toggle between light and dark themes
                          </p>
                        </div>
                        <ThemeToggle />
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-3">Theme Preview</h3>
                        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                          <p>This is how content will look with the selected theme.</p>
                          <div className="flex gap-2 mt-3">
                            <Button>Primary Button</Button>
                            <Button variant="outline">Secondary Button</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                    <CardDescription>
                      Manage how your data is used and shared
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            <span className="font-medium">Share activity data</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Allow your quiz activities to be visible to professors
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.shareActivity}
                          onCheckedChange={() => handlePrivacyToggle('shareActivity')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <Database className="w-4 h-4 mr-2" />
                            <span className="font-medium">Analytics data sharing</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Share anonymous usage data to help improve the platform
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.shareData}
                          onCheckedChange={() => handlePrivacyToggle('shareData')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Device Permissions</CardTitle>
                    <CardDescription>
                      Manage access to your device features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <Mic className="w-4 h-4 mr-2" />
                            <span className="font-medium">Microphone access</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Allow access to your microphone for audio quizzes
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.allowMic}
                          onCheckedChange={() => handlePrivacyToggle('allowMic')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <Video className="w-4 h-4 mr-2" />
                            <span className="font-medium">Camera access</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Allow access to your camera for proctored exams
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.allowVideo}
                          onCheckedChange={() => handlePrivacyToggle('allowVideo')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            <span className="font-medium">Web integration</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Allow connection with external websites and services
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.allowWebAccess}
                          onCheckedChange={() => handlePrivacyToggle('allowWebAccess')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-medium">Quiz reminders</span>
                          <p className="text-sm text-muted-foreground">
                            Get notifications about upcoming and pending quizzes
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.allowNotifications}
                          onCheckedChange={() => handlePrivacyToggle('allowNotifications')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Integrations</CardTitle>
                    <CardDescription>
                      Connect with external services and import/export data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="text-lg font-medium mb-2">Excel Integration</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Import quiz questions from Excel or export quiz results to Excel
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          onClick={handleImportFromExcel}
                          className="flex gap-2 items-center"
                        >
                          <Upload size={16} />
                          Import Quizzes
                        </Button>
                        <Button
                          onClick={handleExportResults}
                          className="flex gap-2 items-center"
                        >
                          <Download size={16} />
                          Export Results
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h3 className="text-lg font-medium mb-2">Results Management</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Import external quiz results or manage existing result data
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          onClick={handleImportResults}
                          className="flex gap-2 items-center"
                        >
                          <Upload size={16} />
                          Import Results
                        </Button>
                        <Button
                          onClick={() => navigate('/leaderboard')}
                          className="flex gap-2 items-center"
                        >
                          <FileText size={16} />
                          View Leaderboard
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="help" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Help & Support</CardTitle>
                    <CardDescription>
                      Get help with using Quick Quiz
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium">FAQ</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">
                          Answers to commonly asked questions
                        </p>
                        <Button variant="outline" size="sm">View FAQs</Button>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium">Contact Support</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">
                          Get in touch with our support team
                        </p>
                        <Button variant="outline" size="sm">Contact Us</Button>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium">Tutorial Videos</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">
                          Learn how to use all features
                        </p>
                        <Button variant="outline" size="sm">Watch Tutorials</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Database Connection</CardTitle>
                    <CardDescription>
                      Information about connecting to external databases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        For large-scale quiz management or educational institutions, we recommend setting up a database connection. 
                        This will enable more robust data storage, user management, and analytics capabilities.
                      </p>
                      
                      <div className="bg-gray-100 p-4 rounded-md text-sm">
                        <h4 className="font-medium mb-2">Supported Database Types:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>MySQL</li>
                          <li>PostgreSQL</li>
                          <li>MongoDB</li>
                          <li>Firebase</li>
                          <li>Supabase</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Setup Database Connection
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSettings}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
