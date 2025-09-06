import type React from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  AccountCircle,
  ExitToApp,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/useAuth";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <DashboardIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h4" component="h1">
                Dashboard
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ExitToApp />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Paper>

        {/* User Info */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <AccountCircle color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h5">User Information</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Welcome to your protected dashboard!
                </Typography>
                {user && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>User ID:</strong> {user.id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Protected Content
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  This content is only visible to authenticated users. Your
                  authentication token is being used to access this protected
                  route.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage;
