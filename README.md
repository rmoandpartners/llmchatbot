# Personal LLM Chatbot Interface

A modern, minimalist chat interface for interacting with OpenAI and Gemini language models using your own API keys.

## Features

- Clean, modern UI built with Next.js, Tailwind CSS, and Shadcn UI components
- Support for both OpenAI and Gemini models
- Secure API key management (stored only in browser local storage)
- Conversation history saving
- Dark/light theme support
- Fully responsive design for all device sizes

## Application Structure

```
src/
├── app/                  # Next.js pages and API routes
│   ├── api/              # Backend API endpoints
│   │   └── chat/         # Chat API endpoint
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main page component
├── components/           # React components
│   ├── ui/               # Shadcn UI components
│   ├── api-keys-dialog.tsx  # API key management dialog
│   ├── chat-input.tsx    # Chat input component
│   ├── chat-interface.tsx # Main chat interface
│   ├── chat-message.tsx  # Individual message component
│   ├── mode-toggle.tsx   # Theme toggle component
│   ├── model-selector.tsx # Model selection component
│   └── providers.tsx     # Theme provider
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm

### Installation

1. Clone the repository or extract the provided zip file
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Option 1: Deploy from GitHub

1. Push the code to a GitHub repository
2. Connect the repository to Vercel
3. Follow the Vercel deployment steps

### Option 2: Deploy from Local Files

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy the application:
   ```bash
   vercel
   ```

### Option 3: Manual Upload

1. Go to [Vercel](https://vercel.com)
2. Create a new project
3. Choose "Upload" deployment option
4. Upload the provided zip file

## Usage

1. Open the application in your browser
2. Click the settings icon to enter your OpenAI and Gemini API keys
3. Select the model you want to use (OpenAI or Gemini)
4. Type your message and press Enter or click the Send button
5. View the AI's response in the chat interface

## API Integration

The application integrates with:

- OpenAI API (gpt-3.5-turbo model)
- Google Gemini API (gemini-pro model)

You'll need to provide your own API keys for these services.

## Local Storage

The application stores the following information in your browser's local storage:

- OpenAI API key
- Gemini API key
- Chat conversation history

No data is sent to any server except when making API calls to OpenAI or Gemini.

## Future Enhancements

Potential future improvements:

- Streaming responses for a more interactive feel
- Model-specific parameters (temperature, max tokens) in the UI
- Token usage/cost estimates
- Additional LLM options
- File upload capabilities

## License

This project is licensed under the MIT License.
