import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PrivacyHeader = () => {
  const navigate = useNavigate();
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
    </div>
  );
};