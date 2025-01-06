import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalInfoSectionProps {
  isEditing: boolean;
  personalInfo: {
    age: string;
    gender: string;
    height: string;
    weight: string;
  };
  setPersonalInfo: (info: any) => void;
}

export const PersonalInfoSection = ({
  isEditing,
  personalInfo,
  setPersonalInfo,
}: PersonalInfoSectionProps) => {
  return (
    <div className="p-4 bg-background rounded-lg border">
      <h3 className="font-semibold text-secondary mb-4">Personal Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Age</label>
          {isEditing ? (
            <Input
              value={personalInfo.age}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, age: e.target.value })
              }
              className="w-full"
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
              onValueChange={(value) =>
                setPersonalInfo({ ...personalInfo, gender: value })
              }
            >
              <SelectTrigger className="w-full bg-white border-input hover:bg-accent/10 transition-colors">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="male" className="cursor-pointer hover:bg-accent/10">Male</SelectItem>
                <SelectItem value="female" className="cursor-pointer hover:bg-accent/10">Female</SelectItem>
                <SelectItem value="other" className="cursor-pointer hover:bg-accent/10">Other</SelectItem>
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
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, height: e.target.value })
              }
              className="w-full"
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
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, weight: e.target.value })
              }
              className="w-full"
            />
          ) : (
            <p>{personalInfo.weight}</p>
          )}
        </div>
      </div>
    </div>
  );
};