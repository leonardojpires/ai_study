export interface AuthResponse {
  success: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
  };
}

export interface ChatMessage {
  role: "assistant" | "user";
  text: string;
}

export interface GroqPlan {
  title: string;
  description: string;
  weeks: Array<{
    week_number: number;
    title: string;
    objectives: string[];
    topics: string[];
  }>;
  status: "ready" | "needs-info";
}

export interface GroqResponse {
  assistantText: string;
  status: "ready" | "needs-info";
  plan?: GroqPlan;
}

export interface PersistGroqPlanRequest {
  title: string;
  description?: string;
  weeks: GroqPlan["weeks"];
  is_saved?: boolean;
}
