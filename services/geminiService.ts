import { GoogleGenAI, Type } from "@google/genai";
import { AutomationResult } from "../types";

// Initialize Gemini Client
// We assume process.env.API_KEY is available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are Raynaters, the sentient AI navigator for the Raynaters Automation Agency website.
Your personality is: Futuristic, helpful, concise, and professional yet witty.
You are currently chatting with a visitor on the website.

KNOWLEDGE BASE:
1. HERO/PROJECTS: We build Sentient Sales_OS (Revenue Auto), Nexus Support_Bot (CX), Data Core_Link (Infra), Talent Scout_AI (HR), and Market Watch_Pro.
2. SERVICES: Business Automation, Data Intelligence, App Development, AI Consulting, Generative Support.
3. TESTIMONIALS: Clients like Acme Corp and TechFlow love us. We save 40+ hours/week for clients.
4. CONTACT: We offer a free strategy call. We text within 15 minutes.

RULES:
- Keep answers short (under 50 words) unless asked for detail.
- If asked about services, specificy which one interests them.
- Always encourage booking a strategy call for specific implementations.
- You can explain the "Intelligence Archives" (the portfolio items) in detail.
`;

/**
 * Generates an Agency Solution Proposal based on a client's problem.
 */
export const generateBusinessAutomation = async (
  goal: string
): Promise<AutomationResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a Senior Solutions Architect at a premium AI Automation Agency. 
      A potential client has described their manual process or pain point: "${goal}".
      
      Your job is to propose a technical automation solution.
      
      I need three distinct outputs:
      1. A "Proposed Solution" summarizing the tools and logic we would build (e.g., "We will build a Make.com scenario that connects Typeform to Slack...").
      2. A "Sample Output" text. If it's an outreach automation, write the email. If it's a chatbot, write a sample conversation. If it's data entry, show a sample JSON log.
      3. 5 hypothetical data points representing "Hours Saved" or "ROI" over 5 months for a chart.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategy: {
              type: Type.STRING,
              description: "The technical solution architecture proposed by the agency.",
            },
            emailDraft: {
              type: Type.STRING,
              description: "A sample output of the automation (email, chat log, or data).",
            },
            marketData: {
              type: Type.ARRAY,
              description: "Hypothetical ROI/Efficiency data for a chart.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Month name (e.g., Month 1)" },
                  value: { type: Type.NUMBER, description: "Metric value (e.g. Hours Saved)" },
                },
                required: ["name", "value"],
              },
            },
          },
          required: ["strategy", "emailDraft", "marketData"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response generated");
    }

    const result = JSON.parse(response.text) as AutomationResult;
    return result;
  } catch (error) {
    console.error("Gemini Automation Error:", error);
    throw error;
  }
};

/**
 * Chat with the Mizo AI Companion
 */
export const chatWithCompanion = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
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