
export const DataCollectionSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">1. Data Collection</h2>
      <p className="mb-4">We collect the following types of personal and health-related information to provide and improve our Service:</p>
      
      <h3 className="text-xl font-medium mb-2">Personal Information</h3>
      <p className="mb-4">
        Name, Email address, Age, Gender
      </p>

      <h3 className="text-xl font-medium mb-2">Health Data</h3>
      <p className="mb-4">
        Medical conditions, Current medications, Allergies, Health goals
      </p>

      <h3 className="text-xl font-medium mb-2">Lab Test Results</h3>
      <p className="mb-4">
        Blood test data, Other relevant health metrics as provided by the user
      </p>

      <h3 className="text-xl font-medium mb-2">Payment Information</h3>
      <p className="mb-4">
        Payment details (handled by Stripe), Billing address (if applicable)
      </p>

      <h3 className="text-xl font-medium mb-2">Usage Data and Analytics</h3>
      <p className="mb-4">
        Website usage patterns (pages visited, time spent on pages), Device information (IP address, browser type), Cookies and similar tracking technologies for analytics
      </p>
    </section>
  );
};
