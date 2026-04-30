import { ResultSetHeader } from "mysql2";
import { Pool } from "mysql2/promise";
// Use the promise-based Pool type so query() returns a Promise<[result, fields]> tuple instead of a Query stream.
import { IStudyPlanRepository } from "../domains/IStudyPlanRepository.js";
import { StudyPlan } from "./../domains/StudyPlan.js";

export class StudyPlanRepository implements IStudyPlanRepository {
  constructor(private pool: Pool) {}

  async create(studyPlan: StudyPlan): Promise<StudyPlan> {
    if (!studyPlan.user_id) throw new Error("User not found");

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

    const [result, _] = await this.pool.query<ResultSetHeader>(
      "INSERT INTO study_plan (user_id, title, description, duration_hours, duration_days, duration_months, duration_years, is_saved) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        studyPlan.user_id,
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
