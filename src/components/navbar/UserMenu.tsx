
import { Link } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const UserMenu = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return (
      <div className="ml-4 flex items-center">
        <Button variant="ghost" asChild>
          <Link to="/login">Sign in</Link>
        </Button>
        <Button asChild className="ml-2">
          <Link to="/register">Sign up</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="ml-3 relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative rounded-full" size="icon">
            <Avatar>
              <AvatarFallback className="bg-quiz-primary text-white">
                {user.name ? user.name[0] : 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email || 'user@example.com'}
            </p>
          </div>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => logout()}
            className="cursor-pointer text-red-600 flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
