"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppBar, Toolbar, Stack, Typography, Button, IconButton, Drawer, Box, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { isLoggedIn, removeToken } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    const onAuth = () => setLoggedIn(isLoggedIn());
    if (typeof window !== "undefined") {
      window.addEventListener("rl-auth-changed", onAuth);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("rl-auth-changed", onAuth);
      }
    };
  }, []);

  // Update when navigating between pages (e.g., redirect after login)
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [pathname]);

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
    router.replace("/auth/login");
  };

  const authedLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tickers", href: "/tickers" },
    { label: "Watchlist", href: "/watchlist" },
    { label: "Profile", href: "/profile" },
  ];

  const guestLinks = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/auth/login" },
    { label: "Register", href: "/auth/register", variant: "contained" as const },
  ];

  const toggleMobile = (open: boolean) => () => setMobileOpen(open);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          RiskLoom
        </Typography>
        {/* Desktop navigation */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {loggedIn ? (
            <Stack direction="row" spacing={1}>
              {authedLinks.map((item) => (
                <Button key={item.href} color="inherit" component={Link} href={item.href}>{item.label}</Button>
              ))}
              <Button variant="outlined" color="inherit" onClick={handleLogout}>Logout</Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              {guestLinks.map((item) => (
                <Button
                  key={item.href}
                  color="inherit"
                  component={Link}
                  href={item.href}
                  variant={(item as any).variant}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}
        </Box>

        {/* Mobile hamburger */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton color="inherit" aria-label="open navigation" onClick={toggleMobile(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobile(false)}>
        <Box sx={{ width: 260 }} role="presentation" onClick={toggleMobile(false)}>
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>RiskLoom</Typography>
          </Box>
          <Divider />
          <List>
            {(loggedIn ? authedLinks : guestLinks).map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton component={Link} href={item.href}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {loggedIn && (
            <>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}


