export const ThirdPartySection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
      <p className="mb-4">To provide and enhance our Service, we work with trusted third-party providers:</p>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medium mb-2">Data Storage & Authentication</h3>
          <p>We use secure, industry-standard platforms for storing and managing user data with enterprise-grade security measures.</p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Payment Processing</h3>
          <p>For payment processing, we partner with Stripe, a leading payment service provider. Stripe's privacy policy can be found at <a href="https://stripe.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.</p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Health Recommendations</h3>
          <p>Our proprietary health recommendation system uses advanced technology to analyze your health data and create personalized recommendations. We maintain strict data privacy and security standards throughout this process.</p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Cloud Infrastructure</h3>
          <p>We utilize enterprise-grade cloud infrastructure for secure data processing and storage, ensuring high availability and compliance with industry standards.</p>
        </div>
      </div>
    </section>
  );
};