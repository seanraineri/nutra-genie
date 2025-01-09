import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PrivacyHeader = () => {
  const navigate = useNavigate();
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
    </div>
  );
};