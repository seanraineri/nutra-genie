
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

export const VitaminMetricsSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-4'}`}>
      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-primary text-sm md:text-base">Vitamin D Status</h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Current level: 45 ng/mL
          <br />
          Target range: 30-50 ng/mL
        </p>
        <Progress value={75} className="mt-2" />
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-accent text-sm md:text-base">B12 Status</h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Current level: 550 pg/mL
          <br />
          Target range: 400-1000 pg/mL
        </p>
        <Progress value={65} className="mt-2" />
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-secondary text-sm md:text-base">Iron Status</h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Current level: 95 μg/dL
          <br />
          Target range: 60-170 μg/dL
        </p>
        <Progress value={85} className="mt-2" />
      </div>
    </div>
  );
};
