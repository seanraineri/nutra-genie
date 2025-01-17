import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthWrapper } from "@/components/AuthWrapper";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "./components/ui/loading-spinner";

// Lazy load pages
const Index = lazy(() => import("@/pages/Index"));
const InputPage = lazy(() => import("@/pages/InputPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const PaymentPage = lazy(() => import("@/pages/PaymentPage"));
const ContentPage = lazy(() => import("@/pages/ContentPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const WorkWithUsPage = lazy(() => import("@/pages/WorkWithUsPage"));
const RewardsPage = lazy(() => import("@/pages/RewardsPage"));
const StudentsPage = lazy(() => import("@/pages/StudentsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/input",
    element: <InputPage />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthWrapper>
        <DashboardPage />
      </AuthWrapper>
    ),
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/content",
    element: <ContentPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
  },
  {
    path: "/work-with-us",
    element: <WorkWithUsPage />,
  },
  {
    path: "/rewards",
    element: <RewardsPage />,
  },
  {
    path: "/students",
    element: <StudentsPage />,
  },
]);

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      }
    >
      <RouterProvider router={router} />
      <Toaster />
    </Suspense>
  );
}

export default App;