import { NextRequest, NextResponse } from 'next/server';
import { geminiService, getFallbackResponse } from '@/lib/gemini';

// System prompt to give the AI a helpful personality
const SYSTEM_PROMPT = `You are a helpful, friendly, and knowledgeable AI assistant. You provide clear, concise, and accurate responses. You're conversational but professional, and you always try to be helpful while being honest about your limitations. Keep your responses focused and not too lengthy unless specifically asked for detailed explanations.`;

// Fallback responses for when Ollama is not available
function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm your AI assistant powered by Google Gemini. How can I help you today?";
  }

  if (lowerMessage.includes('how are you')) {
    return "I'm doing well, thank you for asking! I'm here and ready to help with any questions or tasks you have.";
  }

  if (lowerMessage.includes('weather')) {
    return "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for current conditions in your area.";
  }

  if (lowerMessage.includes('time')) {
    return `The current time is ${new Date().toLocaleTimeString()}. Is there something time-sensitive I can help you with?`;
  }

  if (lowerMessage.includes('help')) {
    return "I'm here to help! You can ask me questions, have conversations, or request assistance with various topics. I'm powered by Google Gemini AI for intelligent responses.";
  }

  if (lowerMessage.includes('ai') || lowerMessage.includes('gemini')) {
    return "I'm powered by Google Gemini AI! If you're seeing this message, it means the AI service might be temporarily unavailable. Please check your API configuration.";
  }

  return getFallbackResponse() + " I'm powered by Google Gemini AI - if you're seeing this, there might be a temporary connection issue.";
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let response: string;

    try {
      // Check if Gemini is available
      const isGeminiAvailable = await geminiService.isAvailable();

      if (isGeminiAvailable) {
        // Generate response using Gemini
        response = await geminiService.chat(message, SYSTEM_PROMPT);
      } else {
        // Gemini not available, use fallback
        response = generateFallbackResponse(message);
      }
    } catch (geminiError) {
      console.error('Gemini error:', geminiError);
      response = generateFallbackResponse(message);
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
