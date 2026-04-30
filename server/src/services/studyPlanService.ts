import { IStudyPlanRepository } from "../domains/IStudyPlanRepository.js";
import { StudyPlan } from "../domains/StudyPlan.js";
import { User } from "../domains/User.js";
import { CreateStudyPlanDTO } from "../dtos/CreateStudyPlanDTO.js";

export class StudyPlanService {
    constructor(private studyPlanRepository: IStudyPlanRepository) {}

    async generate(dto: CreateStudyPlanDTO, user: User): Promise<StudyPlan> {
        if (!user.id) throw new Error("User not found");

        const studyPlan = StudyPlan.generate(dto, user);

        await this.studyPlanRepository.create(studyPlan);

        return studyPlan;
    }
}
