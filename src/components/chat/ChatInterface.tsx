'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { MessageSquare } from 'lucide-react';

interface ChatInterfaceProps {
  selectedPrompt?: string;
  onPromptUsed?: () => void;
}

export default function ChatInterface({ selectedPrompt, onPromptUsed }: ChatInterfaceProps) {
  const { messages, error } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-6 mb-4">
              <MessageSquare className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Welcome to ChatBot
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Start a conversation by typing a message below. I&apos;m powered by Google Gemini AI for intelligent responses!
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 Try asking: &quot;What can you help me with?&quot;
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🚀 Or say: &quot;Tell me about technology&quot;
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🤖 Click the bot icon above to check AI status
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ⚡ Powered by Google Gemini AI
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {error && (
          <div className="max-w-4xl mx-auto mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput selectedPrompt={selectedPrompt} onPromptUsed={onPromptUsed} />
    </div>
  );
}
