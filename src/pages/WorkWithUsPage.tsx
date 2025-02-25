
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Users, GraduationCap } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PartnershipForm } from "@/components/partnership/PartnershipForm";

const WorkWithUsPage = () => {
  const navigate = useNavigate();
  const [selectedPartnership, setSelectedPartnership] = useState<'influencer' | 'student' | null>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#10B981] text-white hover:opacity-90"
        onClick={() => navigate(-1)}
        style={{ 
          position: 'absolute',
          top: '1rem',
          left: '1rem'
        }}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Page title */}
      <h1 className="text-3xl font-bold text-center mb-8">Work with Us</h1>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Influencers Card */}
        <Card className="hover:shadow-lg transition-shadow min-h-[280px] flex flex-col">
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Influencers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-6">
            <p className="text-muted-foreground flex-grow">
              Partner with us to promote science-based supplement recommendations to your audience.
            </p>
            <Button 
              className="w-full mt-6"
              onClick={() => setSelectedPartnership('influencer')}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>

        {/* Student Ambassadors Card */}
        <Card className="hover:shadow-lg transition-shadow min-h-[280px] flex flex-col">
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Student Ambassadors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-6">
            <p className="text-muted-foreground flex-grow">
              Join our student ambassador network for marketing experience.
            </p>
            <Button 
              className="w-full mt-6"
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
