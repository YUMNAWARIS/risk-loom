"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import AuthCard from "@/components/AuthCard";
import api from "@/lib/api";
import { setToken } from "@/lib/auth";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
});

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
    try {
      // FastAPI uses OAuth2PasswordRequestForm -> expects form data fields: username, password
      const form = new URLSearchParams();
      form.set("username", values.email);
      form.set("password", values.password);
      const { data } = await api.post("/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setToken(data.access_token);
      setSnackSeverity("success");
      setSnackMsg("Logged in successfully");
      setSnackOpen(true);
      router.replace("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.detail || err?.response?.data?.message || "Login failed";
      setSnackSeverity("error");
      setSnackMsg(message);
      setSnackOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Login to access your dashboard">
      <Formik<LoginFormValues>
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form noValidate>
            <Stack spacing={2}>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Login"}
              </Button>
              <Alert severity="info" variant="outlined">
                Don&apos;t have an account? <Link href="/auth/register">Register</Link>
              </Alert>
            </Stack>
          </Form>
        )}
      </Formik>

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </AuthCard>
  );
}


