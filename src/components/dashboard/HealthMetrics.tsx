import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", vitaminD: 30, b12: 400, iron: 80 },
  { month: "Feb", vitaminD: 35, b12: 450, iron: 85 },
  { month: "Mar", vitaminD: 40, b12: 500, iron: 90 },
  { month: "Apr", vitaminD: 45, b12: 550, iron: 95 },
];

export const HealthMetrics = () => {
  return (
    <Card className="p-4 md:p-6 h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here's an overview of your health metrics and goals.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold text-primary">Vitamin D Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 45 ng/mL
              <br />
              Target range: 30-50 ng/mL
            </p>
            <Progress value={75} className="mt-2" />
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <h3 className="font-semibold text-accent">B12 Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 550 pg/mL
              <br />
              Target range: 400-1000 pg/mL
            </p>
            <Progress value={65} className="mt-2" />
          </div>
          <div className="p-4 bg-secondary/10 rounded-lg">
            <h3 className="font-semibold text-secondary">Iron Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current level: 95 μg/dL
              <br />
              Target range: 60-170 μg/dL
            </p>
            <Progress value={85} className="mt-2" />
          </div>
        </div>

        <div className="h-[300px] mt-6">
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
      </div>
    </Card>
  );
};