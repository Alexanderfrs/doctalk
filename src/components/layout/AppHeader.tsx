
import React from 'react';
import { Link } from 'react-router-dom';
import AppLogo from './AppLogo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';

interface AppHeaderProps {
  onLogin?: () => void;
  onToggleMobileMenu?: () => void;
  showSlogan?: boolean;
  showAuthButtons?: boolean;
  showLandingNavigation?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  onLogin,
  onToggleMobileMenu,
  showSlogan = true,
  showAuthButtons = false,
  showLandingNavigation = false
}) => {
  const { isAuthenticated } = useAuth();
  const { isAdmin } = useUserRole();

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and branding */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <AppLogo showSlogan={showSlogan} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-neutral-700 hover:text-medical-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/practice" className="text-neutral-700 hover:text-medical-600 transition-colors">
                Practice
              </Link>
              <Link to="/vocabulary" className="text-neutral-700 hover:text-medical-600 transition-colors">
                Vocabulary
              </Link>
              <Link to="/profile" className="text-neutral-700 hover:text-medical-600 transition-colors">
                Profile
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-medical-600 hover:text-medical-700 transition-colors font-medium">
                  Admin
                </Link>
              )}
            </>
          ) : showLandingNavigation ? (
            <>
              <a href="#hero" className="text-neutral-700 hover:text-medical-600 transition-colors">
                Home
              </a>
              <a href="#target-users" className="text-neutral-700 hover:text-medical-600 transition-colors">
                Who It's For
              </a>
              <a href="#problem" className="text-neutral-700 hover:text-medical-600 transition-colors">
                The Problem
              </a>
              <a href="#solution" className="text-neutral-700 hover:text-medical-600 transition-colors">
                Solution
              </a>
              <a href="#pricing" className="text-neutral-700 hover:text-medical-600 transition-colors">
                Pricing
              </a>
            </>
          ) : null}
        </nav>

        {/* Auth buttons */}
        {showAuthButtons && !isAuthenticated && (
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={onLogin}>
              Sign In
            </Button>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        {onToggleMobileMenu && (
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onToggleMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
