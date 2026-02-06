import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { useAnswerQuestion } from './hooks/useQueries';
import { AppLinkSection } from './components/AppLinkSection';
// Note: If future publish/deploy UI is added, use domainValidation helpers from '@/lib/domainValidation'
// to validate domain input before attempting any publish/deploy action.

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: askQuestion, isPending } = useAnswerQuestion();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isPending) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const questionText = input.trim();
    setInput('');

    askQuestion(questionText, {
      onSuccess: (answer) => {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: answer,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      },
      onError: (error) => {
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      },
    });
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
    inputRef.current?.focus();
  };

  const examplePrompts = [
    "Who created you?",
    "Does it cost to use this service?",
    "Do you store user questions?",
    "Are you an Internet Computer canister?",
    "Where are your answers from?",
    "What is photosynthesis?",
    "What is the Pythagorean theorem?",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="relative border-b border-border bg-card/50 backdrop-blur-sm overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/assets/generated/ai-logic-hero.dim_1600x400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm p-1">
              <img 
                src="/assets/generated/ai-logic-logo.dim_512x512.png" 
                alt="AI Logic" 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">AI Logic</h1>
              <p className="text-xs text-muted-foreground">Your on-chain assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="container mx-auto flex flex-1 flex-col px-4 py-6">
        {/* App Link Section */}
        <AppLinkSection />

        <Card className="flex flex-1 flex-col overflow-hidden shadow-lg">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold">Welcome to AI Logic</h2>
                  <p className="mb-6 max-w-md text-sm text-muted-foreground">
                    I can answer questions about myself, this service, and science topics (in English). Try one of these:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                    {examplePrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleExampleClick(prompt)}
                        className="text-xs"
                      >
                        <Sparkles className="mr-1.5 h-3 w-3" />
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className="mt-1 block text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {message.role === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                        <User className="h-5 w-5 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {isPending && (
                <div className="flex gap-3 justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="max-w-[80%] rounded-2xl bg-muted px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border bg-card/50 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isPending}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isPending}
                size="icon"
                className="shrink-0"
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
