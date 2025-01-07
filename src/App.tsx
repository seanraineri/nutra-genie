import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import FAQ from "@/pages/FAQ";
import DashboardPage from "@/pages/DashboardPage";
import InputPage from "@/pages/InputPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/get-started" element={<InputPage />} />
      </Routes>
    </Router>
  );
}

export default App;