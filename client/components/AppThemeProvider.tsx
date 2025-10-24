"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type Props = {
  children: React.ReactNode;
};

export default function AppThemeProvider({ children }: Props) {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#22D3EE" }, // cyan-400
      secondary: { main: "#A78BFA" }, // violet-400
      background: {
        default: "#0B1220", // deep navy
        paper: "#111827", // slate-900
      },
      text: {
        primary: "#E5E7EB", // gray-200
        secondary: "#94A3B8", // slate-400
      },
    },
    typography: {
      fontFamily:
        'var(--font-geist-sans), Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      body1: { lineHeight: 1.7 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage:
              "linear-gradient(90deg, rgba(17,24,39,0.9), rgba(11,18,32,0.9))",
            backdropFilter: "saturate(180%) blur(8px)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#0F172A",
            border: "1px solid rgba(148,163,184,0.15)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}


