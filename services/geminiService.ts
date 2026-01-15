
import { GoogleGenAI } from "@google/genai";
import { Locale } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generatePetDescription = async (petName: string, breed: string, locale: Locale = 'en'): Promise<string> => {
  const languageNames: Record<Locale, string> = {
    en: 'English',
    sv: 'Swedish',
    zh: 'Chinese'
  };

  // Return fallback if API key is not set
  if (!ai) {
    console.warn('Gemini API key not set, using fallback description');
    const fallbacks: Record<Locale, string> = {
      en: `${petName} is a wonderful ${breed} looking for a loving home.`,
      sv: `${petName} är en underbar ${breed} som letar efter ett kärleksfullt hem.`,
      zh: `${petName} 是一只可爱的 ${breed}，正在寻找一个温暖的家。`
    };
    return fallbacks[locale];
  }

  try {
    // Basic Text Task: Use gemini-3-flash-preview
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, heartwarming, and persuasive adoption description (approx 60 words) for a pet named ${petName} who is a ${breed}. Write the response in ${languageNames[locale]}. Focus on their personality and why someone would want to adopt them.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });
    // Use .text property directly (not a method)
    return response.text || "No description available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    const fallbacks: Record<Locale, string> = {
      en: "Buddy is a bundle of joy who loves fetch and long walks. Ready for a forever home.",
      sv: "Buddy är en glädjespridare som älskar att hämta bollar och långa promenader. Redo för ett för-alltid-hem.",
      zh: "小家伙是一个充满快乐的小伙伴，喜欢接球和长途散步。已经准备好去往永远的家。"
    };
    return fallbacks[locale];
  }
};
