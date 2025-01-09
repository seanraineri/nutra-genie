import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Flask, Pill } from "lucide-react";

const WorkWithUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Page title */}
      <h1 className="text-3xl font-bold text-center mb-8">Work with Us</h1>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Influencers Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Influencers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Partner with us to promote science-based supplement recommendations to your audience.
            </p>
            <Button className="w-full">Learn More</Button>
          </CardContent>
        </Card>

        {/* Lab Companies Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flask className="h-6 w-6 text-primary" />
              Lab Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Integrate your lab testing services with our platform for seamless results analysis.
            </p>
            <Button className="w-full">Learn More</Button>
          </CardContent>
        </Card>

        {/* Supplement Companies Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              Supplement Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              List your high-quality supplements on our platform and reach health-conscious customers.
            </p>
            <Button className="w-full">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkWithUsPage;