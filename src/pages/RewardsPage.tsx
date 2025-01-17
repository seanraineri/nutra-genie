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
        <div className="flex items-center gap-3 mb-2">
          <Gift className="h-8 w-8 text-[#3498DB]" />
          <h1 className="text-4xl font-bold text-gray-900">Rewards Program</h1>
        </div>
        <p className="text-gray-600 text-lg mb-8 ml-11">
          We really want to get as many people healthy as possible and feel good, help us help you!
        </p>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Referral Program</h2>
            <div className="space-y-6">
              <div className="grid gap-6">
                {[
                  { referrals: 5, reward: "1 Month Free" },
                  { referrals: 10, reward: "3 Months Free" },
                  { referrals: 15, reward: "1 Year Free" },
                  { referrals: 20, reward: "Lifetime Free" },
                  { referrals: 25, reward: "Lifetime Free + 20% Revenue Share" },
                ].map((tier, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {tier.referrals} Referrals
                        </h3>
                        <p className="text-lg text-[#3498DB] mt-2 font-medium">
                          {tier.reward}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <span className="text-[#3498DB] font-bold">{tier.referrals}</span>
                      </div>
                    </div>
                    {tier.referrals === 25 && (
                      <p className="text-gray-600 mt-2 text-sm">
                        Earn 20% of the revenue from each member you refer
                      </p>
                    )}
                  </div>
                ))}
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