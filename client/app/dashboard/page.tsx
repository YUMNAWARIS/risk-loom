"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { removeToken } from "@/lib/auth";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");



  const handleLogout = () => {
    removeToken();
    router.replace("/auth/login");
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4">Dashboard</Typography>
        </Stack>
      </Container>

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </ProtectedRoute>
  );
}


