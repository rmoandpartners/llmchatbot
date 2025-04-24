"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  model?: 'openai' | 'gemini';
}

export function ChatMessage({ message, isUser, timestamp, model }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-start gap-3 max-w-[80%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <Avatar className={cn(
          "h-8 w-8",
          isUser ? "bg-primary" : "bg-secondary"
        )}>
          <span className="text-xs">
            {isUser ? 'You' : model === 'openai' ? 'AI' : 'GM'}
          </span>
        </Avatar>
        <div>
          <Card className={cn(
            "rounded-lg",
            isUser ? "bg-primary text-primary-foreground" : "bg-card"
          )}>
            <CardContent className="p-3">
              <div className="whitespace-pre-wrap">{message}</div>
            </CardContent>
          </Card>
          <div className="text-xs text-muted-foreground mt-1 px-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {!isUser && model && <span className="ml-2">via {model === 'openai' ? 'OpenAI' : 'Gemini'}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
