import {
  SavedPlansResponse,
  StudyPlanRequest,
  StudyPlanResponse,
  Topic,
} from "./types.js";

type AuthResponse = {
  success: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
};

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

type GroqResponse = {
  assistantText: string;
  ready: boolean;
  plan?: {
    title: string;
    description: string;
    weeks: Array<{
      week_number: number;
      title: string;
      objectives: string[];
      topics: string[];
    }>;
    ready: boolean;
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

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  return parseJsonResponse<AuthResponse>(response);
}

export async function fetchCurrentUser(): Promise<AuthResponse> {
  const respones = await fetch(`${API_BASE_URL}/user/users/me`, {
    credentials: "include",
  });
  return parseJsonResponse<AuthResponse>(respones);
}

export async function fetchTopics(): Promise<Topic[]> {
  const response = await fetch(`${API_BASE_URL}/topics`);
  return parseJsonResponse<Topic[]>(response);
}

export async function logoutUser(): Promise<void> {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function createStudyPlan(
  payload: StudyPlanRequest,
): Promise<StudyPlanResponse> {
  const response = await fetch(`${API_BASE_URL}/study-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse<StudyPlanResponse>(response);
}

export async function getPlansByUserId(): Promise<SavedPlansResponse> {
  const response = await fetch(`${API_BASE_URL}/study-plan/get-saved-plans`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })

  return parseJsonResponse<SavedPlansResponse>(response);
}

export async function deletePlan(planId: number) {
  const response = await fetch(`${API_BASE_URL}/study-plan/delete-plan/${planId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
  });

  if (!response.ok) { 
    const error = await response.json();
    throw new Error(
      error.message || "Failed to delete plan"
    ) 
  }

  return response;
}

export async function converse(messages: ChatMessage[]): Promise<GroqResponse> {
  const response = await fetch(`${API_BASE_URL}/groq/converse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  return parseJsonResponse<GroqResponse>(response);
}

export async function persistGroqPlan(plan: {
  title: string;
  description?: string;
  weeks: Array<{
    week_number: number;
    title: string;
    objectives: string[];
    topics: string[];
  }>;
  is_saved?: boolean;
}) {
  const response = await fetch(`${API_BASE_URL}/groq/persist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...plan }),
  });

  return parseJsonResponse(response);
};
