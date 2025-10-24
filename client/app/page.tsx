"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Grid
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TimelineIcon from "@mui/icons-material/Timeline";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Home() {
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Box id="home" sx={{
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(1200px 600px at 80% -20%, rgba(34,211,238,0.15), transparent 60%), radial-gradient(1000px 500px at -10% 10%, rgba(167,139,250,0.12), transparent 60%)",
      }}>
        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                Forecast the Market. Manage Your Risk.
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
                AI-driven insights for smarter investment decisions.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button size="large" variant="contained" color="primary" component={Link} href="/auth/register">
                  Get Started
                </Button>
                <Button size="large" variant="outlined" color="secondary" component={Link} href="#features">
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{
                height: 320,
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(148,163,184,0.2)",
              }}>
                <Image
                  src="/analytic-home.png"
                  alt="Analytics preview chart"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
                <Box sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.25) 100%)",
                }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            Features
          </Typography>
          <Grid container spacing={3}>
            {[{
              title: "Live Stock Data",
              description: "Real-time market information for all Pakistani tickers.",
              icon: <TrendingUpIcon color="primary" sx={{ fontSize: 36 }} />,
            }, {
              title: "AI Price Prediction",
              description: "Machine-learning insights on price trends.",
              icon: <TimelineIcon color="primary" sx={{ fontSize: 36 }} />,
            }, {
              title: "Personal Watchlist",
              description: "Save and monitor your favorite stocks.",
              icon: <StarBorderIcon color="primary" sx={{ fontSize: 36 }} />,
            }].map((feature) => (
              <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
                <Card elevation={0} sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box id="how" sx={{ py: { xs: 8, md: 12 }, backgroundColor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6 }}>
            How It Works
          </Typography>
          <Grid container spacing={3} alignItems="center">
            {["Create Account", "Search Stocks", "View Analytics"].map((step, index) => (
              <Grid key={step} size={{ xs: 12, md: 4 }}>
                <Card elevation={0} sx={{ textAlign: "center", p: 1 }}>
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main", mb: 1 }}>
                      {index + 1}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {step}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box id="cta" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Card elevation={0} sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            background:
              "linear-gradient(90deg, rgba(34,211,238,0.08), rgba(167,139,250,0.08))",
            border: "1px solid rgba(148,163,184,0.15)",
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Join RiskLoom today and predict tomorrow’s market.
              </Typography>
              <Button size="large" variant="contained" color="primary" component={Link} href="/auth/register">
                Sign Up Now
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Divider sx={{ opacity: 0.1 }} />

      {/* Footer */}
      <Box component="footer" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              © {currentYear} RiskLoom
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" component={Link} href="#about">About</Button>
              <Button color="inherit" component={Link} href="#privacy">Privacy</Button>
              <Button color="inherit" component={Link} href="#contact">Contact</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
