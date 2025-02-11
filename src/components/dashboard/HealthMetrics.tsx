
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PersonalInfoSection } from "./metrics/PersonalInfoSection";
import { HealthStatusSection } from "./metrics/HealthStatusSection";
import { VitaminMetricsSection } from "./metrics/VitaminMetricsSection";
import { LabTestsSection } from "./metrics/LabTestsSection";
import { Share2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const HealthMetrics = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();
  const [personalInfo, setPersonalInfo] = useState({
    age: "32",
    gender: "male",
    height: "5'10\" (178 cm)",
    weight: "165 lbs (75 kg)",
    exerciseLevel: "medium",
    medications: "- Vitamin D3 (1000 IU)\n- Fish Oil (1000mg)",
    conditions: "- Seasonal allergies\n- Mild hypertension"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes saved successfully",
      description: "Your health information has been updated.",
    });
  };

  const handleReferFriend = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Health Dashboard',
        text: 'I\'ve been using this great health tracking app. Join me!',
        url: window.location.origin
      }).catch((error) => {
        console.log('Error sharing:', error);
        toast({
          title: "Error sharing",
          description: "There was an error sharing the link.",
          variant: "destructive"
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast({
        title: "Link copied to clipboard",
        description: "Share this link with your friends to invite them!",
      });
    }
  };

  const buttonClasses = `
    relative overflow-hidden transition-all duration-300
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-[#0EA5E9] before:to-[#10B981]
    before:opacity-0 before:transition-opacity
    hover:before:opacity-10
    active:before:opacity-20
    disabled:before:opacity-0
    ${isMobile ? 'flex-1' : ''}
  `;

  return (
    <Card className="p-2 md:p-6 h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="space-y-4 md:space-y-6">
        <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
          <div>
            <h2 className="text-xl font-semibold">Welcome back, John!</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Here's an overview of your health metrics and goals.
            </p>
          </div>
          <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
            <Button
              variant="outline"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={buttonClasses}
            >
              {isEditing ? "Save Changes" : "Edit Information"}
            </Button>
            <Button
              variant="outline"
              onClick={handleReferFriend}
              className={`${buttonClasses} gap-2`}
            >
              <Share2 className="h-4 w-4" />
              {!isMobile && "Refer a Friend"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PersonalInfoSection
            isEditing={isEditing}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
          <HealthStatusSection
            isEditing={isEditing}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
        </div>

        <VitaminMetricsSection />
        <LabTestsSection />
      </div>
    </Card>
  );
};
