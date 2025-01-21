import { UseFormReturn } from "react-hook-form";
import { HealthFormSchemaType } from "@/schemas/healthFormSchema";
import { MedicalInfoInputs } from "../metrics/MedicalInfoInputs";

interface MedicalHistoryStepProps {
  form: UseFormReturn<HealthFormSchemaType>;
}

export const MedicalHistoryStep = ({ form }: MedicalHistoryStepProps) => {
  return <MedicalInfoInputs form={form} />;
};