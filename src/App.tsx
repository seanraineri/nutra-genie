import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthWrapper } from "./components/AuthWrapper";
import Index from "./pages/Index";
import InputPage from "./pages/InputPage";
import DashboardPage from "./pages/DashboardPage";
import FAQPage from "./pages/FAQPage";
import PaymentPage from "./pages/PaymentPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider delayDuration={0}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/input" element={<InputPage />} />
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
              path="/payment"
              element={
                <AuthWrapper>
                  <PaymentPage />
                </AuthWrapper>
              }
            />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;