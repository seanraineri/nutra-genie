import { Progress } from "@/components/ui/progress";

export const VitaminMetricsSection = () => {
  return (
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
  );
};