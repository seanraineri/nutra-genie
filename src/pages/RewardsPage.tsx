
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
          <Gift className="h-6 w-6 text-[#3498DB]" />
          <h1 className="text-3xl font-bold text-gray-900">Rewards Program</h1>
        </div>
        <p className="text-gray-600 text-base mb-8 ml-9">
          We really want to get as many people healthy as possible and feel good, help us help you!
        </p>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Referral Program</h2>
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
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-800">
                          {tier.referrals} Referrals
                        </h3>
                        <p className="text-base text-[#3498DB] mt-1 font-medium">
                          {tier.reward}
                        </p>
                        {tier.referrals === 25 && (
                          <p className="text-gray-600 mt-2 text-xs">
                            Earn 20% of the revenue from each member you refer
                          </p>
                        )}
                      </div>
                      <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#3498DB] font-bold text-sm">{tier.referrals}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
