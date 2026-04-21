import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppWidget from "./components/WhatsAppWidget";
import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";

function AppLayout() {
  const location = useLocation();
  const isWorkspaceView =
    location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-primary-950 text-slate-900 transition-colors duration-500 dark:text-white">
      {!isWorkspaceView && <Header />}
      <main className={isWorkspaceView ? "min-h-screen" : "pt-28 md:pt-36 lg:pt-40"}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute roles={["farmer"]} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isWorkspaceView && <Footer />}
      <WhatsAppWidget />
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}
