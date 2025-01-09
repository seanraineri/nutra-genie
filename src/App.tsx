import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import DashboardPage from "@/pages/DashboardPage";
import InputPage from "@/pages/InputPage";
import PrivacyPage from "@/pages/PrivacyPage";
import AboutPage from "@/pages/AboutPage";
import FAQPage from "@/pages/FAQPage";
import PaymentPage from "@/pages/PaymentPage";
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
        <Route
          path="/dashboard"
          element={
            <AuthWrapper>
              <DashboardPage />
            </AuthWrapper>
          }
        />
        <Route
          path="/input"
          element={
            <AuthWrapper>
              <InputPage />
            </AuthWrapper>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthWrapper>
              <PaymentPage />
            </AuthWrapper>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;