import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface LabTestOffering {
  id: string;
  partner_name: string;
  test_name: string;
  description: string;
  price: number;
  url: string;
}

const PurchaseTestsPage = () => {
  const navigate = useNavigate();
  const [offerings, setOfferings] = useState<LabTestOffering[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const { data, error } = await supabase
          .from('lab_test_offerings')
          .select('*')
          .order('partner_name');

        if (error) throw error;
        setOfferings(data || []);
      } catch (error) {
        console.error('Error fetching lab test offerings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferings();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Lab Tests from Our Partners</h1>
            <p className="text-muted-foreground mt-2">
              Choose from our selection of comprehensive lab tests from trusted partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering) => (
              <Card key={offering.id} className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{offering.test_name}</h3>
                  <p className="text-sm text-muted-foreground">{offering.partner_name}</p>
                </div>
                
                <p className="text-sm">{offering.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    ${offering.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => window.open(offering.url, '_blank')}
                    className="flex items-center gap-2"
                  >
                    Order Now
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTestsPage;