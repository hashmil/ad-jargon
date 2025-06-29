export interface TranslationRequest {
  text: string;
}

export interface TranslationResponse {
  translatedText: string;
  success: boolean;
  error?: string;
  method?: 'ai' | 'fallback';
}

export interface JargonMap {
  [key: string]: string;
}

export interface TranslationState {
  normalText: string;
  agencyText: string;
  isLoading: boolean;
  error?: string;
}