import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PersonalInfoSection } from "./metrics/PersonalInfoSection";
import { HealthStatusSection } from "./metrics/HealthStatusSection";
import { VitaminMetricsSection } from "./metrics/VitaminMetricsSection";
import { LabTestsSection } from "./metrics/LabTestsSection";
import { Share2 } from "lucide-react";

export const HealthMetrics = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
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
    // This will be implemented later to generate unique referral links
    toast({
      title: "Coming Soon",
      description: "The referral system will be available soon!",
    });
  };

  return (
    <Card className="p-4 md:p-6 h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Welcome back, John!</h2>
            <p className="text-muted-foreground">
              Here's an overview of your health metrics and goals.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? "Save Changes" : "Edit Information"}
            </Button>
            <Button
              variant="outline"
              onClick={handleReferFriend}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Refer a Friend
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