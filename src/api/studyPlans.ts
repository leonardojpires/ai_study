import type {
  SavedPlansResponse,
  StudyPlanRequest,
  StudyPlanResponse,
} from "../types.js";
import {
  apiUrl,
  ensureSuccessfulResponse,
  jsonHeaders,
  parseJsonResponse,
} from "./client.js";

export async function createStudyPlan(
  payload: StudyPlanRequest,
): Promise<StudyPlanResponse> {
  const response = await fetch(apiUrl("/study-plan/generate"), {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return parseJsonResponse<StudyPlanResponse>(response);
}

export async function getPlansByUserId(): Promise<SavedPlansResponse> {
  const response = await fetch(apiUrl("/study-plan/get-saved-plans"), {
    method: "GET",
    headers: jsonHeaders,
    credentials: "include",
  });

  return parseJsonResponse<SavedPlansResponse>(response);
}

export async function deletePlan(planId: number): Promise<Response> {
  const response = await fetch(apiUrl(`/study-plan/delete-plan/${planId}`), {
    method: "DELETE",
    headers: jsonHeaders,
    credentials: "include",
  });

  return ensureSuccessfulResponse(response);
}
