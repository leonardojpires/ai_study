import { CreateStudyPlanDTO } from "../dtos/StudyPlanDTO.js";
import { StudyPlanWeek } from "./StudyPlanWeek.js";

type StudyPlanProps = {
    id?: number | undefined;
    title: string;
    description?: string | undefined;
    is_saved?: boolean | undefined;
    weeks?: StudyPlanWeek[];
    user_id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}

export class StudyPlan {
    id?: number | undefined;
    title: string;
    description?: string | undefined;
    is_saved?: boolean | undefined;
    weeks: StudyPlanWeek[] = [];
    user_id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;

    constructor(props: StudyPlanProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description ?? "";
        this.is_saved = props.is_saved;
        this.weeks = props.weeks ?? [];
        this.user_id = props.user_id;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    static generate(dto: CreateStudyPlanDTO, userId: number): StudyPlan { 
        return new StudyPlan({
            title: dto.title,
            description: dto.description ?? "",
            is_saved: dto.is_saved ?? false,
            weeks: (dto.weeks ?? []).map(week => new StudyPlanWeek({
                week_number: week.week_number,
                title: week.title,
                objectives: week.objectives,
                topics: week.topics
            })),
            user_id: userId
        });
    }
}
