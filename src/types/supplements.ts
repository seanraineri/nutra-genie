export interface Supplement {
  id: string;
  supplement_name: string;
  dosage: string;
  reason: string;
  estimated_cost?: number;
  company_name?: string;
  product_url?: string;
  image_url?: string;
}