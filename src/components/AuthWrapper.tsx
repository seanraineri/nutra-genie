
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/api/auth";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    checkSession();
    
    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      if (!session && !isPublicRoute(location.pathname)) {
        navigate('/login');
        toast({
          title: "Session expired",
          description: "Please log in again to continue.",
          variant: "destructive",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [location.pathname, navigate]);

  const isPublicRoute = (path: string) => {
    const publicRoutes = ['/login', '/signup', '/forgot-password', '/', '/about', '/faq'];
    return publicRoutes.includes(path);
  };

  const checkSession = async () => {
    try {
      const { data: { session } } = await auth.getSession();
      
      if (!session && !isPublicRoute(location.pathname)) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Session check error:', error);
      if (!isPublicRoute(location.pathname)) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated && !isPublicRoute(location.pathname)) {
    return null;
  }

  return <>{children}</>;
};
