export const flashCardsPrompt = (text) => {
  return `Generate exactly 10 flashcards.Return ONLY valid JSON.
       Expected format:

       [
         {
            "question": "What is ...?",
            "answer": "..."
          }
        ]

       Rules:
      - No markdown
      - No explanations
      - No extra text
      - Answers under 20 words
      - If insufficient information exists return []

    Text: ${text}
  `;
}


export const summaryPrompt = (text) => {
  return `You are an expert educator. Summarize the following text in a clear and concise manner, highlighting the key concepts and main ideas. The summary should be informative and easy to understand, suitable for a student who is new to the topic.

    Text: ${text}
  `;
}

export const notesPrompt = (text) => {
  return `You are an expert educator. Convert the following text into structured study notes in Markdown format. The notes should include:
    
    - Clear headings and subheadings to organize the content.
    - Bullet points to highlight important information and key concepts.
    - Concise explanations that capture the essence of the material without copying sentences directly from the source text.
    - A friendly, "explainer" tone that makes the content accessible to students.

    Text: ${text}
  `;
}   