import { Loader2 } from "lucide-react";

export const LoadingSpinner = ({ className = "" }: { className?: string }) => {
  return <Loader2 className={`h-6 w-6 animate-spin ${className}`} />;
};