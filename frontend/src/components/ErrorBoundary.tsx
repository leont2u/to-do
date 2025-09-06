import type React from "react";
import { Component, type ReactNode } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { ErrorOutlined, RefreshOutlined } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            p: 3,
          }}
        >
          <Card sx={{ maxWidth: 500, width: "100%" }}>
            <CardContent sx={{ textAlign: "center", p: 4 }}>
              <ErrorOutlined
                sx={{ fontSize: 64, color: "error.main", mb: 2 }}
              />
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We encountered an unexpected error. Please try refreshing the
                page or contact support if the problem persists.
              </Typography>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{ fontSize: "0.75rem", overflow: "auto" }}
                  >
                    {this.state.error.message}
                  </Typography>
                </Alert>
              )}

              <Button
                variant="contained"
                startIcon={<RefreshOutlined />}
                onClick={this.handleReset}
                sx={{ mr: 2 }}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}
