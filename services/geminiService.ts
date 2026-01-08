
import { GoogleGenAI, Type } from "@google/genai";
import { MonitorData } from "../types";

export const fetchMonitoringData = async (): Promise<MonitorData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview'; 
  
  const SEBIN_LAT = 10.4947;
  const SEBIN_LNG = -66.8831;

  const prompt = `
    Analyze current activity for "Torre SEBIN" (Servicio Bolivariano de Inteligencia Nacional) at Plaza Venezuela, Caracas (Lat: ${SEBIN_LAT}, Lng: ${SEBIN_LNG}).
    Also monitor activity at 3 major nearby food spots (like Pizza Zeina, 19 de Abril, or others within 500m).
    
    For each location, provide:
    1. A status: 'Normal', 'Busy', 'Spike', or 'Low'.
    2. A spike percentage (0-150%).
    3. A brief description of the current vibe (e.g., "Standard patrol patterns observed").
    4. An array of 24 hourly data points (0-100) for "Popular Times", marking the current hour.
    
    Return the data in strict JSON format. Use Google Search to find recent mentions of traffic or activity in the area if possible.
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          primary: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              status: { type: Type.STRING },
              spikePercentage: { type: Type.NUMBER },
              description: { type: Type.STRING },
              popularTimes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    hour: { type: Type.STRING },
                    value: { type: Type.NUMBER },
                    isLive: { type: Type.BOOLEAN }
                  }
                }
              }
            },
            required: ["name", "status", "spikePercentage", "description", "popularTimes"]
          },
          nearby: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                distance: { type: Type.STRING },
                status: { type: Type.STRING },
                spikePercentage: { type: Type.NUMBER },
                description: { type: Type.STRING },
                popularTimes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      hour: { type: Type.STRING },
                      value: { type: Type.NUMBER },
                      isLive: { type: Type.BOOLEAN }
                    }
                  }
                }
              },
              required: ["name", "status", "description", "popularTimes"]
            }
          }
        },
        required: ["primary", "nearby"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return {
      ...data,
      timestamp: new Date().toLocaleTimeString()
    };
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Target communication failed. Retrying signal...");
  }
};
