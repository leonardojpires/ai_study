import { StudyPlanResponse } from "../types";

interface StudyPlanTimelineProps {
  data: StudyPlanResponse | null;
}

export function StudyPlanTimeline({ data }: StudyPlanTimelineProps) {
  if (!data) {
    return (
      <section className="card">
        <div className="card-header">
          <h2>Study Plan</h2>
          <p>Your generated plan will appear here.</p>
        </div>
        <p className="muted">Submit your prompt to generate the weekly roadmap.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>{data.title}</h2>
        <p>{data.summary}</p>
      </div>

      <div className="timeline">
        {data.weeks.map((week) => (
          <article key={week.week} className="timeline-item">
            <header>
              <h3>Week {week.week}</h3>
              <p>{week.title}</p>
            </header>

            <div className="week-columns">
              <div>
                <h4>Objectives</h4>
                <ul>
                  {week.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Topics</h4>
                <ul>
                  {week.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
