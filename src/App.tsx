import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Assuming a generic Homepage for now, or it could be the LoginPage if no public homepage.
// For this example, let's assume a placeholder Index component or a Dashboard page
// that users are redirected to after login.
// If there's no general public page, LoginPage could be the index route.

// Import newly created pages
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PasswordRecoveryRequestPage from "./pages/PasswordRecoveryRequestPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import NotFound from "./pages/NotFound"; // Always Must Include

// Placeholder for a protected homepage/dashboard
const ProtectedHomepage = () => {
  console.log('ProtectedHomepage loaded - User is logged in');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard!</h1>
      <p className="mt-4">You have successfully logged in.</p>
      <Link to="/login">
         <Button variant="link" className="mt-8">Logout (Simulated)</Button>
      </Link>
    </div>
  );
};


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<PasswordRecoveryRequestPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />

          {/* Application Pages */}
          {/* Set a protected page as the index route, users will be redirected here after login */}
          {/* Or, if /login is the first page users see, then that would be the index.
              For now, let's assume login redirects to a '/' which is a protected/dashboard type page.
              If there is no public homepage, then LoginPage would be the entry point.
              Let's make LoginPage the default entry for non-logged-in users and redirect to '/' upon login.
          */}
          <Route path="/" element={<ProtectedHomepage />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;