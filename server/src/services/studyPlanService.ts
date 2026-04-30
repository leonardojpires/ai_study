import { IStudyPlanRepository } from "../domains/IStudyPlanRepository.js";
import { StudyPlan } from "../domains/StudyPlan.js";
import { CreateStudyPlanDTO } from "../dtos/CreateStudyPlanDTO.js";

export class StudyPlanService {
    constructor(private studyPlanRepository: IStudyPlanRepository) {}

    async generate(dto: CreateStudyPlanDTO, userId: number): Promise<StudyPlan> {
        if (!userId) throw new Error("User not found");

        const studyPlan = StudyPlan.generate(dto, userId);

        await this.studyPlanRepository.create(studyPlan);

        return studyPlan;
    }
}
