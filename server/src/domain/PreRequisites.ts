export class PreRequisites {
    id?: number | undefined;
    topicId: number;
    prerequisiteTopicId: number;

    constructor(
        id: number | undefined,
        topicId: number,
        prerequisiteTopicId: number
    ) {
        this.id = id ?? undefined;
        this.topicId = topicId;
        this.prerequisiteTopicId = prerequisiteTopicId;
    }

    public involvesTopic(topicId: number): boolean {
        return this.topicId === topicId || this.prerequisiteTopicId === topicId;
    }
}
