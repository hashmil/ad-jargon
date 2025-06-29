import { NextRequest, NextResponse } from 'next/server';
import { TranslationRequest, TranslationResponse } from '@/types/translator';
import { fallbackTranslation } from '@/lib/translator';

export const runtime = 'edge';

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
      // Try AI translation first using direct fetch
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://ad-jargon-translator.pages.dev',
          'X-Title': 'Ad Agency Jargon Translator',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-small-3.2-24b-instruct:free',
          messages: [
            {
              role: 'user',
              content: `Transform this normal business statement into hilariously over-the-top advertising agency jargon. Make it as buzzword-heavy and pretentious as possible, using terms like "synergise," "ideate," "paradigm," "holistic," "leverage," "circle back," "move the needle," etc. The goal is to satirise corporate speak. Use British English spelling throughout (e.g., "optimise," "realise," "colour," "centre"):

"${text.trim()}"

Respond with ONLY the translated jargon version, no explanation.`
            }
          ],
          max_tokens: 200,
          temperature: 0.8
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiTranslation = data.choices?.[0]?.message?.content?.trim();
        
        if (aiTranslation && aiTranslation.length > 0) {
          return NextResponse.json({
            success: true,
            translatedText: aiTranslation,
            method: 'ai'
          } as TranslationResponse);
        }
      }

      throw new Error('AI API request failed');
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