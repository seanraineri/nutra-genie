import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthWrapper } from "@/components/AuthWrapper";
import { DashboardPage } from "@/pages/DashboardPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { Index } from "@/pages/Index"; // Assuming you have an Index page

export default function App() {
  return (
    <Router>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/supplements" element={<SupplementsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
        </Routes>
      </AuthWrapper>
      <Toaster />
    </Router>
  );
}
