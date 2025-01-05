import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChartLineUp, Upload, Pill, MessageSquare, LayoutDashboard } from "lucide-react";

interface HowItWorksModalProps {
  open: boolean;
  onClose: () => void;
}

export const HowItWorksModal = ({ open, onClose }: HowItWorksModalProps) => {
  const steps = [
    {
      icon: <ChartLineUp className="w-8 h-8 text-primary" />,
      title: "Input Health Metrics",
      description: "Enter your basic health information and metrics",
    },
    {
      icon: <Upload className="w-8 h-8 text-primary" />,
      title: "Upload Test Results",
      description: "Upload your blood work and/or genetic test results",
    },
    {
      icon: <Pill className="w-8 h-8 text-primary" />,
      title: "Get Personalized Plan",
      description: "Receive tailored supplement recommendations based on your data",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Chat Support",
      description: "Access our health assistant for guidance and questions",
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
      title: "Track Progress",
      description: "Monitor your health journey through your personalized dashboard",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            How It Works
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-8 py-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="shrink-0">{step.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-secondary mb-1">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};