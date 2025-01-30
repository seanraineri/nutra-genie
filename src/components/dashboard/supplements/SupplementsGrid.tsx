import { Supplement } from "@/types/supplements";
import { SupplementCard } from "./SupplementCard";

interface SupplementsGridProps {
  recommendations: Supplement[];
}

export const SupplementsGrid = ({ recommendations }: SupplementsGridProps) => {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl font-orbitron text-[#8B5CF6] animate-pulse">
          Step right up! Your supplement recommendations will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((supplement) => (
        <SupplementCard
          key={supplement.id}
          {...supplement}
        />
      ))}
    </div>
  );
};