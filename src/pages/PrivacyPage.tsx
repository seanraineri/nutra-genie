import { PrivacyHeader } from "@/components/privacy/PrivacyHeader";
import { DataCollectionSection } from "@/components/privacy/DataCollectionSection";
import { SecuritySection } from "@/components/privacy/SecuritySection";
import { DataUsageSection } from "@/components/privacy/DataUsageSection";
import { ThirdPartySection } from "@/components/privacy/ThirdPartySection";
import { UserRightsSection } from "@/components/privacy/UserRightsSection";
import { ComplianceSection } from "@/components/privacy/ComplianceSection";
import { UpdatesSection } from "@/components/privacy/UpdatesSection";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <PrivacyHeader />
          <DataCollectionSection />
          <SecuritySection />
          <DataUsageSection />
          <ThirdPartySection />
          <UserRightsSection />
          <ComplianceSection />
          <UpdatesSection />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;