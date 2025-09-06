import type React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import MuiThemeProvider from "./theme";
import { AuthProvider } from "./context/AuthProvider";
import LoginForm from "./pages/auth/LoginScreen";
import RegisterForm from "./pages/auth/CreateAccountScreen";
import { CssBaseline } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "./pages/home/HomeScreen";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MuiThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
