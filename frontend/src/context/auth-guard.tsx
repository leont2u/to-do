"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import ProtectedRoute from "./protected-route";

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
