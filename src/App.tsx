import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthWrapper } from "@/components/AuthWrapper";
import DashboardPage from "@/pages/DashboardPage";
import { ProfilePage } from "@/pages/ProfilePage";
import Index from "@/pages/Index";

export default function App() {
  return (
    <Router>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AuthWrapper>
      <Toaster />
    </Router>
  );
}