import { Request, Response } from "express";
import GroqService from "../services/groqService.js";
import { StudyPlanService } from "../services/studyPlanService.js";
import {
  CreateStudyPlanDTO,
  CreateStudyPlanWeekDTO,
} from "../dtos/StudyPlanDTO.js";

type AuthenticatedRequest = Request & { user?: { sub?: number } };

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export class GroqController {
  constructor(
    private groqService: GroqService,
    private studyPlanService: StudyPlanService,
  ) {}

  /* HELPER METHODS */
  private isString = (value: unknown): value is string =>
    typeof value === "string";
  private isBoolean = (value: unknown): value is boolean =>
    typeof value === "boolean";
  private isStringArray = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === "string");

  private isValidWeek = (week: unknown): week is CreateStudyPlanWeekDTO => {
    if (typeof week !== "object" || week === null) return false;

    const candidate = week as any;
    return (
      typeof candidate.week_number === "number" &&
      this.isString(candidate.title) &&
      this.isStringArray(candidate.objectives) &&
      this.isStringArray(candidate.topics)
    );
  };

  private isValidStudyPlanPayload = (
    payload: unknown,
  ): payload is CreateStudyPlanDTO => {
    if (typeof payload !== "object" || payload === null) return false;

    const body = payload as CreateStudyPlanDTO;

    if (!this.isString(body.title)) return false;
    if (body.description != null && !this.isString(body.description))
      return false;
    if (body.weeks != null) {
      if (!Array.isArray(body.weeks) || !body.weeks.every(this.isValidWeek))
        return false;
    }

    return true;
  };

  /* MAIN METHODS */
  converse = async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthenticatedRequest;

      const userId = authReq.user?.sub;
      if (!userId) return res.status(401).json({ message: "Unauthorized." });

      const { messages } = req.body as { messages?: ChatMessage[] };

      if (!Array.isArray(messages)) {
        return res.status(400).json({
          message: "Missing messages in request body",
        });
      }

      const result = await this.groqService.converse(messages);

      if (result.ready && result.plan) {
        if (!this.isValidStudyPlanPayload(result.plan)) {
          return res.status(422).json({ message: "Groq returned invalid plan data." });
        }

        const studyPlan = await this.studyPlanService.generate(result.plan, userId);

        return res.status(200).json({
          ...result,
          studyPlan
        })
      }

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        message: error?.message ?? "Failed to process Groq conversation",
      });
    }
  };

  // persist = async (req: Request, res: Response) => {
  //   try {
  //     const authReq = req as AuthenticatedRequest;

  //     const userId = authReq.user?.sub;
  //     if (!userId) return res.status(401).json({ message: "Unauthorized." });

  //     const payload = req.body;

  //     if (!this.isValidStudyPlanPayload(payload)) {
  //       return res.status(400).json({
  //         message: "Invalid study plan payload.",
  //       });
  //     }

  //     const studyPlan = await this.studyPlanService.generate(payload, userId);

  //     return res.status(201).json({
  //       message: "Study plan persisted successfully in the database.",
  //       success: true,
  //       studyPlan,
  //     });
  //   } catch (error: any) {
  //     return res.status(500).json({
  //       message: error?.message ?? "Failed to persist study plan with Groq",
  //     });
  //   }
  // };
}
