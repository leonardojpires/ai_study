CREATE TABLE IF NOT EXISTS study_plans_week_objectives (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    study_plan_week_id INT UNSIGNED NOT NULL,
    objective VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_study_plans_week_objectives_study_plan_week_id
        FOREIGN KEY (study_plan_week_id)
        REFERENCES study_plans_weeks(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;