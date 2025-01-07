import { Checkbox } from "@/components/ui/checkbox";

interface TermsSectionProps {
  acceptedTerms: boolean;
  onTermsChange: (checked: boolean) => void;
}

export const TermsSection = ({ acceptedTerms, onTermsChange }: TermsSectionProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={acceptedTerms}
        onCheckedChange={(checked) => onTermsChange(checked as boolean)}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I accept the{" "}
        <a href="/terms" className="text-primary hover:underline">
          terms and conditions
        </a>
      </label>
    </div>
  );
};