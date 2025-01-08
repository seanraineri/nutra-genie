import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "./ui/loading-spinner";
import { useToast } from "./ui/use-toast";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !session) {
      toast({
        title: "Account Required",
        description: "Please create an account to access this feature. It's free to get started!",
        duration: 5000,
        variant: "default",
        action: (
          <button
            onClick={() => navigate("/input")}
            className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </button>
        ),
      });
      navigate("/");
    }
  }, [session, isLoading, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};