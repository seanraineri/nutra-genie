
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ContentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="absolute top-8 left-4 sm:left-8">
          <Button
            variant="ghost"
            size="sm"
            className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] text-white hover:opacity-90"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="space-y-6 mt-16">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-secondary">Educational Content</h1>
            <Button variant="outline">View All Blog Posts</Button>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Understanding Vitamin D</h3>
              <p className="text-muted-foreground">Learn about the importance of Vitamin D and how it affects your health.</p>
              <Button className="mt-4" variant="outline">Read More</Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Omega-3 Benefits</h3>
              <p className="text-muted-foreground">Discover the essential benefits of Omega-3 fatty acids for your health.</p>
              <Button className="mt-4" variant="outline">Read More</Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Magnesium Guide</h3>
              <p className="text-muted-foreground">Everything you need to know about magnesium supplementation.</p>
              <Button className="mt-4" variant="outline">Read More</Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Vitamin B Complex</h3>
              <p className="text-muted-foreground">Understanding the different B vitamins and their roles.</p>
              <Button className="mt-4" variant="outline">Read More</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
