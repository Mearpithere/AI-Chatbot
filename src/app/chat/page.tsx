'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ChatProvider } from '@/contexts/ChatContext';
import Header from '@/components/layout/Header';
import ChatInterface from '@/components/chat/ChatInterface';

function ChatPageContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  return (
    <div className="h-screen flex flex-col">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSelectPrompt={setSelectedPrompt}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - for future features like chat history */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <div className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Chat History
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Coming soon: Save and manage your chat conversations
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatInterface selectedPrompt={selectedPrompt} onPromptUsed={() => setSelectedPrompt('')} />
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <ChatProvider>
      <ChatPageContent />
    </ChatProvider>
  );
}
