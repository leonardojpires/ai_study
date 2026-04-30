import { ResultSetHeader } from "mysql2";
import { pool } from "../database/db.js";
import { IStudyPlanRepository } from "../domains/IStudyPlanRepository.js";
import { CreateStudyPlanDTO } from "../dtos/CreateStudyPlanDTO.js";
import { StudyPlan } from "./../domains/StudyPlan.js";
import { User } from "./../domains/User.js";

export class StudyPlanRepository implements IStudyPlanRepository {
  async create(studyPlan: StudyPlan): Promise<StudyPlan> {
    if (!studyPlan.user?.id) throw new Error("User not found");

    // NOTE ON mysql2 `pool.query()` RETURN VALUE:
    //
    // `pool.query()` always resolves to a tuple: [result, fields].
    //
    // 1) `result` (first element):
    //    - For INSERT queries, this is a `ResultSetHeader` object (NOT an array).
    //    - It contains metadata about the operation, such as:
    //        - `insertId`: the ID of the newly inserted row
    //        - `affectedRows`: number of rows impacted by the query
    //        - `warningStatus`, `serverStatus`, etc.
    //    - Example shape:
    //        { insertId: 123, affectedRows: 1, ... }
    //
    // 2) `fields` (second element):
    //    - An array of column metadata (`FieldPacket[]`).
    //    - Mostly useful for SELECT queries.
    //    - Typically empty or irrelevant for INSERT/UPDATE/DELETE operations.
    //
    // IMPORTANT:
    // - Do NOT treat `result` as an array (e.g., `result[0]` is incorrect).
    // - Always provide a generic type to `query()` (e.g., <ResultSetHeader>)
    //   to avoid using `any` and to let TypeScript catch incorrect assumptions.

    const [result, _] = await pool.query<ResultSetHeader>(
      "INSERT INTO study_plan (user_id, title, description, duration_hours, duration_days, duration_months, duration_years, is_saved) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        studyPlan.user.id,
        studyPlan.title,
        studyPlan.description,
        studyPlan.duration_hours,
        studyPlan.duration_days,
        studyPlan.duration_months,
        studyPlan.duration_years,
        studyPlan.is_saved,
      ],
    );

    studyPlan.id = result.insertId;

    return studyPlan;
  }
}
