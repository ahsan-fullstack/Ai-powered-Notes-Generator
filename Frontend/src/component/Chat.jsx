import { useMemo, useState } from "react";
import { marked } from "marked";
import { useLocation, useParams } from "react-router-dom";


export const Chat = () => {
  const { id: chatId } = useParams();
  const { state } = useLocation();
  const results = state?.results;

  const [tab, setTab] = useState("summary");
  const [flipped, setFlipped] = useState({});

  const summary = results?.summary?.kwargs?.content || "";
  const notes = results?.notes?.kwargs?.content || "";
  const flashcards = useMemo(() => {
    try {
      const parsed = JSON.parse(results?.flashcards?.kwargs?.content || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [results]);

  const tabs = [
    { id: "summary", label: "Summary", icon: "◈" },
    { id: "flashcards", label: `Flashcards (${flashcards.length})`, icon: "⟁" },
    { id: "notes", label: "Notes", icon: "≡" },
  ]

  function toggleFlip(i) {
    setFlipped((p) => ({ ...p, [i]: !p[i] }))
  }

  const parseMarkdown = (text) => marked(text);
  
  return (
    <>
      {!results ? (
        <div className="w-full p-6 text-[var(--text)]">
          <div className="font-serif text-[22px] mb-2">Chat: {chatId}</div>
          <div className="text-[#7d7568]">
            No generated content found for this chat yet. Upload a PDF to generate summary, flashcards, and notes.
          </div>
        </div>
      ) : (
        <>
          <div className="results-header flex items-center justify-between w-full mb-3! font-serif">
            <div className="results-title text-[25px]">Your Study Materials</div>
            <button
              className="new-btn border-[1px] 
            border-[#7d7568] cursor-pointer py-2 px-4 
            text-[#7d7568] text-[14px]"
            >
              + New PDF
            </button>
          </div>

          <div className="tabs w-full">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`tab ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          {tab === "summary" && (
            <div className="panel">
              <div className="panel-label">✦ AI Summary</div>
              <div
                className="summary-text"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}
              />
            </div>
          )}
          {tab === "flashcards" && (
            <div className="panel w-full">
              <div className="panel-label">⟁ Flashcards — Click to flip</div>
              <div className="cards-count">{flashcards.length} cards generated</div>
              <div className="flashcards-grid">
                {flashcards.map((card, i) => (
                  <div
                    key={i}
                    className={`flashcard ${flipped[i] ? "flipped" : ""}`}
                    onClick={() => toggleFlip(i)}
                  >
                    <div className="flashcard-inner">
                      <div className="flashcard-face flashcard-front">
                        <div className="card-label">Question {i + 1}</div>
                        <div className="card-text">{card.question}</div>
                        <div className="flip-hint">tap to reveal →</div>
                      </div>
                      <div className="flashcard-face flashcard-back">
                        <div className="card-label">Answer</div>
                        <div className="card-text">{card.answer}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "notes" && (
            <div className="panel">
              <div className="panel-label">Study Notes</div>
              <div
                className="notes-text"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(notes) }}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}