"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SettingsIcon } from "lucide-react";

interface ApiKeysProps {
  openaiKey: string;
  geminiKey: string;
  onOpenAIKeyChange: (key: string) => void;
  onGeminiKeyChange: (key: string) => void;
  onSave: () => void;
}

export function ApiKeysDialog({ openaiKey, geminiKey, onOpenAIKeyChange, onGeminiKeyChange, onSave }: ApiKeysProps) {
  const [open, setOpen] = React.useState(false);
  const [localOpenAIKey, setLocalOpenAIKey] = React.useState(openaiKey);
  const [localGeminiKey, setLocalGeminiKey] = React.useState(geminiKey);

  const handleSave = () => {
    onOpenAIKeyChange(localOpenAIKey);
    onGeminiKeyChange(localGeminiKey);
    onSave();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Keys</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <Input
              id="openai-key"
              type="password"
              value={localOpenAIKey}
              onChange={(e) => setLocalOpenAIKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gemini-key">Gemini API Key</Label>
            <Input
              id="gemini-key"
              type="password"
              value={localGeminiKey}
              onChange={(e) => setLocalGeminiKey(e.target.value)}
              placeholder="AI..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
