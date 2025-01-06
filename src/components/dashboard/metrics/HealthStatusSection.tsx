import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HealthStatusSectionProps {
  isEditing: boolean;
  personalInfo: {
    exerciseLevel: string;
    medications: string;
    conditions: string;
  };
  setPersonalInfo: (info: any) => void;
}

export const HealthStatusSection = ({
  isEditing,
  personalInfo,
  setPersonalInfo,
}: HealthStatusSectionProps) => {
  return (
    <div className="p-4 bg-background rounded-lg border">
      <h3 className="font-semibold text-secondary mb-4">Health Status</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Exercise Level</label>
          {isEditing ? (
            <Select
              value={personalInfo.exerciseLevel}
              onValueChange={(value) =>
                setPersonalInfo({ ...personalInfo, exerciseLevel: value })
              }
            >
              <SelectTrigger className="w-full bg-white border-input hover:bg-accent/10 transition-colors">
                <SelectValue placeholder="Select exercise level" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="low" className="cursor-pointer hover:bg-accent/10">Low</SelectItem>
                <SelectItem value="medium" className="cursor-pointer hover:bg-accent/10">Medium</SelectItem>
                <SelectItem value="high" className="cursor-pointer hover:bg-accent/10">High</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <p className="text-primary font-medium capitalize">
              {personalInfo.exerciseLevel}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Current Medications
          </label>
          {isEditing ? (
            <textarea
              className="w-full min-h-[80px] p-2 border rounded-md"
              value={personalInfo.medications}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, medications: e.target.value })
              }
            />
          ) : (
            <p className="whitespace-pre-line text-sm">
              {personalInfo.medications}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Existing Conditions
          </label>
          {isEditing ? (
            <textarea
              className="w-full min-h-[80px] p-2 border rounded-md"
              value={personalInfo.conditions}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, conditions: e.target.value })
              }
            />
          ) : (
            <p className="whitespace-pre-line text-sm">{personalInfo.conditions}</p>
          )}
        </div>
      </div>
    </div>
  );
};