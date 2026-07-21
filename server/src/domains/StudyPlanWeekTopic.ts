export type StudyPlanWeekTopicProps = {
    id?: number | undefined;
    study_plan_week_id?: number | undefined;
    topic: string;
}

export class StudyPlanWeekTopic {
    id?: number | undefined;
    study_plan_week_id?: number | undefined;
    topic: string;

    constructor(props: StudyPlanWeekTopicProps) {
        this.id = props.id;
        this.study_plan_week_id = props.study_plan_week_id;
        this.topic = props.topic;
    }
}
