import Groq from "groq-sdk";
import { CreateStudyPlanDTO } from "../dtos/StudyPlanDTO.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// interface GroqStudyPlanDTO {
//   title: string;
//   description: string;
//   duration_hours: number;
//   weeks: Array<{
//     week: number;
//     title: string;
//     objectives: string[];
//     topics: string[];
//   }>;
//   durationWeeks: number;
//   hoursPerWeek: number;
// }

interface GroqConversationResult {
  assistantText: string;
  ready: boolean;
  plan?: CreateStudyPlanDTO;
}

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export default class GroqService {
  private buildPrompt(messages: ChatMessage[]) {
    const instructions = [
      "You are an expert study-plan assistant.",
      "Use exactly these field names: title, description, weeks, week_number, title, objectives, topics, is_saved",
      "Do not use markdown",
      "Do not wrap the JSON in code fences",
      "Do not include any explanation outside the JSON",
      "Ask clarifying questions until you have enough information to create a plan.",
      "Do not create the plan until you have all required details.",
      "You must respond in the same language as the user prompt",
      "When you are ready, respond with only valid JSON using this schema:",
      `{
        "title": "string",
        "description": "string",
        "weeks": [
          {
            "week_number": 1,
            "title": "string",
            "objectives": ["string"],
            "topics": ["string"]
          }
        ],
        "is_saved": false
      }`,
      "If you are not ready, reply with a follow-up question.",
      "",
    ];

    const history = messages
      .map((message) => `${message.role}: ${message.text}`)
      .join("\n");

    return [...instructions, history, "assistant:"].join("\n");
  }

  private async callGroq(prompt: string): Promise<string> {
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    return response.choices[0]?.message?.content || "";
  }

  private extractJson(text: string): string | null {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? match[0] : null;
  }

  private validatePlan(candidate: CreateStudyPlanDTO): boolean {
    if (
      typeof candidate !== "object" ||
      candidate === null ||
      typeof candidate.title !== "string" ||
      typeof candidate.description ==  null ||
      !Array.isArray(candidate.weeks) ||
      candidate.weeks.length === 0
    ) {
      return false;
    }

    return candidate.weeks.every((week) => {
      return (
        typeof week === "object" &&
        typeof week.week_number === "number" &&
        typeof week.title === "string" &&
        Array.isArray(week.objectives) &&
        week.objectives.every((objective) => typeof objective === "string") &&
        Array.isArray(week.topics) &&
        week.topics.every((topic) => typeof topic === "string")
      );
    });
  }

  private tryParsePlan(text: string): CreateStudyPlanDTO | null {
    const json = this.extractJson(text);
    if (!json) return null;

    try {
      const candidate = JSON.parse(json);
      return this.validatePlan(candidate) ? candidate : null;
    } catch {
      return null;
    }
  }

  async converse(messages: ChatMessage[]): Promise<GroqConversationResult> {
    const prompt = this.buildPrompt(messages);
    const assistantText = await this.callGroq(prompt);
    const plan = this.tryParsePlan(assistantText);

    if (plan) {
      return {
        assistantText: `Study plan generated: ${plan.title}`,
        ready: true,
        plan,
      };
    }

    return {
      assistantText,
      ready: false,
    };
  }
}
