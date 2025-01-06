import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-secondary/10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <h1 className="text-3xl font-bold mb-6 text-secondary">Privacy Policy</h1>
      <div className="prose">
        <p className="text-muted-foreground">
          This is our privacy policy page. Content to be added.
        </p>
      </div>
    </div>
  );
};

export default Privacy;