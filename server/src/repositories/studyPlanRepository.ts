import { ResultSetHeader } from "mysql2";
import { Pool } from "mysql2/promise";
// Use the promise-based Pool type so query() returns a Promise<[result, fields]> tuple instead of a Query stream.
import { IStudyPlanRepository } from "../domains/IStudyPlanRepository.js";
import { StudyPlan } from "./../domains/StudyPlan.js";

export class StudyPlanRepository implements IStudyPlanRepository {
  constructor(private pool: Pool) {}

  async create(studyPlan: StudyPlan): Promise<StudyPlan> {
    const conn = await this.pool.getConnection();
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

    try {
      await conn.beginTransaction();

      const [result, _] = await conn.query<ResultSetHeader>(
        "INSERT INTO study_plans (user_id, title, description, is_saved) VALUES (?, ?, ?, ?)",
        [
          studyPlan.user_id,
          studyPlan.title,
          studyPlan.description,
          studyPlan.is_saved,
        ],
      );

      studyPlan.id = result.insertId;

      for (const week of studyPlan.weeks) {
        const [weekResult] = await conn.query<ResultSetHeader>(
          "INSERT INTO study_plans_weeks (study_plan_id, week_number, title) VALUES (?, ?, ?)",
          [studyPlan.id, week.week_number, week.title]
        );

        const weekId = weekResult.insertId;

        if (week.objectives.length) {
          const objectiveRows = week.objectives.map((objective) => {
            return [
              weekId, 
              objective
            ];
          });
          await conn.query(
            "INSERT INTO study_plans_week_objectives (study_plan_week_id, objective) VALUES ?",
            [objectiveRows]
          );
        }

        if (week.topics.length) {
          const topicRows = week.topics.map((topic) => {
            return [
              weekId, 
              topic
            ];
          });

          await conn.query(
            "INSERT INTO study_plans_week_topics (study_plan_week_id, topic) VALUES ?",
            [topicRows]
          );
        }
      }

      await conn.commit();
      return studyPlan;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}
