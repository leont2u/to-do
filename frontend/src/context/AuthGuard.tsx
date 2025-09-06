import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "../ProtectedRoute";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  fallback?: ReactNode;
}

export default function AuthGuard({
  children,
  requireAuth = true,
  fallback,
}: AuthGuardProps) {
  return (
    <AuthProvider>
      {requireAuth ? (
        <ProtectedRoute fallback={fallback}>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </AuthProvider>
  );
}
