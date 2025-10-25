"use client";

// Token key used in localStorage
const TOKEN_KEY = "rl_jwt_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
    // notify listeners that auth state changed
    try { window.dispatchEvent(new Event("rl-auth-changed")); } catch {}
  } catch {
    // ignore write errors
  }
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    // notify listeners that auth state changed
    try { window.dispatchEvent(new Event("rl-auth-changed")); } catch {}
  } catch {
    // ignore write errors
  }
}

export function isLoggedIn(): boolean {
  const token = getToken();
  return Boolean(token && token.length > 0);
}


