'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Download, Terminal, ExternalLink } from 'lucide-react';

interface AIStatusProps {
  onClose: () => void;
}

export default function AIStatus({ onClose }: AIStatusProps) {
  const [status, setStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [service, setService] = useState<string>('');
  const [model, setModel] = useState<string>('');

  useEffect(() => {
    checkAIStatus();
  }, []);

  const checkAIStatus = async () => {
    try {
      const response = await fetch('/api/ai/status');
      const data = await response.json();
      
      if (data.available) {
        setStatus('available');
        setService(data.service || 'AI Service');
        setModel(data.model || 'Unknown');
      } else {
        setStatus('unavailable');
        setService(data.service || 'AI Service');
      }
    } catch (error) {
      setStatus('unavailable');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Service Status
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Status */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {status === 'checking' && (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="text-gray-700 dark:text-gray-300">Checking AI service status...</span>
                </>
              )}
              {status === 'available' && (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 dark:text-green-400">{service} is connected and ready!</span>
                </>
              )}
              {status === 'unavailable' && (
                <>
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 dark:text-red-400">{service} is not available</span>
                </>
              )}
            </div>

            {/* Available Service */}
            {status === 'available' && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-400 mb-2">AI Service Details:</h3>
                <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Service: {service}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Model: {model}
                  </div>
                </div>
              </div>
            )}

            {/* Setup Instructions */}
            {status === 'unavailable' && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h3 className="font-medium text-red-800 dark:text-red-400 mb-3">
                    Google Gemini AI Not Available
                  </h3>
                  
                  <div className="space-y-3 text-sm text-red-700 dark:text-red-300">
                    <div className="flex items-start gap-3">
                      <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                      <div>
                        <p className="font-medium">Check API Key</p>
                        <p>Ensure your Gemini API key is correctly configured in environment variables</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                      <div>
                        <p className="font-medium">Check Internet Connection</p>
                        <p>Make sure you have a stable internet connection to reach Google's API</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                      <div>
                        <p className="font-medium">Verify API Quota</p>
                        <p>Check if you have remaining quota at <a href="https://makersuite.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline inline-flex items-center gap-1">
                          Google AI Studio <ExternalLink className="w-3 h-3" />
                        </a></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Fallback Mode:</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    The chatbot is currently running in fallback mode with pre-programmed responses. 
                    Once Gemini is available, you'll get AI-powered conversations.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={checkAIStatus}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Terminal className="w-4 h-4" />
                Check Status
              </button>
              
              <a
                href="https://makersuite.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Google AI Studio
              </a>
              
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
