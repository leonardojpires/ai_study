import { Request, Response } from "express";
import { StudyPlanService } from "../services/studyPlanService.js";

type AuthenticatedRequest = Request & { user?: { sub?: number } };

export class StudyPlanController {    
    constructor(private studyPlanService: StudyPlanService) {}

    generate = async (req: Request, res: Response) => {
        try {
            const authReq = req as AuthenticatedRequest;

            const userId = authReq.user?.sub;
            if (!userId) return res.status(401).json({ message: "Unauthorized." });

            const result = await this.studyPlanService.generate(req.body, userId);

            return res.status(201).json({
                message: "Study plan generated successfully.",
                success: true,
                studyPlan: result
            })
        } catch(error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}