CREATE TABLE IF NOT EXISTS study_plans_weeks (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    study_plan_id INT UNSIGNED NOT NULL,
    week_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_study_plans_weeks_study_plan_id
        FOREIGN KEY (study_plan_id)
        REFERENCES study_plans(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;