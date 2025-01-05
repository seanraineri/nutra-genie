import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", vitaminD: 30, b12: 400, iron: 80 },
  { month: "Feb", vitaminD: 35, b12: 450, iron: 85 },
  { month: "Mar", vitaminD: 40, b12: 500, iron: 90 },
  { month: "Apr", vitaminD: 45, b12: 550, iron: 95 },
];

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

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-secondary">Your Health Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Progress Tracking</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vitaminD" stroke="#0891B2" name="Vitamin D" />
                <Line type="monotone" dataKey="b12" stroke="#F97316" name="B12" />
                <Line type="monotone" dataKey="iron" stroke="#164E63" name="Iron" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Supplement Recommendations</h2>
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
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Health Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold text-primary">Vitamin D Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 45 ng/mL
              <br />
              Target range: 30-50 ng/mL
            </p>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <h3 className="font-semibold text-accent">B12 Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 550 pg/mL
              <br />
              Target range: 400-1000 pg/mL
            </p>
          </div>
          <div className="p-4 bg-secondary/10 rounded-lg">
            <h3 className="font-semibold text-secondary">Iron Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 95 μg/dL
              <br />
              Target range: 60-170 μg/dL
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};