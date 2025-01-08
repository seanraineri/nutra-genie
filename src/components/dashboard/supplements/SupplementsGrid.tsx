import { Supplement } from "@/types/supplements";
import { SupplementCard } from "./SupplementCard";

interface SupplementsGridProps {
  recommendations: Supplement[];
}

export const SupplementsGrid = ({ recommendations }: SupplementsGridProps) => {
  if (recommendations.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-4">
        No supplement recommendations yet. Chat with the health assistant to get personalized recommendations.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((rec, index) => (
        <SupplementCard key={index} {...rec} />
      ))}
    </div>
  );
};