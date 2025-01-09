import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
  const navigate = useNavigate();
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
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
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <p className="text-sm text-yellow-700">
              Note: This Privacy Policy is provided for informational purposes only. While it covers key privacy considerations, 
              it is not legal advice. Please consult with a qualified attorney to ensure that your privacy practices comply 
              with all applicable laws and regulations in your jurisdiction.
            </p>
          </div>

          <p>
            Thank you for using our web application ("Service"). Your privacy is extremely important to us. 
            This Privacy Policy describes how we collect, use, store, and disclose your information when you 
            use the Service. By accessing or using the Service, you agree to the terms of this Privacy Policy.
          </p>

          <h2>1. Data Collection</h2>
          <p>We collect the following types of personal and health-related information to provide and improve our Service:</p>

          <h3>Personal Information</h3>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Age</li>
            <li>Gender</li>
          </ul>

          <h3>Health Data</h3>
          <ul>
            <li>Medical conditions</li>
            <li>Current medications</li>
            <li>Allergies</li>
            <li>Health goals</li>
          </ul>

          <h3>Lab Test Results</h3>
          <ul>
            <li>Blood test data</li>
            <li>Other relevant health metrics as provided by the user</li>
          </ul>

          <h3>Usage Data and Analytics</h3>
          <ul>
            <li>Website usage patterns (pages visited, time spent on pages)</li>
            <li>Device information (IP address, browser type)</li>
            <li>Cookies and similar tracking technologies for analytics</li>
          </ul>

          <h2>2. Data Storage & Security</h2>
          <h3>Data Storage</h3>
          <ul>
            <li>All user data is stored securely in our database hosted on Supabase.</li>
            <li>We use secure authentication and authorization measures to ensure that only authorized personnel can access your data.</li>
          </ul>

          <h3>Encryption Methods</h3>
          <ul>
            <li>Data in transit is protected using Transport Layer Security (TLS/SSL) encryption.</li>
            <li>Where applicable, we use encryption at rest for sensitive data stored in our databases.</li>
          </ul>

          <h2>3. Data Usage</h2>
          <p>We use the collected data for the following purposes:</p>
          <ul>
            <li>Generating personalized supplement recommendations</li>
            <li>Processing health information through AI services</li>
            <li>Payment processing through Stripe</li>
            <li>Analytics and service improvement</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>We work with trusted third-party providers:</p>
          <ul>
            <li>Supabase - Database and authentication</li>
            <li>Stripe - Payment processing</li>
            <li>OpenAI - AI-powered recommendations</li>
            <li>AWS - Lab results processing</li>
          </ul>

          <h2>5. User Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request deletion of your account and data</li>
            <li>Update your information</li>
            <li>Export your data</li>
          </ul>

          <h2>6. Compliance</h2>
          <p>We comply with applicable data protection laws, including:</p>
          <ul>
            <li>HIPAA (Health Insurance Portability and Accountability Act)</li>
            <li>GDPR (General Data Protection Regulation)</li>
            <li>CCPA (California Consumer Privacy Act)</li>
          </ul>

          <h2>7. Contact Information</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p>Email: privacy@supplementscribe.ai</p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. When we update the policy, we will revise the "Last Updated" 
            date at the top of this page. We encourage you to review this policy periodically to stay informed 
            about how we protect your data.
          </p>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              By using our Service, you acknowledge that you have read and understood this Privacy Policy. 
              If you do not agree with any part of this Policy, you should discontinue the use of our Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;