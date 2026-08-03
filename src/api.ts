// Public API facade. Keeping this module stable avoids coupling consumers to the
// internal organization of the API layer.
export {
  fetchCsrfToken,
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./api/auth.js";
export { converse, persistGroqPlan } from "./api/groq.js";
export {
  createStudyPlan,
  deletePlan,
  getPlansByUserId,
} from "./api/studyPlans.js";
export { fetchTopics } from "./api/topics.js";

export type {
  AuthResponse,
  ChatMessage,
  GroqPlan,
  GroqResponse,
  PersistGroqPlanRequest,
} from "./api/types.js";
