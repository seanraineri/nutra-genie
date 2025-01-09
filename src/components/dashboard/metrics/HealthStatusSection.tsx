import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="p-6 bg-background rounded-lg border space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-secondary">Health Status</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Exercise Level</label>
          {isEditing ? (
            <Select
              value={personalInfo.exerciseLevel}
              onValueChange={(value) =>
                setPersonalInfo({ ...personalInfo, exerciseLevel: value })
              }
            >
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Select exercise level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <p className="text-primary font-medium capitalize">
              {personalInfo.exerciseLevel}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Current Medications
          </label>
          {isEditing ? (
            <Textarea
              className="min-h-[100px] resize-none bg-background"
              value={personalInfo.medications}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, medications: e.target.value })
              }
              placeholder="List your current medications..."
            />
          ) : (
            <div className="bg-muted/30 rounded-md p-3">
              <pre className="whitespace-pre-line text-sm font-medium">
                {personalInfo.medications}
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Existing Conditions
          </label>
          {isEditing ? (
            <Textarea
              className="min-h-[100px] resize-none bg-background"
              value={personalInfo.conditions}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, conditions: e.target.value })
              }
              placeholder="List any existing medical conditions..."
            />
          ) : (
            <div className="bg-muted/30 rounded-md p-3">
              <pre className="whitespace-pre-line text-sm font-medium">
                {personalInfo.conditions}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};