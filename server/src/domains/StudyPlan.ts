import { CreateStudyPlanDTO } from "../dtos/CreateStudyPlanDTO.js";

type StudyPlanProps = {
    id?: number | undefined;
    title: string;
    description: string;
    createdAt?: Date
    updatedAt?: Date
    duration_hours?: number
    duration_days?: number
    duration_weeks?: number
    duration_months?: number
    duration_years?: number
    is_saved?: boolean
    user_id?: number,
}

export class StudyPlan {
    id?: number | undefined;
    title: string;
    description: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    duration_hours?: number | undefined;
    duration_days?: number | undefined;
    duration_weeks?: number | undefined;
    duration_months?: number | undefined;
    duration_years?: number | undefined;
    is_saved?: boolean | undefined;
    user_id?: number | undefined;

    constructor(props: StudyPlanProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description ?? "";
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.duration_hours = props.duration_hours;
        this.duration_days = props.duration_days;
        this.duration_weeks = props.duration_weeks;
        this.duration_months = props.duration_months;
        this.duration_years = props.duration_years;
        this.is_saved = props.is_saved;
        this.user_id = props.user_id;
    }

    static generate(dto: CreateStudyPlanDTO, userId: number): StudyPlan { 
        return new StudyPlan({
            title: dto.title,
            description: dto.description ?? "",
            duration_hours: dto.duration_hours ?? 0,
            duration_days: dto.duration_days ?? 0,
            duration_weeks: dto.duration_weeks ?? 0,
            duration_months: dto.duration_months ?? 0,
            duration_years: dto.duration_years ?? 0,
            is_saved: dto.is_saved ?? false,
            user_id: userId
        });
    }
}
