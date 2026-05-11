import { StudyPlanWeekObjective } from "./StudyPlanWeekObjective.js";
import { StudyPlanWeekTopic } from "./StudyPlanWeekTopic.js";

type StudyPlanWeekProps = {
    id?: number;
    study_plan_id?: number;
    week_number: number;
    title: string;
    objectives: StudyPlanWeekObjective[];
    topics: StudyPlanWeekTopic[];
}

export class StudyPlanWeek {
    id?: number | undefined;
    study_plan_id?: number | undefined;
    week_number: number;
    title: string;
    objectives: StudyPlanWeekObjective[];
    topics: StudyPlanWeekTopic[];

    constructor(props: StudyPlanWeekProps) {
        this.id = props.id;
        this.study_plan_id = props.study_plan_id;
        this.week_number = props.week_number;
        this.title = props.title;
        this.objectives = props.objectives;
        this.topics = props.topics;
    }
}