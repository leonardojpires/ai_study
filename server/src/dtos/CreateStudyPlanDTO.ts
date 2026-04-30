export interface CreateStudyPlanDTO {
    title: string;
    description?: string | undefined;
    duration_hours?: number | undefined;
    duration_days?: number | undefined;
    duration_weeks?: number | undefined;
    duration_months?: number | undefined;
    duration_years?: number | undefined;
    is_saved?: boolean | undefined;
}
