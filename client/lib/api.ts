"use client";

import axios from "axios";
import { getToken } from "@/lib/auth";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


