USE study_planner;

CREATE TABLE IF NOT EXISTS topics (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    slug VARCHAR(140) NOT NULL UNIQUE,
    description TEXT,

    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
    estimated_time SMALLINT UNSIGNED NOT NULL DEFAULT 0,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT TIMESTAMP 
        ON UPDATE CURRENT TIMESTAMP,
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;