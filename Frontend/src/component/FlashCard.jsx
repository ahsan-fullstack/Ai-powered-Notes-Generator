import { memo } from "react"

export const FlashCard = memo(({ card, index, flipped, onFlip, flashcards }) => {
  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={onFlip}
    >
      <div className="flashcard-inner">
        <div className="flashcard-face flashcard-front">
          <div className="card-label">Question {index + 1}</div>
          <div className="card-text">{card.question}</div>
          <div className="flip-hint">tap to reveal →</div>
        </div>
        <div className="flashcard-face flashcard-back">
          <div className="card-label">Answer</div>
          <div className="card-text">{card.answer}</div>
        </div>
      </div>
    </div>
  )
})                     
