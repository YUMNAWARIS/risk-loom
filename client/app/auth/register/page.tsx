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

const RegisterSchema = Yup.object({
  name: Yup.string().min(1, "Required").max(100, "Too long").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
});

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");

  const handleSubmit = async (values: RegisterFormValues, { setSubmitting }: any) => {
    try {
      const { data } = await api.post("/register", values);
      // Backend returns { message, user }, no token. We should login after register.
      // Attempt automatic login using same credentials to fetch token.
      const form = new URLSearchParams();
      form.set("username", values.email);
      form.set("password", values.password);
      const loginRes = await api.post("/login", form, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      setToken(loginRes.data.access_token);
      setSnackSeverity("success");
      setSnackMsg(data?.message || "Registered successfully");
      setSnackOpen(true);
      router.replace("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.detail || err?.response?.data?.message || "Registration failed";
      setSnackSeverity("error");
      setSnackMsg(message);
      setSnackOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Create an account" subtitle="Register to start using the app">
      <Formik<RegisterFormValues>
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form noValidate>
            <Stack spacing={2}>
              <Field
                as={TextField}
                name="name"
                type="text"
                label="Name"
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
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
                {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Register"}
              </Button>
              <Alert severity="info" variant="outlined">
                Already have an account? <Link href="/auth/login">Login</Link>
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


