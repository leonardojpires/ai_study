import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
    try {
        /* This first line is equivalent to the path of the migrations folder */
        const migrationsDir = path.join(__dirname, "migrations");
        const migrationName = process.argv[2];
        let files = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith(".sql"))
            .sort();

        if (migrationName) {
            files = files.filter(file => file === migrationName);
        }

        for (const file of files) {
            const filePath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(filePath, "utf8");

            console.log(`Running migration: ${file}`);

            await pool.query(sql);
        }

        console.log("All migrations ran successfully!");
        process.exit(0);
    } catch(err) {
        console.error("Erro running migrations: ", err);
        process.exit(1);
    }
}

runMigrations();
