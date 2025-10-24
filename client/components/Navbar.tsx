"use client";

import Link from "next/link";
import { AppBar, Toolbar, Stack, Typography, Button } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          RiskLoom
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={Link} href="/">Home</Button>
          <Button color="inherit" component={Link} href="/auth/login">Login</Button>
          <Button variant="contained" color="primary" component={Link} href="/auth/register">
            Register
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}


