
import { Dashboard } from "@/components/Dashboard";
import { Routes, Route } from "react-router-dom";
import JournalPage from "./JournalPage";

const DashboardPage = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="journal" element={<JournalPage />} />
    </Routes>
  );
};

export default DashboardPage;
