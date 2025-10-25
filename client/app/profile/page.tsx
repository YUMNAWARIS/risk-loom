"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4">Profile</Typography>
      </Container>
    </ProtectedRoute>
  );
}


