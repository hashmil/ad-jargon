'use client';

import React, { useState } from 'react';
import { ArrowRight, Zap, Coffee, Lightbulb } from 'lucide-react';
import { TranslationState } from '@/types/translator';
import { examplePhrases } from '@/lib/translator';

export default function Home() {
  const [state, setState] = useState<TranslationState>({
    normalText: '',
    agencyText: '',
    isLoading: false,
    error: undefined
  });

  const translateToAgencySpeak = async (text: string) => {
    if (!text.trim()) {
      setState(prev => ({ ...prev, agencyText: '', error: undefined }));
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      agencyText: '🤖 Synergising your ideation through our AI-powered disruption engine...', 
      error: undefined 
    }));

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setState(prev => ({ 
          ...prev, 
          agencyText: data.translatedText, 
          isLoading: false 
        }));
      } else {
        throw new Error(data.error || 'Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setState(prev => ({ 
        ...prev, 
        agencyText: '', 
        isLoading: false,
        error: 'Translation failed. Please try again.' 
      }));
    }
  };

  const handleExampleClick = (example: string) => {
    setState(prev => ({ ...prev, normalText: example, agencyText: '', error: undefined }));
  };

  const handleInputChange = (text: string) => {
    setState(prev => ({ ...prev, normalText: text }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="text-yellow-400 w-8 h-8" />
            <h1 className="text-4xl font-bold text-white">Ad Agency Jargon Translator</h1>
            <Coffee className="text-yellow-400 w-8 h-8" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform normal human speech into mind-blowing agency buzzword brilliance! 
            Perfect for impressing clients and confusing colleagues.
          </p>
        </div>

        {/* Main Translator */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 mb-8">
            {/* Input Box */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="text-blue-400 w-5 h-5" />
                <h2 className="text-xl font-semibold text-white">Normal Human Speech</h2>
              </div>
              <textarea
                value={state.normalText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type something normal like 'Let's brainstorm some ideas'..."
                className="w-full h-32 p-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <button
                onClick={() => translateToAgencySpeak(state.normalText)}
                disabled={!state.normalText.trim() || state.isLoading}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                {state.isLoading ? 'Ideating...' : 'Generate Agency Magic'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Output Box */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-yellow-400 w-5 h-5" />
                <h2 className="text-xl font-semibold text-white">Agency Buzzword Magic</h2>
              </div>
              <div className="w-full h-40 p-4 bg-black/20 border border-purple-400/30 rounded-lg text-white overflow-y-auto">
                {state.error ? (
                  <span className="text-red-400">{state.error}</span>
                ) : state.agencyText ? (
                  state.agencyText
                ) : (
                  <span className="text-gray-400 italic">
                    Click &quot;Generate Agency Magic&quot; to transform your text into synergistic ideation...
                  </span>
                )}
              </div>
            </div>
          </div>


          {/* Examples */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Try These Examples:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examplePhrases.map((phrase, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(phrase)}
                  className="text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-gray-300 hover:text-white transition-all duration-200"
                >
                  &quot;{phrase}&quot;
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Warning: Prolonged exposure to agency jargon may cause involuntary eye-rolling and the urge to &quot;circle back offline.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}