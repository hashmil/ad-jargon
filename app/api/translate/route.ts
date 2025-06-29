import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { TranslationRequest, TranslationResponse } from '@/types/translator';
import { fallbackTranslation } from '@/lib/translator';

export const runtime = 'edge';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://ad-jargon-translator.vercel.app",
    "X-Title": "Ad Agency Jargon Translator",
  },
});

export async function POST(request: NextRequest) {
  try {
    const { text }: TranslationRequest = await request.json();

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Text is required',
        translatedText: ''
      } as TranslationResponse, { status: 400 });
    }

    try {
      // Try AI translation first
      const completion = await openai.chat.completions.create({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          {
            role: "user",
            content: `Transform this normal business statement into hilariously over-the-top advertising agency jargon. Make it as buzzword-heavy and pretentious as possible, using terms like "synergise," "ideate," "paradigm," "holistic," "leverage," "circle back," "move the needle," etc. The goal is to satirise corporate speak. Use British English spelling throughout (e.g., "optimise," "realise," "colour," "centre"):

"${text.trim()}"

Respond with ONLY the translated jargon version, no explanation.`
          }
        ],
        max_tokens: 200,
        temperature: 0.8
      });

      const aiTranslation = completion.choices[0]?.message?.content?.trim();
      
      if (aiTranslation && aiTranslation.length > 0) {
        return NextResponse.json({
          success: true,
          translatedText: aiTranslation,
          method: 'ai'
        } as TranslationResponse);
      }

      throw new Error('Empty AI response');
    } catch (aiError) {
      console.log('AI translation failed, using fallback:', aiError);
      
      // Fallback to rule-based translation
      const fallbackResult = fallbackTranslation(text.trim());
      
      return NextResponse.json({
        success: true,
        translatedText: fallbackResult,
        method: 'fallback'
      } as TranslationResponse);
    }
  } catch (error) {
    console.error('Translation API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to translate text',
      translatedText: ''
    } as TranslationResponse, { status: 500 });
  }
}