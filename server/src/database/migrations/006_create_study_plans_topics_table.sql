CREATE TABLE IF NOT EXISTS study_plans_topics (
    study_plan_id INT UNSIGNED NOT NULL,
    topic_id INT UNSIGNED NOT NULL,
    
    PRIMARY KEY (study_plan_id, topic_id),

    CONSTRAINT fk_study_plans_topics_study_plan_id
        FOREIGN KEY (study_plan_id)
        REFERENCES study_plan(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_study_plans_topics_topic_id
        FOREIGN KEY (topic_id)
        REFERENCES topics(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;