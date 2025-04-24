"use client";

import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { ModelSelector, ModelType } from "@/components/model-selector";
import { ApiKeysDialog } from "@/components/api-keys-dialog";

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  model: ModelType;
}

export function ChatInterface() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [selectedModel, setSelectedModel] = React.useState<ModelType>('openai');
  const [openaiKey, setOpenaiKey] = React.useState('');
  const [geminiKey, setGeminiKey] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  // Load API keys and chat history from localStorage on mount
  React.useEffect(() => {
    const savedOpenaiKey = localStorage.getItem('openai-key');
    const savedGeminiKey = localStorage.getItem('gemini-key');
    const savedMessages = localStorage.getItem('chat-history');
    
    if (savedOpenaiKey) setOpenaiKey(savedOpenaiKey);
    if (savedGeminiKey) setGeminiKey(savedGeminiKey);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDateObjects);
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
      }
    }
  }, []);
  
  // Save chat history to localStorage when it changes
  React.useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-history', JSON.stringify(messages));
    }
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    // Check if API key is available
    const currentKey = selectedModel === 'openai' ? openaiKey : geminiKey;
    if (!currentKey) {
      alert(`Please enter your ${selectedModel === 'openai' ? 'OpenAI' : 'Gemini'} API key in settings`);
      return;
    }
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
      model: selectedModel
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // API call will be implemented in the next step
      // For now, simulate a response
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: `This is a simulated response from ${selectedModel}. API integration will be implemented in the next step.`,
          isUser: false,
          timestamp: new Date(),
          model: selectedModel
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };
  
  const handleSaveApiKeys = () => {
    localStorage.setItem('openai-key', openaiKey);
    localStorage.setItem('gemini-key', geminiKey);
  };
  
  const clearChatHistory = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
      localStorage.removeItem('chat-history');
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">LLM Chatbot</h1>
        <div className="flex gap-2">
          <ApiKeysDialog
            openaiKey={openaiKey}
            geminiKey={geminiKey}
            onOpenAIKeyChange={setOpenaiKey}
            onGeminiKeyChange={setGeminiKey}
            onSave={handleSaveApiKeys}
          />
          {messages.length > 0 && (
            <button 
              onClick={clearChatHistory}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear History
            </button>
          )}
        </div>
      </div>
      
      <ModelSelector 
        selectedModel={selectedModel} 
        onModelChange={setSelectedModel} 
      />
      
      <ScrollArea className="flex-1 mb-4" ref={scrollAreaRef}>
        <div className="p-1">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
                model={message.isUser ? undefined : message.model}
              />
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-secondary rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <ChatInput
        message={inputMessage}
        setMessage={setInputMessage}
        onSend={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
