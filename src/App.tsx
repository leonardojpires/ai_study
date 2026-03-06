import { useEffect, useState } from "react";
import { createStudyPlan, fetchTopics } from "./api";
import { PromptForm } from "./components/PromptForm";
import { StatusBanner } from "./components/StatusBanner";
import { StudyPlanTimeline } from "./components/StudyPlanTimeline";
import { TopicSelector } from "./components/TopicSelector";
import { StudyPlanResponse, Topic } from "./types";

export function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlanResponse | null>(null);

  useEffect(() => {
    async function loadTopics() {
      try {
        setIsTopicsLoading(true);
        const response = await fetchTopics();
        setTopics(response);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load topics.";
        setErrorMessage(message);
      } finally {
        setIsTopicsLoading(false);
      }
    }

    void loadTopics();
  }, []);

  async function handleGenerate(values: { prompt: string; weeks: number; hoursPerWeek: number }) {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      setIsGenerating(true);

      const generated = await createStudyPlan({
        prompt: values.prompt,
        weeks: values.weeks,
        hoursPerWeek: values.hoursPerWeek,
        topicIds: selectedTopicIds.length > 0 ? selectedTopicIds : undefined
      });

      setStudyPlan(generated);
      setSuccessMessage("Study plan generated successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate study plan.";
      setErrorMessage(message);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <h1>AI Study Plan Generator</h1>
        <p>Turn natural language requests into structured weekly plans.</p>
      </header>

      {errorMessage ? <StatusBanner type="error" message={errorMessage} /> : null}
      {successMessage ? <StatusBanner type="success" message={successMessage} /> : null}

      <main className="layout">
        <section className="left-panel">
          <PromptForm isSubmitting={isGenerating} onSubmit={handleGenerate} />
          {isTopicsLoading ? (
            <section className="card">
              <p className="muted">Loading topics...</p>
            </section>
          ) : (
            <TopicSelector
              topics={topics}
              selectedIds={selectedTopicIds}
              onChange={setSelectedTopicIds}
            />
          )}
        </section>

        <section className="right-panel">
          <StudyPlanTimeline data={studyPlan} />
        </section>
      </main>
    </div>
  );
}
