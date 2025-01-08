import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface SupplementCardProps {
  supplement_name: string;
  dosage: string;
  reason: string;
  company_name?: string;
  product_url?: string;
  image_url?: string;
}

export const SupplementCard = ({
  supplement_name,
  dosage,
  reason,
  company_name,
  product_url,
  image_url,
}: SupplementCardProps) => {
  return (
    <Card className="overflow-hidden">
      {image_url && (
        <div className="relative h-48 w-full">
          <img
            src={image_url}
            alt={supplement_name}
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-primary">{supplement_name}</h3>
        {company_name && (
          <p className="text-sm text-muted-foreground mb-2">by {company_name}</p>
        )}
        <div className="space-y-2">
          <p className="text-sm font-medium">Dosage: {dosage}</p>
          <p className="text-sm">Purpose: {reason}</p>
          {product_url && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => window.open(product_url, '_blank')}
            >
              View Product <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};