import type {
  SavedPlansResponse,
  StudyPlanRequest,
  StudyPlanResponse,
} from "../types.js";
import {
  apiUrl,
  ensureSuccessfulResponse,
  parseJsonResponse,
} from "./client.js";
import { getCsrfHeaders } from "./auth.js";

export async function createStudyPlan(
  payload: StudyPlanRequest,
): Promise<StudyPlanResponse> {
  const response = await fetch(apiUrl("/study-plan/generate"), {
    method: "POST",
    headers: getCsrfHeaders(),
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return parseJsonResponse<StudyPlanResponse>(response);
}

export async function getPlansByUserId(): Promise<SavedPlansResponse> {
  const response = await fetch(apiUrl("/study-plan/get-saved-plans"), {
    method: "GET",
    headers: getCsrfHeaders(),
    credentials: "include",
  });

  return parseJsonResponse<SavedPlansResponse>(response);
}

export async function deletePlan(planId: number): Promise<Response> {
  const response = await fetch(apiUrl(`/study-plan/delete-plan/${planId}`), {
    method: "DELETE",
    headers: getCsrfHeaders(),
    credentials: "include",
  });

  return ensureSuccessfulResponse(response);
}
