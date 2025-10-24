"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        ) : null}
        <Card elevation={3}>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}


