import { useMemo, useState } from "react";
import { Topic } from "../types";

interface TopicSelectorProps {
  topics: Topic[];
  selectedIds: number[];
  onChange: (topicIds: number[]) => void;
}

export function TopicSelector({ topics, selectedIds, onChange }: TopicSelectorProps) {
  const [query, setQuery] = useState("");

  const visibleTopics = useMemo(() => {
    if (!query.trim()) {
      return topics;
    }

    const normalized = query.toLowerCase();
    return topics.filter((topic) => {
      const category = topic.category ?? "";
      const description = topic.description ?? "";
      return `${topic.name} ${category} ${description}`.toLowerCase().includes(normalized);
    });
  }, [topics, query]);

  function toggleTopic(id: number) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((topicId) => topicId !== id));
      return;
    }

    onChange([...selectedIds, id]);
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Topics</h2>
        <p>Select topics to narrow the generated plan (optional).</p>
      </div>

      <label className="field">
        <span>Filter Topics</span>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, category, or description"
        />
      </label>

      <div className="topic-list">
        {visibleTopics.length === 0 ? (
          <p className="muted">No topics found.</p>
        ) : (
          visibleTopics.map((topic) => (
            <label className="topic-item" key={topic.id}>
              <input
                type="checkbox"
                checked={selectedIds.includes(topic.id)}
                onChange={() => toggleTopic(topic.id)}
              />
              <div>
                <strong>{topic.name}</strong>
                {topic.category ? <small>{topic.category}</small> : null}
              </div>
            </label>
          ))
        )}
      </div>
    </section>
  );
}
