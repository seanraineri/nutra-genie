import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File uploaded successfully",
        description: "Your lab test results will be processed shortly.",
      });
    }
  };

  const handlePurchase = () => {
    toast({
      title: "Redirecting to lab test purchase",
      description: "You'll be redirected to our partner's website to purchase your lab test.",
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes saved successfully",
      description: "Your health information has been updated.",
    });
  };

  return (
    <Card className="p-4 md:p-6 h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Welcome back, John!</h2>
            <p className="text-muted-foreground">Here's an overview of your health metrics and goals.</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Information"}
          </Button>
        </div>

        {/* Personal Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-background rounded-lg border">
            <h3 className="font-semibold text-secondary mb-2">Personal Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Age</label>
                {isEditing ? (
                  <Input 
                    value={personalInfo.age}
                    onChange={(e) => setPersonalInfo({...personalInfo, age: e.target.value})}
                  />
                ) : (
                  <p>{personalInfo.age} years</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Gender</label>
                {isEditing ? (
                  <Select 
                    value={personalInfo.gender}
                    onValueChange={(value) => setPersonalInfo({...personalInfo, gender: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="capitalize">{personalInfo.gender}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Height</label>
                {isEditing ? (
                  <Input 
                    value={personalInfo.height}
                    onChange={(e) => setPersonalInfo({...personalInfo, height: e.target.value})}
                  />
                ) : (
                  <p>{personalInfo.height}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Weight</label>
                {isEditing ? (
                  <Input 
                    value={personalInfo.weight}
                    onChange={(e) => setPersonalInfo({...personalInfo, weight: e.target.value})}
                  />
                ) : (
                  <p>{personalInfo.weight}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border">
            <h3 className="font-semibold text-secondary mb-2">Health Status</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Exercise Level</label>
                {isEditing ? (
                  <Select 
                    value={personalInfo.exerciseLevel}
                    onValueChange={(value) => setPersonalInfo({...personalInfo, exerciseLevel: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-primary font-medium capitalize">{personalInfo.exerciseLevel}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Current Medications</label>
                {isEditing ? (
                  <textarea 
                    className="w-full min-h-[80px] p-2 border rounded-md"
                    value={personalInfo.medications}
                    onChange={(e) => setPersonalInfo({...personalInfo, medications: e.target.value})}
                  />
                ) : (
                  <p className="whitespace-pre-line text-sm">{personalInfo.medications}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Existing Conditions</label>
                {isEditing ? (
                  <textarea 
                    className="w-full min-h-[80px] p-2 border rounded-md"
                    value={personalInfo.conditions}
                    onChange={(e) => setPersonalInfo({...personalInfo, conditions: e.target.value})}
                  />
                ) : (
                  <p className="whitespace-pre-line text-sm">{personalInfo.conditions}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Vitamin Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold text-primary">Vitamin D Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 45 ng/mL
              <br />
              Target range: 30-50 ng/mL
            </p>
            <Progress value={75} className="mt-2" />
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <h3 className="font-semibold text-accent">B12 Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 550 pg/mL
              <br />
              Target range: 400-1000 pg/mL
            </p>
            <Progress value={65} className="mt-2" />
          </div>
          <div className="p-4 bg-secondary/10 rounded-lg">
            <h3 className="font-semibold text-secondary">Iron Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 95 μg/dL
              <br />
              Target range: 60-170 μg/dL
            </p>
            <Progress value={85} className="mt-2" />
          </div>
        </div>

        {/* Lab Tests Section */}
        <div className="mt-6 p-6 border-2 border-dashed rounded-lg bg-muted/50">
          <h3 className="text-lg font-semibold mb-4">Lab Tests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border">
              <Upload className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium mb-2">Upload Your Lab Tests</h4>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Drop your lab test results here or click to upload
              </p>
              <label className="w-full">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.csv,.xlsx"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" className="w-full">
                  Choose File
                </Button>
              </label>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border">
              <ShoppingCart className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium mb-2">Purchase a Lab Test</h4>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Get comprehensive lab testing through our trusted partners
              </p>
              <Button onClick={handlePurchase} className="w-full">
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
