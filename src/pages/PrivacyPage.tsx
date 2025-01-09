import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
  const navigate = useNavigate();

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
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2>Introduction</h2>
            <p>
              SupplementScribe.ai ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Name and contact information (email address)</li>
              <li>Demographic information (age, gender)</li>
              <li>Health-related information (height, weight, medical conditions)</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <h3>Health Data</h3>
            <ul>
              <li>Medical conditions and history</li>
              <li>Current medications and supplements</li>
              <li>Allergies and sensitivities</li>
              <li>Laboratory test results</li>
              <li>Genetic testing information</li>
            </ul>

            <h3>Usage Data</h3>
            <ul>
              <li>Interaction with our services</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>Provide personalized supplement recommendations</li>
              <li>Process and analyze health data</li>
              <li>Improve our services and user experience</li>
              <li>Communicate with you about our services</li>
              <li>Process payments and maintain your subscription</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>Data Storage and Security</h2>
            <p>
              We use industry-standard security measures to protect your data:
            </p>
            <ul>
              <li>Secure data storage through Supabase</li>
              <li>Encryption of sensitive information</li>
              <li>Regular security audits and updates</li>
              <li>Strict access controls and authentication</li>
            </ul>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>We work with trusted third-party services:</p>
            <ul>
              <li>Supabase - Database and authentication</li>
              <li>Stripe - Payment processing</li>
              <li>OpenAI - AI-powered recommendations</li>
              <li>AWS - Document processing and storage</li>
            </ul>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data at any time.
            </p>
          </section>

          <section>
            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for users under 18 years of age. We do not knowingly collect information from children under 18.
            </p>
          </section>

          <section>
            <h2>Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of any material changes through our service or via email.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p>Email: privacy@supplementscribe.ai</p>
          </section>

          <section>
            <h2>Compliance</h2>
            <p>
              We comply with applicable data protection laws, including:
            </p>
            <ul>
              <li>HIPAA (Health Insurance Portability and Accountability Act)</li>
              <li>GDPR (General Data Protection Regulation)</li>
              <li>CCPA (California Consumer Privacy Act)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;