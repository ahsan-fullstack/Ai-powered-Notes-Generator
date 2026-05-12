import { memo, useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FlashCard } from "./FlashCard";
import { SideBar } from "./SideBar";


export const Chat = () => {
  const navigate = useNavigate()

  const { id } = useParams();
  const { state } = useLocation();
  console.log(state,'state from sidebar')

  const results = state?.results.results;
  // const chatId = results.chatId
  console.log(results, ' results in chat component')

  const [tab, setTab] = useState("summary");
  const [flipped, setFlipped] = useState({});

  const summary = results?.summary ?? "";
  const flashcards = results?.flashcards;
  const notes = results?.notes ?? "";

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
      <div className="w-full py-[30px] px-[20px]">
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
                onClick={() => navigate('/')}
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
                    <FlashCard
                      key={i}
                      card={card}
                      index={i}
                      flipped={flipped[i]}
                      onFlip={() => toggleFlip(i)}
                      flashcards={flashcards}
                    />
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
      </div>
    </>
  )
}