import { Card } from "@/components/ui/card";

const recommendations = [
  {
    name: "Vitamin D3",
    dosage: "2000 IU",
    reason: "Current levels below optimal range",
  },
  {
    name: "B-Complex",
    dosage: "500 mcg",
    reason: "Support energy levels and metabolism",
  },
  {
    name: "Iron Supplement",
    dosage: "18 mg",
    reason: "Maintain healthy iron levels",
  },
];

export const SupplementPlan = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Personalized Supplement Plan</h2>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-primary">{rec.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">Dosage: {rec.dosage}</p>
            <p className="text-sm text-muted-foreground">{rec.reason}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};