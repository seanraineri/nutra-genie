import { Supplement } from "@/types/supplements";
import { SupplementCard } from "./SupplementCard";

interface SupplementsGridProps {
  recommendations: Supplement[];
}

export const SupplementsGrid = ({ recommendations }: SupplementsGridProps) => {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No supplement recommendations available yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((supplement) => (
        <SupplementCard
          key={supplement.id}
          id={supplement.id}
          name={supplement.supplement_name}
          dosage={supplement.dosage}
          reason={supplement.reason}
          cost={supplement.estimated_cost}
          companyName={supplement.company_name}
          productUrl={supplement.product_url}
          imageUrl={supplement.image_url}
        />
      ))}
    </div>
  );
};