"use client";

import React, { useState } from "react";
import { Zap } from "lucide-react";
import { TranslationState } from "@/types/translator";
import { examplePhrases } from "@/lib/translator";

export default function Home() {
  const [state, setState] = useState<TranslationState>({
    normalText: "",
    agencyText: "",
    isLoading: false,
    error: undefined,
  });

  const translateToAgencySpeak = async (text: string) => {
    if (!text.trim()) {
      setState((prev) => ({ ...prev, agencyText: "", error: undefined }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      agencyText:
        "🤖 Synergising your ideation through our AI-powered disruption engine...",
      error: undefined,
    }));

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setState((prev) => ({
          ...prev,
          agencyText: data.translatedText,
          isLoading: false,
        }));
      } else {
        throw new Error(data.error || "Translation failed");
      }
    } catch (error) {
      console.error("Translation error:", error);
      setState((prev) => ({
        ...prev,
        agencyText: "",
        isLoading: false,
        error: "Translation failed. Please try again.",
      }));
    }
  };

  const handleExampleClick = (example: string) => {
    setState((prev) => ({
      ...prev,
      normalText: example,
      agencyText: "",
      error: undefined,
    }));
  };

  const handleInputChange = (text: string) => {
    setState((prev) => ({ ...prev, normalText: text }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#082026] via-[#134D80] to-[#97DDE8] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-3 leading-tight">
            Ad Agency Jargon Translator
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Transform normal speech into agency buzzword brilliance
          </p>
        </div>
        
        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center">

          {/* Main Translator */}
          <div className="max-w-7xl mx-auto">
          {/* Side-by-side Translator */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Input Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white font-serif">
                  Normal Speech
                </h2>
                <button
                  onClick={() => translateToAgencySpeak(state.normalText)}
                  disabled={!state.normalText.trim() || state.isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-[#FF5938] to-[#FFD1E2] hover:from-[#FF5938] hover:to-[#FF5938] disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4" />
                  {state.isLoading ? "Translating..." : "Translate"}
                </button>
              </div>
              <textarea
                value={state.normalText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type something normal like 'Let's brainstorm some ideas'..."
                className="w-full h-48 p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 resize-none focus:outline-none focus:border-[#FFD1E2] transition-all duration-300 text-base"
              />
              
              {/* Quick Examples */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-white/80 mb-2">Quick Examples:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {examplePhrases.map((phrase, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(phrase)}
                      className="text-xs px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white/80 hover:text-white transition-all duration-200 text-left">
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 flex flex-col">
              <h2 className="text-xl font-semibold text-white font-serif mb-4">
                Agency Buzzword Magic
              </h2>
              <div className="w-full flex-1 min-h-[300px] p-4 bg-gradient-to-br from-[#004A4A]/20 to-[#134D80]/20 border border-white/20 rounded-xl text-white overflow-y-auto">
                {state.error ? (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-red-300">{state.error}</span>
                  </div>
                ) : state.agencyText ? (
                  <p className="text-base leading-relaxed">{state.agencyText}</p>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <span className="text-white/50 italic text-sm">
                      Your agency buzzword transformation will appear here...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>


            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-white/60 text-sm italic font-serif">
                Warning: Prolonged exposure to agency jargon may cause involuntary eye-rolling and the urge to &quot;circle back offline.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
