import { IStudyPlanRepository } from "../repositories/IStudyPlanRepository.js";
import { StudyPlan } from "../domains/StudyPlan.js";
import { CreateStudyPlanDTO } from "../dtos/StudyPlanDTO.js";

export class StudyPlanService {
    constructor(private studyPlanRepository: IStudyPlanRepository) {}

    async generate(dto: CreateStudyPlanDTO, userId: number): Promise<StudyPlan> {
        if (!userId) throw new Error("User not found");

        const studyPlan = StudyPlan.generate(dto, userId);

        await this.studyPlanRepository.create(studyPlan);

        return studyPlan;
    }

    async getPlansByUserId(userId: number) {
        if (!userId) throw new Error("User not found");

        const studyPlans = await this.studyPlanRepository.getPlansByUserId(userId);

        return studyPlans;
    }

    async getPlanById(userId: number, planId: number) {
        if (!userId) throw new Error("User not found");
        if (!planId) throw new Error("Plan not found.");
        
        const studyPlan = await this.studyPlanRepository.getPlanById(userId, planId);

        return studyPlan;
    }

    async deletePlan(planId: number, userId: number) {
        const affectedRows = await this.studyPlanRepository.deletePlan(planId, userId);

        if (affectedRows === 0) throw new Error("Study plan not found.");
    }
}
