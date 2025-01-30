import { Supplement } from "@/types/supplements";
import { SupplementCard } from "./SupplementCard";

interface SupplementsGridProps {
  recommendations: Supplement[];
}

export const SupplementsGrid = ({ recommendations }: SupplementsGridProps) => {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-[#8B5CF6]">
          Your supplement recommendations will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((supplement) => (
        <SupplementCard
          key={supplement.id}
          name={supplement.supplement_name}
          dosage={supplement.dosage}
          reason={supplement.reason}
          cost={supplement.estimated_cost}
          company={supplement.company_name}
          productUrl={supplement.product_url}
          imageUrl={supplement.image_url}
        />
      ))}
    </div>
  );
};