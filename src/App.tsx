import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { InputPage } from "@/pages/InputPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { FAQPage } from "@/pages/FAQPage";
import { LoginPage } from "@/pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;