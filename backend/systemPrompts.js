export const flashCardsPrompt = (text) => {
    return `You are an expert educator. Generate 5 to 10 educational flashcards from the provided text.
    
    Quality Rules:
    - Questions must test deep conceptual understanding, not just rote memorization.
    - Answers must be concise, accurate, and highly educational.
    - DO NOT copy sentences directly from the source text.
    - Rewrite information in a friendly, "explainer" tone suitable for a student.
    - If the text is insufficient, return an empty list.

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