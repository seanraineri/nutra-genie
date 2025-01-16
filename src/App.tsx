import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import DashboardPage from "@/pages/DashboardPage";
import InputPage from "@/pages/InputPage";
import PrivacyPage from "@/pages/PrivacyPage";
import AboutPage from "@/pages/AboutPage";
import FAQPage from "@/pages/FAQPage";
import PaymentPage from "@/pages/PaymentPage";
import WorkWithUsPage from "@/pages/WorkWithUsPage";
import FamilyPlanPage from "@/pages/FamilyPlanPage";
import ContentPage from "@/pages/ContentPage";
import { Toaster } from "@/components/ui/toaster";
import { AuthWrapper } from "@/components/AuthWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/work-with-us" element={<WorkWithUsPage />} />
        <Route path="/family-plan" element={<FamilyPlanPage />} />
        <Route path="/content" element={<ContentPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;