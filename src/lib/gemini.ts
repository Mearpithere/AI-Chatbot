import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// System prompt to give the AI a helpful personality
const SYSTEM_PROMPT = `You are a helpful, friendly, and knowledgeable AI assistant. You provide clear, concise, and accurate responses. You're conversational but professional, and you always try to be helpful while being honest about your limitations. Keep your responses focused and not too lengthy unless specifically asked for detailed explanations.`;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Check if Gemini API is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      if (!process.env.GEMINI_API_KEY) {
        console.log('Gemini API key not found in environment variables');
        return false;
      }

      // Test with a simple request
      const result = await this.model.generateContent('Hello');
      const response = result.response.text();
      return !!response;
    } catch (error) {
      console.error('Gemini not available:', error);
      return false;
    }
  }

  /**
   * Generate a response using Gemini
   */
  async generateResponse(messages: ChatMessage[]): Promise<string> {
    try {
      // Combine system prompt with user messages
      const conversationHistory = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      
      const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${conversationHistory}\n\nAssistant:`;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      
      if (!response.text()) {
        throw new Error('Empty response from Gemini');
      }
      
      return response.text();
    } catch (error) {
      console.error('Error generating response from Gemini:', error);
      throw new Error('Failed to generate response from Gemini');
    }
  }

  /**
   * Simple chat completion for single messages
   */
  async chat(userMessage: string, systemPrompt?: string): Promise<string> {
    const messages: ChatMessage[] = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    messages.push({ role: 'user', content: userMessage });

    return this.generateResponse(messages);
  }
}

// Export a default instance
export const geminiService = new GeminiService();

// Fallback responses when Gemini is not available
export const fallbackResponses = [
  "I'm currently unable to connect to the AI service. Please make sure your API key is configured correctly.",
  "The AI service is temporarily unavailable. Please check your internet connection and API configuration.",
  "I'm having trouble accessing the AI model. Please verify your Gemini API key is valid and has sufficient quota.",
];

export function getFallbackResponse(): string {
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}
