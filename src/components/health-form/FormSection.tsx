import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const FormSection = ({ title, description, children }: FormSectionProps) => {
  return (
    <div className="space-y-4 p-6 rounded-lg bg-gradient-to-br from-cyan-500/5 to-teal-500/5 border border-cyan-200/20">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};