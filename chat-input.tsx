"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function ChatInput({ message, setMessage, onSend, isLoading }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className="flex items-end gap-2 w-full">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="resize-none min-h-[60px]"
        disabled={isLoading}
      />
      <Button 
        onClick={onSend} 
        disabled={!message.trim() || isLoading}
        className="h-[60px] px-4"
      >
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}
