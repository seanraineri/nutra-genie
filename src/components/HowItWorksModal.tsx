import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChartLine, Upload, Pill, MessageSquare, LayoutDashboard } from "lucide-react";

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
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl border-2 border-cyan-500/30 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-orbitron text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-text-shimmer">
            How It Works
          </DialogTitle>
        </DialogHeader>
        <div className="relative grid gap-8 py-6">
          {/* Connecting lines */}
          <div className="absolute left-[2.25rem] top-12 h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-cyan-500/50 animate-pulse" />
          
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex items-start gap-6 group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon container with glow effect */}
              <div className="relative z-10 shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-300 animate-float-circular">
                <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                  {step.icon}
                </div>
                <div className="absolute inset-0 rounded-full bg-cyan-500/5 group-hover:bg-cyan-400/10 transition-all duration-300" />
              </div>

              {/* Content with hover effects */}
              <div className="flex-1 p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="font-orbitron text-xl text-cyan-400 group-hover:text-cyan-300 mb-2 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
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