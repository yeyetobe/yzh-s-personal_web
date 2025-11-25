import { GoogleGenAI } from "@google/genai";
import { PROFILE, PROJECTS, BLOG_POSTS } from "../data";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

// Construct a system prompt that gives the AI context about the portfolio owner
const SYSTEM_INSTRUCTION = `
You are a helpful AI assistant for ${PROFILE.name}'s personal portfolio website.
Your goal is to answer visitor questions about ${PROFILE.name}, their projects, and their writings.

Here is the context about ${PROFILE.name}:
Bio: ${PROFILE.bio}
Skills: ${PROFILE.skills.join(", ")}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Stack: ${p.techStack.join(', ')})`).join('\n')}

Recent Blog Posts:
${BLOG_POSTS.map(b => `- ${b.title}: ${b.summary}`).join('\n')}

Tone: Professional, friendly, and concise.
If asked about contact info, provide: ${PROFILE.socials.email}
If asked something outside this context, politely explain you are a portfolio assistant.
`;

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[]) => {
  const client = getAI();
  if (!client) {
    throw new Error("API Key missing");
  }

  try {
    // Transform history to match SDK expectation if needed, or just use generateContent with system instruction
    // For simplicity in this specialized task, we'll use generateContent with the system prompt context + history appended as text if needed,
    // but the best way is using the Chat API.
    
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // Replay history to set state (simplified)
    // In a real app, you might map this to the proper history format
    // Here we will just send the new message as we assume the session is short or we rely on the system prompt for main context
    
    // Ideally we would populate history:
    // history.forEach(h => ...) 
    
    const result = await chat.sendMessage({
      message: message
    });
    
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};