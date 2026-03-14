import { User } from "./User.js";

export class StudyPlan {
    id?: number | undefined;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    user?: User | undefined;

    constructor(
        id: number | undefined,
        title: string,
        description: string,
        createdAt: Date,
        updatedAt: Date,
        user: User | undefined
    ) {
        this.id = id ?? undefined;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user ?? undefined;
    }
}