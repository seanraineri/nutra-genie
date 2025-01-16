import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Biomarker {
  name: string;
  value: string;
}

interface BiomarkerInputsProps {
  onChange: (biomarkers: Biomarker[]) => void;
}

export const BiomarkerInputs = ({ onChange }: BiomarkerInputsProps) => {
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([{ name: "", value: "" }]);

  const handleAddBiomarker = () => {
    setBiomarkers([...biomarkers, { name: "", value: "" }]);
  };

  const handleRemoveBiomarker = (index: number) => {
    const newBiomarkers = biomarkers.filter((_, i) => i !== index);
    setBiomarkers(newBiomarkers);
    onChange(newBiomarkers);
  };

  const handleBiomarkerChange = (index: number, field: keyof Biomarker, value: string) => {
    const newBiomarkers = biomarkers.map((biomarker, i) => {
      if (i === index) {
        return { ...biomarker, [field]: value };
      }
      return biomarker;
    });
    setBiomarkers(newBiomarkers);
    onChange(newBiomarkers);
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-muted-foreground">Or</div>
      <Label>Upload Biomarkers you are concerned with</Label>
      {biomarkers.map((biomarker, index) => (
        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4">
          <div>
            <Input
              placeholder="Biomarker name (e.g., Vitamin D)"
              value={biomarker.name}
              onChange={(e) => handleBiomarkerChange(index, "name", e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Value"
              value={biomarker.value}
              onChange={(e) => handleBiomarkerChange(index, "value", e.target.value)}
            />
          </div>
          <div className="w-10">
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveBiomarker(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleAddBiomarker}
      >
        <Plus className="h-4 w-4" />
        Add Another Biomarker
      </Button>
    </div>
  );
};