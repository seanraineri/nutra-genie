import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HealthFormData } from "@/types/health-form";

interface MedicalInfoInputsProps {
  formData: HealthFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const MedicalInfoInputs = ({ formData, onChange }: MedicalInfoInputsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="medicalConditions">Current Medical Conditions</Label>
        <Textarea
          id="medicalConditions"
          value={formData.medicalConditions}
          onChange={onChange}
          className="min-h-[100px] resize-y"
          placeholder="List any current medical conditions"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies">Allergies</Label>
        <Textarea
          id="allergies"
          value={formData.allergies}
          onChange={onChange}
          className="min-h-[100px] resize-y"
          placeholder="List any allergies you have"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentMedications">Current Medications</Label>
        <Textarea
          id="currentMedications"
          value={formData.currentMedications}
          onChange={onChange}
          className="min-h-[100px] resize-y"
          placeholder="List any medications you're currently taking"
        />
      </div>
    </div>
  );
};