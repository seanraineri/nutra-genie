import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const ContentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-secondary">Educational Content</h1>
            <Button variant="outline">View All Blog Posts</Button>
          </div>
          
          <Tabs defaultValue="blogs" className="w-full">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1">
              <TabsTrigger value="blogs" className="flex-1">Blog Posts</TabsTrigger>
              <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blogs" className="mt-6">
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
            </TabsContent>
            
            <TabsContent value="videos" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Card className="p-6">
                  <div className="aspect-video bg-muted mb-4 rounded-lg"></div>
                  <h3 className="text-xl font-semibold mb-2">Supplement Guide</h3>
                  <p className="text-muted-foreground">A comprehensive guide to choosing the right supplements.</p>
                </Card>
                <Card className="p-6">
                  <div className="aspect-video bg-muted mb-4 rounded-lg"></div>
                  <h3 className="text-xl font-semibold mb-2">Nutrition Basics</h3>
                  <p className="text-muted-foreground">Understanding fundamental nutrition principles.</p>
                </Card>
                <Card className="p-6">
                  <div className="aspect-video bg-muted mb-4 rounded-lg"></div>
                  <h3 className="text-xl font-semibold mb-2">Workout Tips</h3>
                  <p className="text-muted-foreground">Essential workout tips for better results.</p>
                </Card>
                <Card className="p-6">
                  <div className="aspect-video bg-muted mb-4 rounded-lg"></div>
                  <h3 className="text-xl font-semibold mb-2">Health Myths</h3>
                  <p className="text-muted-foreground">Debunking common health and supplement myths.</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
