export type StudyPlanWeekObjectiveProps = {
    id?: number | undefined;
    study_plan_week_id?: number | undefined;
    objective: string;
}

export class StudyPlanWeekObjective {
    id?: number | undefined;
    study_plan_week_id?: number | undefined;
    objective: string;

    constructor(props: StudyPlanWeekObjectiveProps) {
        this.id = props.id;
        this.study_plan_week_id = props.study_plan_week_id;
        this.objective = props.objective;
    }
}
