import { StudyPlan } from "../domains/StudyPlan.js";
import { User } from "../domains/User.js";
import { CreateStudyPlanDTO } from "../dtos/CreateStudyPlanDTO.js";
import { StudyPlanRepository } from './../repositories/studyPlanRepository.js';

export class StudyPlanService {
    constructor(private studyPlanRepository: StudyPlanRepository) {}

    async generate(dto: CreateStudyPlanDTO, user: User): Promise<StudyPlan> {
        if (!user.id) throw new Error("User not found");

        const studyPlan = StudyPlan.generate(dto, user);

        await this.studyPlanRepository.create(studyPlan);

        return studyPlan;
    }
}
