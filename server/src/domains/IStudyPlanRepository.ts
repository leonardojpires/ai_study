import { CreateStudyPlanDTO } from "../dtos/StudyPlanDTO.js";
import { User } from './User.js';
import { StudyPlan } from './StudyPlan.js';

export interface IStudyPlanRepository {
    create(studyPlan: StudyPlan): Promise<StudyPlan>;
    getPlansByUserId(userId: number): Promise<StudyPlan[]>
}
