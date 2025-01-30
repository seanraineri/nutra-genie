import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Trophy, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FamilyPlanModalProps {
  open: boolean;
  onClose: () => void;
}

export const FamilyPlanModal = ({ open, onClose }: FamilyPlanModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-background to-background/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Family Health Plan
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-200">
            Better health outcomes for the whole family
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <Users className="h-8 w-8 text-cyan-500 mt-1 animate-float-circular" />
              <div>
                <h3 className="font-semibold text-lg text-teal-200">Family Discount</h3>
                <p className="text-gray-300">
                  Get a special rate of $15/month per family member for families of 3-7 members.
                  That's up to 50% off the regular price!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Trophy className="h-8 w-8 text-cyan-500 mt-1 animate-float-circular" />
              <div>
                <h3 className="font-semibold text-lg text-teal-200">Monthly Family Competitions</h3>
                <p className="text-gray-300">
                  Compete with your family members for monthly prizes and rewards.
                  Track progress together and motivate each other to reach health goals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CreditCard className="h-8 w-8 text-cyan-500 mt-1 animate-float-circular" />
              <div>
                <h3 className="font-semibold text-lg text-teal-200">Shared Benefits</h3>
                <p className="text-gray-300">
                  Access premium features, supplement recommendations, and health tracking
                  tools for the entire family under one convenient plan.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              Close
            </Button>
            <Button
              onClick={() => navigate("/family-plan")}
              className="bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 bg-[length:200%_200%] animate-gradient-flow text-white"
            >
              Join Family Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};