export class Topic {
    id?: number | undefined;
    name: string;
    slug: string;
    description: string;
    difficulty: string;
    estimatedTime: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number | undefined,
        name: string,
        slug: string,
        description: string,
        difficulty: string,
        estimatedTime: number,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id ?? undefined;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.difficulty = difficulty;
        this.estimatedTime = estimatedTime;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}