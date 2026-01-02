'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

// Função para renderizar texto com links clicáveis
function renderMessageWithLinks(text: string) {
  // Regex para detectar URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80 font-semibold break-all"
        >
          Clique aqui para abrir o WhatsApp 💬
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
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
        text: 'Desculpe, estou com problemas técnicos no momento. Tente novamente em alguns instantes ou me chame direto no WhatsApp! 😊',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[450px] w-80 flex-col rounded-lg border bg-card text-card-foreground shadow-xl">
      <div className="border-b p-4 bg-gradient-to-r from-amber-500/10 to-orange-600/10">
        <h3 className="font-semibold text-base">{title}</h3>
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
                <Avatar className="h-8 w-8 bg-gradient-to-r from-amber-500 to-orange-600">
                  <AvatarFallback className="bg-transparent text-black">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm whitespace-pre-wrap leading-relaxed ${message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
                  }`}
              >
                {renderMessageWithLinks(message.text)}
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-transparent text-primary-foreground">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 bg-gradient-to-r from-amber-500 to-orange-600">
                <AvatarFallback className="bg-transparent text-black">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-lg bg-muted p-3 text-sm">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-muted/30">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold">
            {sendButtonText}
          </Button>
        </form>
      </div>
    </div>
  );
}
