"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function WatchlistPage() {
  return (
    <ProtectedRoute>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4">Watchlist</Typography>
      </Container>
    </ProtectedRoute>
  );
}


