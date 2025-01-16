import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Trash2, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const FamilyPlanPage = () => {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', firstName: '', lastName: '', email: '' },
    { id: '2', firstName: '', lastName: '', email: '' }
  ]);

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { 
        id: Math.random().toString(36).substr(2, 9),
        firstName: '',
        lastName: '',
        email: ''
      }
    ]);
  };

  const removeFamilyMember = (id: string) => {
    if (familyMembers.length <= 2) return; // Prevent removing if only 2 members
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const updateFamilyMember = (id: string, field: keyof FamilyMember, value: string) => {
    setFamilyMembers(familyMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleContinueToPayment = () => {
    // Get the primary member's email (first family member)
    const primaryEmail = familyMembers[0].email;
    navigate(`/payment?email=${encodeURIComponent(primaryEmail)}&plan=family`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-4 mb-8">
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
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl font-bold text-center">Family Health Plan</h1>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4 bg-secondary text-secondary-foreground">
                <p className="text-sm">
                  After you input your health metrics, invite at least two other family members to join and pay at a new rate of $15/month for each member. They will get a sign up confirmation link after payment.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <p className="text-center text-muted-foreground mb-8">
            Bring Wellness to your Whole Family!
          </p>

          <div className="space-y-6">
            {familyMembers.map((member, index) => (
              <Card key={member.id} className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Family Member {index + 1}
                  </h3>
                  {familyMembers.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFamilyMember(member.id)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor={`firstName-${member.id}`} className="text-sm font-medium">
                        First Name
                      </label>
                      <Input
                        id={`firstName-${member.id}`}
                        value={member.firstName}
                        onChange={(e) => updateFamilyMember(member.id, 'firstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor={`lastName-${member.id}`} className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id={`lastName-${member.id}`}
                        value={member.lastName}
                        onChange={(e) => updateFamilyMember(member.id, 'lastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor={`email-${member.id}`} className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id={`email-${member.id}`}
                      type="email"
                      value={member.email}
                      onChange={(e) => updateFamilyMember(member.id, 'email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </Card>
            ))}

            <Button
              onClick={addFamilyMember}
              variant="outline"
              className="w-full flex items-center gap-2 mt-4"
            >
              <Plus className="h-4 w-4" />
              Add Family Member
            </Button>
          </div>

          <Button 
            className="w-full mt-8"
            size="lg"
            onClick={handleContinueToPayment}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FamilyPlanPage;