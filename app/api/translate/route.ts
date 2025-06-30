import { NextRequest, NextResponse } from 'next/server';
import { TranslationRequest, TranslationResponse } from '@/types/translator';

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

    // Retry logic for OpenRouter API
    const maxRetries = 2;
    let lastError: Error = new Error('Unknown error');
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
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

Respond with ONLY the translated jargon version, no explanation or surrounding quotes.`
              }
            ],
            max_tokens: 200,
            temperature: 0.8
          })
        });

        if (response.ok) {
          const data = await response.json();
          let aiTranslation = data.choices?.[0]?.message?.content?.trim();
          
          if (aiTranslation && aiTranslation.length > 0) {
            // Remove surrounding quotes if present
            aiTranslation = aiTranslation.replace(/^[""]|[""]$/g, '').replace(/^["']|["']$/g, '');
            
            return NextResponse.json({
              success: true,
              translatedText: aiTranslation,
              method: 'ai'
            } as TranslationResponse);
          }
        }

        throw new Error(`AI API request failed with status: ${response.status}`);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.log(`AI translation attempt ${attempt} failed:`, error);
        
        if (attempt < maxRetries) {
          // Brief delay before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    // All retries failed
    throw lastError;
  } catch (error) {
    console.error('Translation API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to translate text',
      translatedText: ''
    } as TranslationResponse, { status: 500 });
  }
}