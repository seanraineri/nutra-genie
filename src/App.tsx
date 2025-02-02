import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import InputPage from "@/pages/InputPage";
import PaymentPage from "@/pages/PaymentPage";
import DashboardPage from "@/pages/DashboardPage";
import FamilyPlanPage from "@/pages/FamilyPlanPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ContentPage from "@/pages/ContentPage";
import AboutPage from "@/pages/AboutPage";
import FAQPage from "@/pages/FAQPage";
import StudentsPage from "@/pages/StudentsPage";
import WorkWithUsPage from "@/pages/WorkWithUsPage";
import RewardsPage from "@/pages/RewardsPage";
import PurchaseTestsPage from "@/pages/PurchaseTestsPage";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/family-plan" element={<FamilyPlanPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/work-with-us" element={<WorkWithUsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/purchase-tests" element={<PurchaseTestsPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;