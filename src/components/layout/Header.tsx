'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { LogOut, Trash2, Download, Menu, Bot, Search, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import AIStatus from '@/components/chat/AIStatus';
import MessageSearch from '@/components/chat/MessageSearch';
import PromptTemplates from '@/components/chat/PromptTemplates';

interface HeaderProps {
  onToggleSidebar: () => void;
  onSelectPrompt?: (prompt: string) => void;
}

export default function Header({ onToggleSidebar, onSelectPrompt }: HeaderProps) {
  const { user, logout } = useAuth();
  const { clearChat, exportChat, messages } = useChat();
  const [showAIStatus, setShowAIStatus] = useState(false);
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [showPromptTemplates, setShowPromptTemplates] = useState(false);

  useEffect(() => {
    // Initialize dark mode based on system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);



  const handleClearChat = () => {
    if (messages.length > 0 && confirm('Are you sure you want to clear all messages?')) {
      clearChat();
    }
  };

  const handleExportChat = () => {
    if (messages.length > 0) {
      exportChat();
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            ChatBot
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Prompt Templates */}
          <button
            onClick={() => setShowPromptTemplates(true)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="Prompt Templates"
          >
            <MessageSquare size={18} />
          </button>

          {/* Message Search */}
          <button
            onClick={() => setShowMessageSearch(true)}
            disabled={messages.length === 0}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Search Messages"
          >
            <Search size={18} />
          </button>

          {/* AI Status */}
          <button
            onClick={() => setShowAIStatus(true)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="AI Service Status"
          >
            <Bot size={18} />
          </button>

          {/* Export Chat */}
          <button
            onClick={handleExportChat}
            disabled={messages.length === 0}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export chat"
          >
            <Download size={18} />
          </button>

          {/* Clear Chat */}
          <button
            onClick={handleClearChat}
            disabled={messages.length === 0}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear chat"
          >
            <Trash2 size={18} />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAIStatus && (
        <AIStatus onClose={() => setShowAIStatus(false)} />
      )}

      {showMessageSearch && (
        <MessageSearch onClose={() => setShowMessageSearch(false)} />
      )}

      {showPromptTemplates && (
        <PromptTemplates
          onSelectTemplate={(prompt) => {
            onSelectPrompt?.(prompt);
            setShowPromptTemplates(false);
          }}
          onClose={() => setShowPromptTemplates(false)}
        />
      )}
    </header>
  );
}
