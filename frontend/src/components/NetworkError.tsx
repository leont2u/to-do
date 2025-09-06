import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { WifiOffOutlined, RefreshOutlined } from "@mui/icons-material";

interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
}

export default function NetworkError({ onRetry, message }: NetworkErrorProps) {
  const handleRefresh = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        p: 3,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ textAlign: "center", p: 4 }}>
          <WifiOffOutlined
            sx={{ fontSize: 64, color: "warning.main", mb: 2 }}
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Connection Problem
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {message ||
              "Unable to connect to the server. Please check your internet connection and try again."}
          </Typography>

          <Button
            variant="contained"
            startIcon={<RefreshOutlined />}
            onClick={handleRefresh}
            fullWidth
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
