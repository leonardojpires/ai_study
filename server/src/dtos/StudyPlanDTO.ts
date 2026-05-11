export interface CreateStudyPlanWeekTopicDTO {
    topic: string;
}

export interface CreateStudyPlanWeekObjectiveDTO {
    objective: string;
}

export interface CreateStudyPlanWeekDTO {
    week_number: number;
    title: string;
    objectives: CreateStudyPlanWeekObjectiveDTO[];
    topics: CreateStudyPlanWeekTopicDTO[];
}

export interface CreateStudyPlanDTO {
    title: string;
    description?: string;
    weeks?: CreateStudyPlanWeekDTO[];
    is_saved?: boolean;
}
