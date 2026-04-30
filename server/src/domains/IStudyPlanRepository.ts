import { CreateStudyPlanDTO } from "../dtos/CreateStudyPlanDTO.js";
import { User } from './User.js';
import { StudyPlan } from './StudyPlan.js';

export interface IStudyPlanRepository {
    create(studyPlan: StudyPlan): Promise<StudyPlan>;
}
