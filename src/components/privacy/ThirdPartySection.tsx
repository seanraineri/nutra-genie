export const ThirdPartySection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
      <p className="mb-4">To provide and enhance our Service, we rely on trusted third-party providers:</p>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medium mb-2">Supabase</h3>
          <p>Database and authentication platform for storing and managing user data securely.</p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Stripe</h3>
          <p>Payment processing service for handling user payments. Stripe's privacy policy can be found at <a href="https://stripe.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.</p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">OpenAI</h3>
          <p>AI-based service for generating or refining health recommendations. Limited data is shared for the purpose of creating personalized plans.</p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">AWS</h3>
          <p>We may use Amazon Web Services for processing lab results or additional storage. AWS maintains high security and compliance standards.</p>
        </div>
      </div>
    </section>
  );
};