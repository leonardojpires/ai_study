import { Request, Response } from "express";
import { StudyPlanService } from "../services/studyPlanService.js";

type AuthenticatedRequest = Request & { user?: { sub?: number } };

export class StudyPlanController {
  constructor(private studyPlanService: StudyPlanService) {}

  generate = async (req: Request, res: Response) => {
    try {
      const userId = this.getUserId(req);
      if (!userId) return res.status(401).json({ message: "Unauthorized." });

      const result = await this.studyPlanService.generate(req.body, userId);

      return res.status(201).json({
        message: "Study plan generated successfully.",
        success: true,
        studyPlan: result,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  getPlansByUserId = async (req: Request, res: Response) => {
    try {
      const userId = this.getUserId(req);
      if (!userId) return res.status(401).json({ message: "Unauthorized." });

      const result = await this.studyPlanService.getPlansByUserId(userId);

      return res.status(201).json({
        success: true,
        plans: result,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  deletePlan = async (req: Request, res: Response) => {
    try {
        const planId = Number(req.params.id);
        await this.studyPlanService.deletePlan(planId);

        return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  private getUserId(req: Request) {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user?.sub;

    return userId;
  }
}
