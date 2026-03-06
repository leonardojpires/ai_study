import { StudyPlanRequest, StudyPlanResponse, Topic } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
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
