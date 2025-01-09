export const DataCollectionSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">1. Data Collection</h2>
      <p className="mb-4">We collect the following types of personal and health-related information to provide and improve our Service:</p>
      
      <h3 className="text-xl font-medium mb-2">Personal Information</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Name</li>
        <li>Email address</li>
        <li>Age</li>
        <li>Gender</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Health Data</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Medical conditions</li>
        <li>Current medications</li>
        <li>Allergies</li>
        <li>Health goals</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Lab Test Results</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Blood test data</li>
        <li>Other relevant health metrics as provided by the user</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Payment Information</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Payment details (handled by Stripe)</li>
        <li>Billing address (if applicable)</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Usage Data and Analytics</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Website usage patterns (pages visited, time spent on pages)</li>
        <li>Device information (IP address, browser type)</li>
        <li>Cookies and similar tracking technologies for analytics</li>
      </ul>
    </section>
  );
};