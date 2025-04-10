
import { Link } from 'react-router-dom';
import {
  LogOut,
  PlusCircle,
  Settings,
  User,
  BookOpen,
  Trophy,
  BarChart,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const UserProfileMenu = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <Link to="/login">Log in</Link>
        </Button>
        <Button className="gradient-button" asChild>
          <Link to="/register">Sign up</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20 text-primary">
                {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex cursor-pointer items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          {user.userType === 'student' && (
            <DropdownMenuItem asChild>
              <Link to="/take" className="flex cursor-pointer items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Take Quiz</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          {(user.userType === 'teacher' || user.userType === 'organization') && (
            <DropdownMenuItem asChild>
              <Link to="/create" className="flex cursor-pointer items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Create Quiz</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem asChild>
            <Link to="/leaderboard" className="flex cursor-pointer items-center">
              <Trophy className="mr-2 h-4 w-4" />
              <span>Leaderboard</span>
            </Link>
          </DropdownMenuItem>
          
          {user.userType === 'organization' && (
            <DropdownMenuItem asChild>
              <Link to="/analytics" className="flex cursor-pointer items-center">
                <BarChart className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex cursor-pointer items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
