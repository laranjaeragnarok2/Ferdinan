'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitLead, type LeadFormData } from '@/app/actions/submitLead';

// Define a interface para a função gtag no objeto window
declare global {
  interface Window {
    gtag: (
      type: 'event',
      eventName: string,
      eventParams: { [key: string]: any }
    ) => void;
  }
}

const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  whatsapp: z.string().min(10, 'Por favor, insira um número de WhatsApp válido.'),
  challenge: z.string().nonempty('Por favor, selecione um desafio.'),
});

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      challenge: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // @ts-ignore
    const result = await submitLead(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Enviado com Sucesso',
        description: 'Obrigado! Entraremos em contato em breve.',
      });
      form.reset();

      // Dispara o evento de conversão do Google Ads
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-16899626920/4cr8COPKjaQaEKivr_o-',
          value: 1.0,
          currency: 'BRL',
          transaction_id: '',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Falha no Envio',
        description: 'Algo deu errado. Por favor, tente novamente.',
      });
    }
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-2xl bg-card border-border">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: João da Silva"
                        {...field}
                        className="bg-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço de Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ex: joao.silva@exemplo.com"
                        {...field}
                        className="bg-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: (11) 99999-9999"
                      {...field}
                      className="bg-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual seu maior desafio hoje?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Selecione seu maior desafio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="gestao">Gestão</SelectItem>
                      <SelectItem value="processos">Processos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-lg py-6 btn-gradient border-amber-500 hover:brightness-110"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              )}
              Solicitar Análise do Meu Negócio
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
