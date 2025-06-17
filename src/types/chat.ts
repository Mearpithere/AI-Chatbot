export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
  isLoading?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  inputHistory: string[];
  currentHistoryIndex: number;
}

export interface ChatContextType extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  navigateHistory: (direction: 'up' | 'down') => string;
  exportChat: () => void;
}
