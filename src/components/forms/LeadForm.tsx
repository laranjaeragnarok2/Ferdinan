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
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitLead, formSchema, type LeadFormData } from '@/app/actions/submitLead';

const challenges = [
  "Processos", "Vendas", "Gestão", "Marketing", "Suporte", "Recursos Humanos", 
  "Consultoria", "Parcerias", "Agentes de IA", "Desenvolvimento de Produtos", 
  "Imobiliária", "Finanças", "Compras", "Logística", "Desenvolvimento de Software", 
  "Desenvolvimento de Aplicativos", "Desenvolvimento de Websites", 
  "Desenvolvimento de APIs", "Linhas de Crédito", "Outros"
];

const referrals = ["Facebook", "Instagram", "LinkedIn", "Google", "Outros"];

const experiences = ["Iniciante", "Intermediário", "Avançado"];

const countryCodes = [
  { code: "+55", label: "Brasil (+55)" },
  { code: "+1", label: "EUA/Canada (+1)" },
  { code: "+351", label: "Portugal (+351)" },
  { code: "+44", label: "Reino Unido (+44)" },
  { code: "+34", label: "Espanha (+34)" },
  { code: "+49", label: "Alemanha (+49)" },
  { code: "+81", label: "Japão (+81)" },
  { code: "+86", label: "China (+86)" }
];

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+55',
      phone: '',
      challenge: '',
      referral: '',
      experience: '',
      acceptNotifications: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await submitLead(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Enviado com Sucesso',
        description: 'Obrigado! Entraremos em contato em breve.',
      });
      form.reset();

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} className="bg-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu sobrenome" {...field} className="bg-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço de Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@exemplo.com" {...field} className="bg-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Código" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countryCodes.map(c => (
                        <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Telefone / WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} className="bg-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="challenge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qual seu maior desafio hoje?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-input">
                      <SelectValue placeholder="Selecione seu maior desafio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {challenges.map(c => (
                      <SelectItem key={c} value={c.toLowerCase().replace(/\s+/g, '-')}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="referral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Como nos encontrou?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {referrals.map(r => (
                        <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível de Experiência</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Selecione seu nível" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experiences.map(e => (
                        <SelectItem key={e} value={e.toLowerCase()}>{e}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="acceptNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white/5 border-white/10">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Aceito receber notificações e comunicações estratégicas.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-lg py-6 btn-gradient border-amber-500 hover:brightness-110"
          >
            {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Solicitar Análise Estratégica
          </Button>
        </form>
      </Form>
    </div>
  );
}
