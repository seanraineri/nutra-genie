import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift, ArrowLeft } from "lucide-react";

const RewardsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Gift className="h-8 w-8 text-[#3498DB]" />
          <h1 className="text-4xl font-bold text-gray-900">Rewards Program</h1>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 mb-4">
              Earn points for every action you take to improve your health journey with SupplementScribe.ai.
              Redeem your points for exclusive rewards, discounts on supplements, and premium features.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Earn Points</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Complete your health profile: 500 points</li>
                  <li>• Upload lab results: 300 points</li>
                  <li>• Achieve health goals: 200 points</li>
                  <li>• Monthly check-ins: 100 points</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Redeem Rewards</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 10% off supplements: 1000 points</li>
                  <li>• Premium consultation: 2000 points</li>
                  <li>• Custom meal plan: 1500 points</li>
                  <li>• Health coaching session: 3000 points</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Membership Tiers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-[#3498DB]">Bronze</h3>
                <p className="text-gray-600 mb-2">0 - 5000 points</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Basic rewards access</li>
                  <li>• Monthly newsletter</li>
                  <li>• Community access</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-[#3498DB]">Silver</h3>
                <p className="text-gray-600 mb-2">5001 - 15000 points</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 1.5x points earning</li>
                  <li>• Priority support</li>
                  <li>• Exclusive discounts</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 text-[#3498DB]">Gold</h3>
                <p className="text-gray-600 mb-2">15001+ points</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 2x points earning</li>
                  <li>• VIP support</li>
                  <li>• Early access features</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;