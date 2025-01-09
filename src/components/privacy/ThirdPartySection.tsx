export const ThirdPartySection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
      <p className="mb-4">To provide and enhance our Service, we rely on trusted third-party providers:</p>
      
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Supabase</strong> - Database and authentication platform for storing and managing user data securely.</li>
        <li><strong>Stripe</strong> - Payment processing service for handling user payments. Stripe's privacy policy can be found at stripe.com/privacy.</li>
        <li><strong>OpenAI</strong> - AI-based service for generating or refining health recommendations. Limited data is shared for the purpose of creating personalized plans.</li>
        <li><strong>AWS</strong> - We may use Amazon Web Services for processing lab results or additional storage. AWS maintains high security and compliance standards.</li>
      </ul>
    </section>
  );
};