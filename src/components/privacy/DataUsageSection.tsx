
export const DataUsageSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">3. Data Usage</h2>
      
      <h3 className="text-xl font-medium mb-2">Recommendations</h3>
      <p className="mb-4">Your health data is processed to generate personalized supplement recommendations.</p>

      <h3 className="text-xl font-medium mb-2">AI Processing</h3>
      <p className="mb-4">We may use OpenAI services to process health information and other data to improve or generate personalized recommendations.</p>

      <h3 className="text-xl font-medium mb-2">Payment Processing</h3>
      <p className="mb-4">We use Stripe to handle all payment transactions. Your payment information is transmitted securely to Stripe and is not stored on our servers.</p>

      <h3 className="text-xl font-medium mb-2">Analytics and Service Improvement</h3>
      <p className="mb-4">We use usage data (e.g., page visits, device data) to analyze user behavior, improve the user experience, and develop new features.</p>
    </section>
  );
};
