"use client";

import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export type ModelType = 'openai' | 'gemini';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <RadioGroup
          value={selectedModel}
          onValueChange={(value) => onModelChange(value as ModelType)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="openai" id="openai" />
            <Label htmlFor="openai" className="cursor-pointer">OpenAI</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gemini" id="gemini" />
            <Label htmlFor="gemini" className="cursor-pointer">Gemini</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
