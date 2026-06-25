import { ChatMessage } from "../components/chat/ChatMessage";
import { PlanActionBar } from "../components/chat/PlanActionBar";
import { PlanPreview } from "../components/chat/PlanPreview";
import { PromptForm } from "../components/PromptForm";
import { useChat } from "../hooks/useChat";

export function ChatPage() {
  const {
    messages,
    planPreview,
    isGenerating,
    isPlanSaved,
    messagesEndRef,
    submitPrompt,
    saveCurrentPlan,
    regenerateLastPlan,
  } = useChat();

  const hasReadyPreview = Boolean(planPreview) && !isPlanSaved;

  async function handleSubmit({ prompt }: { prompt: string }) {
    await submitPrompt(prompt);
  }

  async function handleSave() {
    try {
      await saveCurrentPlan();
    } catch (err) {
      // Surface the error in the chat as an assistant message so the user knows.
      console.error("Failed to save plan:", err);
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-1 flex-col">
      <div className="flex flex-1 flex-col min-h-[calc(100vh-5.5rem)] border border-slate-200 bg-slate-50 shadow-inner">
        <div className="border-b border-slate-200 px-6 py-5 bg-white">
          <h2 className="text-xl font-semibold text-slate-900">
            AI Study Plan Chat
          </h2>
          <p className="text-sm text-slate-500">
            Chat with the assistant and generate your study plan like a chatbot.
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden bg-slate-100">
          <div className="h-full min-h-0 overflow-y-auto px-6 py-6 pb-32 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => {
                const isLastAssistantReady =
                  message.role === "assistant" &&
                  message.status === "ready" &&
                  planPreview &&
                  index === messages.length - 1;

                return (
                  <ChatMessage key={index} message={message}>
                    {isLastAssistantReady && planPreview && (
                      <PlanPreview plan={planPreview} />
                    )}
                  </ChatMessage>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-5 z-20">
          {hasReadyPreview && (
            <PlanActionBar
              onSave={handleSave}
              onTryAgain={regenerateLastPlan}
              disabled={isGenerating}
            />
          )}

          <PromptForm isSubmitting={isGenerating} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}