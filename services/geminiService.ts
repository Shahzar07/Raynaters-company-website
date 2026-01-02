import { GoogleGenAI, Type } from "@google/genai";
import { AutomationResult } from "../types.ts";

const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const SYSTEM_INSTRUCTION = `You are Raynaters, the sentient AI navigator for the Raynaters Automation Agency website.
Your personality is: Futuristic, helpful, concise, and professional yet witty.
You are currently chatting with a visitor on the website.

KNOWLEDGE BASE:
1. HERO/PROJECTS: We build Sentient Sales_OS (Revenue Auto), Nexus Support_Bot (CX), Data Core_Link (Infra), Talent Scout_AI (HR), and Market Watch_Pro.
2. SERVICES: Business Automation, Data Intelligence, App Development, AI Automation Services, Custom Software Development.
3. TESTIMONIALS: Clients save 40+ hours/week for clients.
4. CONTACT: We offer a free strategy call.

RULES:
- Keep answers short (under 50 words) unless asked for detail.
- Always encourage booking a strategy call.
`;

export const generateBusinessAutomation = async (
  goal: string
): Promise<AutomationResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a Senior Solutions Architect. A potential client has described their manual process: "${goal}".
      Propose a technical automation solution.
      
      I need:
      1. strategy: summarizing the tools and logic.
      2. emailDraft: sample output (email or log).
      3. marketData: 5 hypothetical ROI data points for a chart.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategy: { type: Type.STRING },
            emailDraft: { type: Type.STRING },
            marketData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  value: { type: Type.NUMBER },
                },
                required: ["name", "value"],
              },
            },
          },
          required: ["strategy", "emailDraft", "marketData"],
        },
      },
    });

    if (!response.text) throw new Error("No response generated");
    return JSON.parse(response.text) as AutomationResult;
  } catch (error) {
    console.error("Gemini Automation Error:", error);
    throw error;
  }
};

export const chatWithCompanion = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "My neural link is experiencing interference. Please try again.";
  }
};