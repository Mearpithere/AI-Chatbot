'use client';

import { useState, useMemo } from 'react';
import { Search, X, User, Bot } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { formatTimestamp } from '@/lib/utils';

interface MessageSearchProps {
  onClose: () => void;
}

export default function MessageSearch({ onClose }: MessageSearchProps) {
  const { messages } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSender, setSelectedSender] = useState<'all' | 'user' | 'bot'>('all');

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim() && selectedSender === 'all') {
      return messages;
    }

    return messages.filter(message => {
      const matchesQuery = searchQuery.trim() === '' || 
        message.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSender = selectedSender === 'all' || message.sender === selectedSender;
      
      return matchesQuery && matchesSender;
    });
  }, [messages, searchQuery, selectedSender]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Search Messages
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSender('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedSender === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Messages
            </button>
            <button
              onClick={() => setSelectedSender('user')}
              className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
                selectedSender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <User className="w-3 h-3" />
              Your Messages
            </button>
            <button
              onClick={() => setSelectedSender('bot')}
              className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
                selectedSender === 'bot'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Bot className="w-3 h-3" />
              AI Responses
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="p-6">
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''} found
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery.trim() ? 'No messages found matching your search.' : 'Start typing to search messages.'}
                </p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {message.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {message.sender === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                        {highlightText(message.content, searchQuery)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
