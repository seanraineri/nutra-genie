import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PersonalInfoInputs } from "./health-form/PersonalInfoInputs";
import { HealthMetricsInputs } from "./health-form/HealthMetricsInputs";
import { TestInformationInputs } from "./health-form/TestInformationInputs";
import { HealthGoalsInput } from "./health-form/HealthGoalsInput";
import { ActivityLevel, Gender } from "@/types/health-form";
import { useToast } from "@/components/ui/use-toast";
import { submitHealthFormData } from "@/utils/healthFormSubmission";
import { healthFormSchema, HealthFormSchemaType } from "@/schemas/healthFormSchema";

export const HealthDataForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const form = useForm<HealthFormSchemaType>({
    resolver: zodResolver(healthFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      gender: "male",
      height: "",
      weight: "",
      activityLevel: "sedentary",
      medicalConditions: "",
      allergies: "",
      currentMedications: "",
      hasBloodwork: false,
      hasGeneticTesting: false,
      healthGoals: "",
    },
  });

  const onSubmit = async (data: HealthFormSchemaType) => {
    if (!acceptedTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitHealthFormData(data);
      
      toast({
        title: "Form Submitted",
        description: "Please complete the payment to create your account.",
      });

      navigate(`/payment?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      console.error('Error:', error);
      
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 animate-fade-in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">Create Your Account</h2>
            <p className="text-muted-foreground">
              Enter your information to get personalized health recommendations
            </p>
          </div>

          <PersonalInfoInputs form={form} />
          <HealthMetricsInputs form={form} />
          <TestInformationInputs form={form} />
          <HealthGoalsInput form={form} />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the{" "}
              <a href="/terms" className="text-primary hover:underline">
                terms and conditions
              </a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || !acceptedTerms}
          >
            {form.formState.isSubmitting ? "Processing..." : "Continue to Payment"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};