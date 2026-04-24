import { useState,useEffect } from "react";

export const PreviewTabs = (results) => {
  // const[summary, setSummary] = useState(results.summary);
  // const [flashcards, setFlashcards] = useState(results.flashcards);
  // const [notes, setNotes] = useState(results.notes);
  const [tab, setTab] = useState("summary");
  const [flipped, setFlipped] = useState({});

  const tabs = [
    { id: "summary", label: "Summary", icon: "◈" },
    { id: "flashcards", label: `Flashcards ()`, icon: "⟁" },
    // { id: "flashcards", label: `Flashcards (${results.flashcards.length})`, icon: "⟁" },
    { id: "notes", label: "Notes", icon: "≡" },
  ]

  useEffect(()=>{
    console.log(results, 'results in preview tabs')
    console.log(results.results.flashcards, 'results in preview tabs')
  },[])
  return (
    <>
      {results && (
        <>
          <div className="results-header flex items-center justify-between w-full mb-6 font-serif">
            <div className="results-title text-[25px]">Your Study Materials</div>
            <button
              className="new-btn border-[1px] 
            border-[#7d7568] cursor-pointer py-2 px-4 
            text-[#7d7568] text-[14px]"
              onClick={() => { setResults(null); setFile(null); }}>
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

          {tab === "flashcards" && (
            <div className="panel">
              <div className="panel-label">⟁ Flashcards — Click to flip</div>
              {/* <div className="cards-count">{results.flashcards.length} cards generated</div> */}
              <div className="flashcards-grid">
                {results.flashcards.kwargs.content.map((card, i) => (
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
              <div className="panel-label">≡ Study Notes</div>
              <div
                className="notes-text"
              />
            </div>
          )}
        </>
      )}
    </>
  )
}