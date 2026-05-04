import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

interface GroqStudyPlanDTO {
  title: string;
  description: string;
  duration_hours: number;
  weeks: Array<{
    week: number;
    title: string;
    objectives: string[];
    topics: string[];
  }>;
  durationWeeks: number;
  hoursPerWeek: number;
}

interface GroqConversationResult {
  assistantText: string;
  ready: boolean;
  plan?: GroqStudyPlanDTO;
}

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export default class GroqService {
  private buildPrompt(messages: ChatMessage[]) {
    const instructions = [
      "You are an expert study-plan assistant.",
      "Ask clarifying questions until you have enough information to create a plan.",
      "Do not create the plan until you have all required details.",
      "When you are ready, respond with only valid JSON using this schema:",
      `{
        "title": string,
        "description": string,
        "durationWeeks": number,
        "hoursPerWeek": number,
        "weeks": [
            {
            "week": number,
            "title": string,
            "objectives": string[],
            "topics": string[]
            }
        ]
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

  private validatePlan(candidate: GroqStudyPlanDTO): boolean {
    if (
      typeof candidate !== "object" ||
      candidate === null ||
      typeof candidate.title !== "string" ||
      typeof candidate.description !== "string" ||
      typeof candidate.durationWeeks !== "number" ||
      typeof candidate.hoursPerWeek !== "number" ||
      !Array.isArray(candidate.weeks) ||
      candidate.weeks.length === 0
    ) {
      return false;
    }

    return candidate.weeks.every((week) => {
      return (
        typeof week === "object" &&
        typeof week.week === "number" &&
        typeof week.title === "string" &&
        Array.isArray(week.objectives) &&
        week.objectives.every((objective) => typeof objective === "string") &&
        Array.isArray(week.topics) &&
        week.topics.every((topic) => typeof topic === "string")
      );
    });
  }

private tryParsePlan(text: string): GroqStudyPlanDTO | null {
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
            assistantText,
            ready: true,
            plan,
        }
      }

      return {
        assistantText,
        ready: false
      }
  }
}
