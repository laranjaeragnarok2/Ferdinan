'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { conciergeFlow } from '@/ai/flows/concierge-flow';
import { Bot, Loader2, User } from 'lucide-react';

interface ConciergeContentProps {
  title: string;
  initialMessage: string;
  inputPlaceholder: string;
  sendButtonText: string;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function ConciergeContent({
  title,
  initialMessage,
  inputPlaceholder,
  sendButtonText,
}: ConciergeContentProps) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    console.log(`[CHAT_LOG] [USER] ${new Date().toISOString()}: ${input}`);
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await conciergeFlow({ query: input });
      console.log(`[CHAT_LOG] [AI] ${new Date().toISOString()}: ${response.response}`);
      const aiMessage: Message = { sender: 'ai', text: response.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling AI flow:', error);
      console.log(`[CHAT_LOG] [ERROR] ${new Date().toISOString()}: Error calling AI flow`);
      const errorMessage: Message = {
        sender: 'ai',
        text: 'Desculpe, estou com problemas para me conectar. Tente novamente em alguns instantes.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[450px] w-80 flex-col rounded-lg border bg-card text-card-foreground shadow-xl">
      <div className="border-b p-4">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''
                }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm ${message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                  }`}
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-lg bg-muted p-3 text-sm">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {sendButtonText}
          </Button>
        </form>
      </div>
    </div>
  );
}
