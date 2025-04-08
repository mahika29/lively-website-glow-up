
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertCircle size={48} className="text-red-500" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-quiz-primary mb-4">404</h1>
          <p className="text-2xl font-bold mb-3">Page Not Found</p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved. Return to the home page to continue your quiz adventure.
          </p>
          
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home size={18} />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
