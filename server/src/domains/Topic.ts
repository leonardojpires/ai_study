export class Topic {
    id?: number | undefined;
    name: string;
    slug: string;
    description: string;
    difficulty: string;
    estimatedTime: number;
    isActive: boolean;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;

    constructor(
        id: number | undefined,
        name: string,
        slug: string,
        description: string,
        difficulty: string,
        estimatedTime: number,
        isActive: boolean,
        createdAt: Date | undefined,
        updatedAt: Date | undefined
    ) {
        this.id = id ?? undefined;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.difficulty = difficulty;
        this.estimatedTime = estimatedTime;
        this.isActive = isActive;
        this.createdAt = createdAt ?? undefined;
        this.updatedAt = updatedAt ?? undefined;
    }

    static create(name: string, slug: string, description: string, difficulty: string, estimatedTime: number): Topic {
        return new Topic(undefined, name, slug, description, difficulty, estimatedTime, true, undefined, undefined);
    }

    static update(name: string, slug: string, description: string, difficulty: string, estimatedTime: number, isActive: boolean): Topic {
        return new Topic(undefined, name, slug, description, difficulty, estimatedTime, isActive, undefined, undefined);
    }
}
