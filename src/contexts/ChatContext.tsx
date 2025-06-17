'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Message, ChatState, ChatContextType } from '@/types/chat';
import { generateId } from '@/lib/utils';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; content: string; isLoading?: boolean } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_CHAT' }
  | { type: 'ADD_TO_HISTORY'; payload: string };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id
            ? { ...msg, content: action.payload.content, isLoading: action.payload.isLoading ?? false }
            : msg
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_CHAT':
      return {
        ...state,
        messages: [],
        error: null,
        isLoading: false,
      };
    case 'ADD_TO_HISTORY':
      const newHistory = [action.payload, ...state.inputHistory.filter(h => h !== action.payload)].slice(0, 50);
      return {
        ...state,
        inputHistory: newHistory,
        currentHistoryIndex: -1,
      };
    default:
      return state;
  }
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    isLoading: false,
    error: null,
    inputHistory: [],
    currentHistoryIndex: -1,
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: content.trim(),
      sender: 'user',
      timestamp: Date.now(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'ADD_TO_HISTORY', payload: content.trim() });

    // Add loading bot message
    const botMessageId = generateId();
    const loadingBotMessage: Message = {
      id: botMessageId,
      content: '',
      sender: 'bot',
      timestamp: Date.now(),
      isLoading: true,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: loadingBotMessage });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: { id: botMessageId, content: data.response, isLoading: false },
      });
    } catch (error) {
      console.error('Chat error:', error);
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: { id: botMessageId, content: 'Sorry, I encountered an error. Please try again.', isLoading: false },
      });
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send message' });
    }
  }, []);

  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' });
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down'): string => {
    if (state.inputHistory.length === 0) return '';

    let newIndex = state.currentHistoryIndex;
    if (direction === 'up') {
      newIndex = Math.min(newIndex + 1, state.inputHistory.length - 1);
    } else {
      newIndex = Math.max(newIndex - 1, -1);
    }

    return newIndex >= 0 ? state.inputHistory[newIndex] : '';
  }, [state.inputHistory, state.currentHistoryIndex]);

  const exportChat = useCallback(() => {
    const chatData = {
      messages: state.messages,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.messages]);

  return (
    <ChatContext.Provider value={{
      ...state,
      sendMessage,
      clearChat,
      navigateHistory,
      exportChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
