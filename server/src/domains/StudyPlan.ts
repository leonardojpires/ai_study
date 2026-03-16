import { User } from "./User.js";

export class StudyPlan {
    id?: number | undefined;
    title: string;
    description: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    user?: User | undefined;

    constructor(
        id: number | undefined,
        title: string,
        description: string,
        createdAt: Date | undefined,
        updatedAt: Date | undefined,
        user: User | undefined
    ) {
        this.id = id ?? undefined;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt ?? undefined;
        this.updatedAt = updatedAt ?? undefined;
        this.user = user ?? undefined;
    }

    static create(title: string, description: string, user: User): StudyPlan { 
        return new StudyPlan(undefined, title, description, undefined, undefined, user);
    }

    static update(title: string, description: string): StudyPlan {
        return new StudyPlan(undefined, title, description, undefined, undefined, undefined);
    }
}
