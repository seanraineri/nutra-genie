import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HealthFormData } from "@/types/health-form";

interface PersonalInfoInputsProps {
  formData: HealthFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoInputs = ({ formData, onChange }: PersonalInfoInputsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={onChange}
          required
          minLength={6}
        />
      </div>
    </div>
  );
};