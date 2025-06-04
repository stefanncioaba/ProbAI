import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export async function aiResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction: `
      RULES:
      -FOLLOW ALL THE RULES PRECISELY
      -Start solving without any message before it
      -Finish your answer in under 100 words
      -REALLY IMPORTANT : Finish with a clear percentage on a new line like (example: "FINAL ANSWER: 45.2% ")
      -If the question is empty, respond with "Enter a valid question"
      -If a question do not ask in any way about a probability, your response should be : "This is not a valid question"
      -Do not add any of your formatting in your answer, like bold text or anything else
      -If the data is not sufficient or the problem can not be solved with the information given, respond with one of the following:
        'Sorry, I don't know how to solve this.'
        'You didn't give me enough data to solve this.'
      You are an AI that answers probability questions. Your task is to calculate and explain the probability of given events based on the data provided. 
      Make sure to explain it the way you would explain to a 14 year old.
      
                        `,
    },
  });
  return response.text;
}

