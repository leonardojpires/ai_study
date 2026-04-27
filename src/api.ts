import { StudyPlanRequest, StudyPlanResponse, Topic } from "./types";

type AuthResponse = {
  success: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const body = await response.json();
      if (body && typeof body.message === "string") {
        message = body.message;
      }
    } catch {
      const details = await response.text();
      if (details) {
        message = details;
      }
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  return parseJsonResponse<AuthResponse>(response);
}

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include"
  });

  return parseJsonResponse<AuthResponse>(response);
}

export async function fetchCurrentUser(): Promise<AuthResponse> {
  const respones = await fetch(`${API_BASE_URL}/user/users/me`, { credentials: "include" });
  return parseJsonResponse<AuthResponse>(respones);
}

export async function fetchTopics(): Promise<Topic[]> {
  const response = await fetch(`${API_BASE_URL}/topics`);
  return parseJsonResponse<Topic[]>(response);
}

export async function createStudyPlan(payload: StudyPlanRequest): Promise<StudyPlanResponse> {
  const response = await fetch(`${API_BASE_URL}/study-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return parseJsonResponse<StudyPlanResponse>(response);
}
