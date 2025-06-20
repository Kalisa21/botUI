import React, { useEffect, useRef } from 'react';
import { Heart, Stethoscope } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ErrorMessage } from './components/ErrorMessage';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, sendMessage, clearError } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleRetry = () => {
    clearError();
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: "url('/public/imgg.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }}
>

      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Stethoscope className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Healthcare Chatbot</h1>
                <p className="text-sm text-gray-600">Your AI medical assistant</p>
              </div>
            </div>
            <Heart className="text-red-500" size={24} />
          </div>
        </header>

        {/* Welcome Message */}
        {messages.length === 0 && !isLoading && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center max-w-md">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="text-blue-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Healthcare Chatbot</h2>
              <p className="text-gray-600 mb-6">
                I'm here to help answer your healthcare questions. Ask me about symptoms, treatments, medical conditions, or general health advice.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-black-800 text-sm font-medium">
                   Simply type in the text box field below and i will respond to any of your health care question.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && <LoadingIndicator />}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />

        {/* Footer Note */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Ask about symptoms, treatments, or medical conditions! 
            <span className="font-medium"> .</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;