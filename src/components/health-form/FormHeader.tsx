interface FormHeaderProps {
  isAuthenticated: boolean;
}

export const FormHeader = ({ isAuthenticated }: FormHeaderProps) => {
  return (
    <div className="space-y-2 mb-6">
      <h2 className="text-2xl font-bold text-secondary">
        {isAuthenticated ? "Complete Your Health Profile" : "Create Your Account"}
      </h2>
      <p className="text-muted-foreground">
        {isAuthenticated 
          ? "Please provide your health information to get personalized recommendations"
          : "Enter your information to get started"
        }
      </p>
    </div>
  );
};