import { StudyPlan } from "../domains/StudyPlan.js";

export interface IStudyPlanRepository {
    create(studyPlan: StudyPlan): Promise<StudyPlan>;
    getPlansByUserId(userId: number): Promise<StudyPlan[]>
    getPlanById(userId: number, planId: number): Promise<StudyPlan[]>
    deletePlan(planId: number, userId: number): Promise<number>
}
