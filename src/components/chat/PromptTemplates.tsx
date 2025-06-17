'use client';

import { useState } from 'react';
import { MessageSquare, Code, Lightbulb, BookOpen, Briefcase, Heart, X } from 'lucide-react';

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: React.ReactNode;
  category: 'general' | 'coding' | 'creative' | 'learning' | 'business' | 'personal';
}

const promptTemplates: PromptTemplate[] = [
  {
    id: '1',
    title: 'Explain Like I\'m 5',
    description: 'Get simple explanations for complex topics',
    prompt: 'Can you explain [TOPIC] in simple terms that a 5-year-old would understand?',
    icon: <BookOpen className="w-4 h-4" />,
    category: 'learning',
  },
  {
    id: '2',
    title: 'Code Review',
    description: 'Get feedback on your code',
    prompt: 'Please review this code and suggest improvements:\n\n```\n[YOUR_CODE]\n```',
    icon: <Code className="w-4 h-4" />,
    category: 'coding',
  },
  {
    id: '3',
    title: 'Creative Writing',
    description: 'Generate creative content',
    prompt: 'Write a creative [TYPE] about [TOPIC] in the style of [STYLE]',
    icon: <Lightbulb className="w-4 h-4" />,
    category: 'creative',
  },
  {
    id: '4',
    title: 'Business Plan',
    description: 'Help with business planning',
    prompt: 'Help me create a business plan for [BUSINESS_IDEA]. Include market analysis, target audience, and revenue model.',
    icon: <Briefcase className="w-4 h-4" />,
    category: 'business',
  },
  {
    id: '5',
    title: 'Debug Helper',
    description: 'Help debug programming issues',
    prompt: 'I\'m having trouble with this code. The error is: [ERROR_MESSAGE]\n\nCode:\n```\n[YOUR_CODE]\n```\n\nCan you help me fix it?',
    icon: <Code className="w-4 h-4" />,
    category: 'coding',
  },
  {
    id: '6',
    title: 'Learning Path',
    description: 'Create a learning roadmap',
    prompt: 'Create a comprehensive learning path for [SKILL/TOPIC]. Include beginner to advanced topics, resources, and timeline.',
    icon: <BookOpen className="w-4 h-4" />,
    category: 'learning',
  },
  {
    id: '7',
    title: 'Personal Advice',
    description: 'Get thoughtful personal guidance',
    prompt: 'I need advice about [SITUATION]. Can you provide thoughtful guidance and different perspectives?',
    icon: <Heart className="w-4 h-4" />,
    category: 'personal',
  },
  {
    id: '8',
    title: 'Quick Summary',
    description: 'Summarize complex information',
    prompt: 'Please provide a concise summary of [TOPIC/CONTENT] highlighting the key points.',
    icon: <MessageSquare className="w-4 h-4" />,
    category: 'general',
  },
];

interface PromptTemplatesProps {
  onSelectTemplate: (prompt: string) => void;
  onClose: () => void;
}

export default function PromptTemplates({ onSelectTemplate, onClose }: PromptTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'general', name: 'General' },
    { id: 'coding', name: 'Coding' },
    { id: 'creative', name: 'Creative' },
    { id: 'learning', name: 'Learning' },
    { id: 'business', name: 'Business' },
    { id: 'personal', name: 'Personal' },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? promptTemplates 
    : promptTemplates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (template: PromptTemplate) => {
    onSelectTemplate(template.prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Prompt Templates
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Choose a template to get started with your conversation
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Category Filter */}
          <div className="p-6 pb-4 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {template.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {template.description}
                      </p>
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          template.category === 'coding' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          template.category === 'creative' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                          template.category === 'learning' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          template.category === 'business' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                          template.category === 'personal' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
