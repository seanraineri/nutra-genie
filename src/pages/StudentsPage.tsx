import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function StudentsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground text-lg">
            Special offers and opportunities for students
          </p>
        </div>

        <Tabs defaultValue="discount" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="discount">Student Discount</TabsTrigger>
            <TabsTrigger value="ambassador">Campus Ambassador</TabsTrigger>
          </TabsList>

          <TabsContent value="discount">
            <Card>
              <CardHeader>
                <CardTitle>Student Discount</CardTitle>
                <CardDescription>
                  Get access to SupplementScribe at a special student rate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#3498DB]">$15/month</h3>
                  <p className="text-muted-foreground">
                    Available for all students with a valid .edu email address
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <h4 className="font-semibold">How it works:</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Sign up with your .edu email address</li>
                      <li>Get instant access to all premium features</li>
                      <li>Save $5 every month compared to regular pricing</li>
                      <li>No additional verification required</li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => navigate("/input")}
                    className="w-full bg-[#3498DB] hover:bg-[#3498DB]/90"
                  >
                    Get Started with Student Discount
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ambassador">
            <Card>
              <CardHeader>
                <CardTitle>Campus Ambassador Program</CardTitle>
                <CardDescription>
                  Represent SupplementScribe at your university and earn rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <h4 className="font-semibold">Program Benefits:</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Free premium subscription while you're an ambassador</li>
                      <li>Earn commissions for every referral</li>
                      <li>Exclusive ambassador swag and merchandise</li>
                      <li>Network with other health-conscious students</li>
                      <li>Add valuable experience to your resume</li>
                    </ul>
                  </div>
                  <div className="grid gap-2">
                    <h4 className="font-semibold">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Currently enrolled student with valid .edu email</li>
                      <li>Passionate about health and wellness</li>
                      <li>Strong social media presence</li>
                      <li>Good academic standing</li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => navigate("/work-with-us")}
                    className="w-full"
                  >
                    Apply to Become an Ambassador
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}