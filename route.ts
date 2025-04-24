import { NextRequest, NextResponse } from 'next/server';

// Define the structure of the request body
interface ChatRequest {
  prompt: string;
  model: 'openai' | 'gemini';
  history: Array<{ role: 'user' | 'assistant', content: string }>;
  apiKey: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { prompt, model, history, apiKey }: ChatRequest = await request.json();

    // Validate request data
    if (!prompt || !model || !apiKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let response;

    if (model === 'openai') {
      response = await callOpenAI(prompt, history, apiKey);
    } else if (model === 'gemini') {
      response = await callGemini(prompt, history, apiKey);
    } else {
      return NextResponse.json(
        { error: 'Invalid model specified' },
        { status: 400 }
      );
    }

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

async function callOpenAI(prompt: string, history: Array<{ role: 'user' | 'assistant', content: string }>, apiKey: string) {
  const url = 'https://api.openai.com/v1/chat/completions';
  
  // Format the conversation history for OpenAI
  const messages = [
    ...history.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    { role: 'user', content: prompt }
  ];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(prompt: string, history: Array<{ role: 'user' | 'assistant', content: string }>, apiKey: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  // Format the conversation history for Gemini
  const formattedHistory = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
  
  // Add the current prompt
  formattedHistory.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
