import { apiUrl, jsonHeaders, parseJsonResponse } from "./client.js";
import type { AuthResponse } from "./types.js";

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(apiUrl("/auth/login"), {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  return parseJsonResponse<AuthResponse>(response);
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(apiUrl("/auth/register"), {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  return parseJsonResponse<AuthResponse>(response);
}

export async function fetchCurrentUser(): Promise<AuthResponse> {
  const response = await fetch(apiUrl("/user/users/me"), {
    credentials: "include",
  });

  return parseJsonResponse<AuthResponse>(response);
}

export async function logoutUser(): Promise<void> {
  await fetch(apiUrl("/auth/logout"), {
    method: "POST",
    credentials: "include",
  });
}
