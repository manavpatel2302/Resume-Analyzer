
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResultType } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    atsScore: {
      type: Type.NUMBER,
      description: "A score from 0 to 100 representing the resume's compatibility with the job description for an ATS."
    },
    whatIsWrong: {
      type: Type.ARRAY,
      description: "A list of 3-5 constructive criticisms and areas for improvement in the resume. This could include formatting issues, unclear statements, or weak action verbs. Frame these as helpful suggestions.",
      items: { type: Type.STRING }
    },
    whatIsMissing: {
      type: Type.ARRAY,
      description: "A list of 3-5 important keywords, skills, or qualifications from the job description that are missing from the resume.",
      items: { type: Type.STRING }
    }
  },
  required: ["atsScore", "whatIsWrong", "whatIsMissing"]
};

export const analyzeResume = async (
  resumeBase64: string,
  mimeType: string,
  jobDescription: string
): Promise<AnalysisResultType> => {
  try {
    const prompt = `
      Please act as an expert career coach and analyze the attached resume against the following job description. 
      Evaluate how well the resume is tailored to the job, identify missing keywords, and suggest improvements. 
      Provide an ATS compatibility score out of 100.
      
      Job Description:
      ---
      ${jobDescription}
      ---
      
      Provide your analysis in the specified JSON format. Ensure the feedback is constructive and actionable.
    `;

    const resumePart = {
      inlineData: {
        data: resumeBase64,
        mimeType: mimeType
      }
    };

    const textPart = {
      text: prompt
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [resumePart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    const result = JSON.parse(responseText) as AnalysisResultType;
    return result;

  } catch (error) {
    console.error("Error analyzing resume with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while analyzing the resume.");
  }
};
