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

          <h3>Payment Information</h3>
          <ul>
            <li>Payment details (handled by Stripe)</li>
            <li>Billing address (if applicable)</li>
          </ul>

          <h3>Usage Data and Analytics</h3>
          <ul>
            <li>Website usage patterns (pages visited, time spent on pages)</li>
            <li>Device information (IP address, browser type)</li>
            <li>Cookies and similar tracking technologies for analytics</li>
          </ul>

          <p>
            We only collect personal and health data that is necessary to provide you with relevant supplement 
            and health recommendations and to process any payments for services or premium features you may choose to use.
          </p>

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

          <h3>Data Retention</h3>
          <ul>
            <li>We retain your personal and health data for as long as your account is active or as needed to provide services to you.</li>
            <li>We may also retain certain information for legitimate business or legal purposes (such as records retention), or as required by law.</li>
          </ul>

          <h3>Security Measures</h3>
          <ul>
            <li>We implement administrative, technical, and physical safeguards to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.</li>
            <li>Regular security audits and vulnerability assessments help us maintain a secure environment.</li>
          </ul>

          <h2>3. Data Usage</h2>
          <h3>Recommendations</h3>
          <ul>
            <li>Your health data is processed to generate personalized supplement recommendations.</li>
          </ul>

          <h3>AI Processing</h3>
          <ul>
            <li>We may use OpenAI services to process health information and other data to improve or generate personalized recommendations.</li>
          </ul>

          <h3>Payment Processing</h3>
          <ul>
            <li>We use Stripe to handle all payment transactions. Your payment information is transmitted securely to Stripe and is not stored on our servers.</li>
          </ul>

          <h3>Analytics and Service Improvement</h3>
          <ul>
            <li>We use usage data (e.g., page visits, device data) to analyze user behavior, improve the user experience, and develop new features.</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>To provide and enhance our Service, we rely on trusted third-party providers:</p>
          <ul>
            <li><strong>Supabase</strong> - Database and authentication platform for storing and managing user data securely.</li>
            <li><strong>Stripe</strong> - Payment processing service for handling user payments. Stripe's privacy policy can be found at stripe.com/privacy.</li>
            <li><strong>OpenAI</strong> - AI-based service for generating or refining health recommendations. Limited data is shared for the purpose of creating personalized plans.</li>
            <li><strong>AWS</strong> - We may use Amazon Web Services for processing lab results or additional storage. AWS maintains high security and compliance standards.</li>
          </ul>

          <h2>5. User Rights</h2>
          <p>We respect your rights regarding the personal data we hold about you:</p>
          <ul>
            <li><strong>Access Your Personal Data</strong> - Request a copy of your personal data and health information stored in our systems.</li>
            <li><strong>Delete Your Account and Data</strong> - Request deletion of your account and associated personal information at any time.</li>
            <li><strong>Update Your Information</strong> - Correct or update any personal information if it is inaccurate or incomplete.</li>
            <li><strong>Data Portability</strong> - Receive your personal data in a structured, commonly used, and machine-readable format where applicable.</li>
          </ul>

          <h2>6. Compliance</h2>
          <h3>HIPAA</h3>
          <p>We strive to meet or exceed Health Insurance Portability and Accountability Act (HIPAA) standards if and where applicable, particularly regarding the safeguarding of Protected Health Information (PHI).</p>

          <h3>GDPR</h3>
          <p>If you are located in the European Union (EU), we comply with the General Data Protection Regulation (GDPR) regarding your rights to access, rectify, erase, or restrict processing of your data.</p>

          <h3>CCPA</h3>
          <p>If you are a California resident, we comply with the California Consumer Privacy Act (CCPA). You have the right to know what personal information we collect and to request deletion of your data.</p>

          <h3>Medical Information Privacy Standards</h3>
          <p>We follow industry best practices and guidelines to ensure the privacy of medical information is protected.</p>

          <h2>7. Contact Information</h2>
          <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at:</p>
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