export interface Topic {
  id: number;
  name: string;
  description?: string;
  category?: string;
}

export interface StudyPlanRequest {
  prompt: string;
  weeks: number;
  hoursPerWeek: number;
  topicIds?: number[];
}

export interface WeekItem {
  week: number;
  title: string;
  objectives: string[];
  topics: string[];
}

export interface StudyPlanResponse {
  title: string;
  summary: string;
  weeks: WeekItem[];
}
