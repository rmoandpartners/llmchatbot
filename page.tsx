import { ChatInterface } from '@/components/chat-interface';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <ModeToggle />
        </div>
        <ChatInterface />
      </div>
    </main>
  );
}
