import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Users, Beaker, Pill, GraduationCap } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PartnershipForm } from "@/components/partnership/PartnershipForm";

const WorkWithUsPage = () => {
  const navigate = useNavigate();
  const [selectedPartnership, setSelectedPartnership] = useState<'influencer' | 'lab' | 'supplement' | 'student' | null>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Page title */}
      <h1 className="text-3xl font-bold text-center mb-8">Work with Us</h1>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Influencers Card */}
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Influencers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p className="text-muted-foreground h-[80px]">
              Partner with us to promote science-based supplement recommendations to your audience.
            </p>
            <Button 
              className="w-full mt-auto"
              onClick={() => setSelectedPartnership('influencer')}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>

        {/* Lab Companies Card */}
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-6 w-6 text-primary" />
              Lab Companies
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p className="text-muted-foreground h-[80px]">
              Integrate your lab testing services with our platform for seamless results analysis.
            </p>
            <Button 
              className="w-full mt-auto"
              onClick={() => setSelectedPartnership('lab')}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>

        {/* Supplement Companies Card */}
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              Supplement Companies
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p className="text-muted-foreground h-[80px]">
              List your high-quality supplements on our platform and reach health-conscious customers.
            </p>
            <Button 
              className="w-full mt-auto"
              onClick={() => setSelectedPartnership('supplement')}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>

        {/* Student Ambassadors Card */}
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Student Ambassadors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p className="text-muted-foreground h-[80px]">
              Join our student ambassador network for marketing experience and a chance for extra money.
            </p>
            <Button 
              className="w-full mt-auto"
              onClick={() => setSelectedPartnership('student')}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Partnership Application Dialog */}
      <Dialog 
        open={selectedPartnership !== null}
        onOpenChange={(open) => !open && setSelectedPartnership(null)}
      >
        <DialogContent className="sm:max-w-md">
          {selectedPartnership && (
            <PartnershipForm
              type={selectedPartnership}
              onClose={() => setSelectedPartnership(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkWithUsPage;