import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChartLine, Upload, Pill, MessageSquare, LayoutDashboard, Gift, MessageCircle } from "lucide-react";

interface HowItWorksModalProps {
  open: boolean;
  onClose: () => void;
}

export const HowItWorksModal = ({ open, onClose }: HowItWorksModalProps) => {
  const steps = [
    {
      icon: <ChartLine className="w-8 h-8" />,
      title: "Input Health Metrics",
      description: "Enter your basic health information and metrics",
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Test Results",
      description: "Upload your blood work and/or genetic test results",
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Get Personalized Plan",
      description: "Receive tailored supplement recommendations based on your data",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Chat Support",
      description: "Access our holistic health assistant for guidance and questions",
    },
    {
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your health journey daily and receive recaps and insights",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Receive Texts",
      description: "Everyday we will remind you to take your supplements and your holistic health advice providing inspiration to feel better and live healthier",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Redeem Prizes",
      description: "Earn XP points for logging if you took your supplements, complete your daily quiz, and refer friends in exchange for prizes like custom merch and fitness classes!",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-8">
            How It Works
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-8 py-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-6"
            >
              <div className="shrink-0 w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                <div className="text-cyan-600 dark:text-cyan-400">
                  {step.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};