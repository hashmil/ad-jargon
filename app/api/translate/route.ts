import { NextRequest, NextResponse } from 'next/server';
import { TranslationRequest, TranslationResponse } from '@/types/translator';
import { translateRateLimiter, getClientIdentifier } from '@/lib/rate-limiter';
import { defaultValidator } from '@/lib/input-validator';

export const runtime = 'edge';

// Add CORS headers for better browser compatibility
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const timestamp = new Date().toISOString();
  
  // Log request for monitoring
  console.log(`[${timestamp}] Translation request from ${clientId}`);
  
  // Rate limiting check
  const rateLimitResult = translateRateLimiter.check(clientId);
  
  try {
    if (!rateLimitResult.allowed) {
      console.log(`[${timestamp}] Rate limit exceeded for ${clientId}`);
      return NextResponse.json({
        success: false,
        error: 'Too many requests. Please try again later.',
        translatedText: ''
      } as TranslationResponse, { 
        status: 429,
        headers: {
          ...corsHeaders,
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
        }
      });
    }

    const { text }: TranslationRequest = await request.json();

    // Input validation
    const validationResult = defaultValidator.validate(text);
    if (!validationResult.isValid) {
      console.log(`[${timestamp}] Invalid input from ${clientId}: ${validationResult.error}`);
      return NextResponse.json({
        success: false,
        error: validationResult.error || 'Invalid input',
        translatedText: ''
      } as TranslationResponse, { 
        status: 400,
        headers: corsHeaders
      });
    }

    const sanitizedText = validationResult.sanitizedText!;

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

"${sanitizedText}"

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
            } as TranslationResponse, {
              headers: corsHeaders
            });
          }
        }

        throw new Error(`AI API request failed with status: ${response.status}`);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.log(`[${timestamp}] AI translation attempt ${attempt} failed for ${clientId}:`, error instanceof Error ? error.message : error);
        
        if (attempt < maxRetries) {
          // Brief delay before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    // All retries failed
    console.log(`[${timestamp}] All translation attempts failed for ${clientId}`);
    throw lastError;
  } catch (error) {
    console.error(`[${timestamp}] Translation API error for ${clientId}:`, error instanceof Error ? error.message : error);
    
    return NextResponse.json({
      success: false,
      error: 'Service temporarily unavailable. Please try again later.',
      translatedText: ''
    } as TranslationResponse, { 
      status: 500,
      headers: {
        ...corsHeaders,
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString()
      }
    });
  }
}