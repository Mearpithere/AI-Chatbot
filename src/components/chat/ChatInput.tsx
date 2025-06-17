'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import VoiceInput from './VoiceInput';

interface ChatInputProps {
  selectedPrompt?: string;
  onPromptUsed?: () => void;
}

export default function ChatInput({ selectedPrompt, onPromptUsed }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isLoading, navigateHistory, inputHistory } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    setHistoryIndex(-1);
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'ArrowUp' && input === '') {
      e.preventDefault();
      const historyMessage = navigateHistory('up');
      if (historyMessage) {
        setInput(historyMessage);
        setHistoryIndex(prev => Math.min(prev + 1, inputHistory.length - 1));
      }
    } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
      e.preventDefault();
      const historyMessage = navigateHistory('down');
      setInput(historyMessage);
      setHistoryIndex(prev => Math.max(prev - 1, -1));
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  useEffect(() => {
    if (selectedPrompt) {
      setInput(selectedPrompt);
      onPromptUsed?.();
      // Focus the textarea after setting the prompt
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [selectedPrompt, onPromptUsed]);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
            disabled={isLoading}
          />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <VoiceInput
              onTranscript={(text) => setInput(prev => prev + (prev ? ' ' : '') + text)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end mb-2"
          title="Send message"
        >
          <Send size={18} />
        </button>
      </form>

    </div>
  );
}
