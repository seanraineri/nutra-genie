
export const SecuritySection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">2. Data Storage & Security</h2>
      
      <h3 className="text-xl font-medium mb-2">Data Storage</h3>
      <p className="mb-4">
        All user data is stored securely in our database hosted on Supabase.
        We use secure authentication and authorization measures to ensure that only authorized personnel can access your data.
      </p>

      <h3 className="text-xl font-medium mb-2">Encryption Methods</h3>
      <p className="mb-4">
        Data in transit is protected using Transport Layer Security (TLS/SSL) encryption.
        Where applicable, we use encryption at rest for sensitive data stored in our databases.
      </p>

      <h3 className="text-xl font-medium mb-2">Data Retention</h3>
      <p className="mb-4">
        We retain your personal and health data for as long as your account is active or as needed to provide services to you.
        We may also retain certain information for legitimate business or legal purposes (such as records retention), or as required by law.
      </p>

      <h3 className="text-xl font-medium mb-2">Security Measures</h3>
      <p className="mb-4">
        We implement administrative, technical, and physical safeguards to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
        Regular security audits and vulnerability assessments help us maintain a secure environment.
      </p>
    </section>
  );
};
