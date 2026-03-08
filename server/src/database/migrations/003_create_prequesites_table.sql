CREATE TABLE IF NOT EXISTS prerequisites (
    topic_id INT UNSIGNED NOT NULL,
    required_topic_id INT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (topic_id, required_topic_id),

    CONSTRAINT fk_prerequisites_topic_id
        FOREIGN KEY (topic_id) 
        REFERENCES topics(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_prerequisites_required_topic_id
        FOREIGN KEY (required_topic_id)
        REFERENCES topics(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;