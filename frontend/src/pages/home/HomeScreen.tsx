"use client";

import { Box, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import {
  CheckCircleOutlined,
  SecurityOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { useAuth } from "@/components/auth/auth-context";

export default function DashboardContent() {
  const { user, token } = useAuth();

  const features = [
    {
      icon: (
        <CheckCircleOutlined sx={{ fontSize: 40, color: "success.main" }} />
      ),
      title: "Authentication Complete",
      description: "You have successfully logged in to your account.",
    },
    {
      icon: <SecurityOutlined sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Secure Access",
      description: "Your session is protected with JWT token authentication.",
    },
    {
      icon: <PersonOutlined sx={{ fontSize: 40, color: "secondary.main" }} />,
      title: "User Profile",
      description: "Access your personal information and account settings.",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
          Welcome back, {user?.name || "User"}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You are now logged in to your protected dashboard.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 1, fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, bgcolor: "grey.50" }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Account Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user?.name || "Not provided"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user?.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              User ID
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, fontFamily: "monospace" }}
            >
              {user?.id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Session Status
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, color: "success.main" }}
            >
              {token ? "Active" : "Inactive"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
