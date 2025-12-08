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
import { useTranslations } from 'next-intl';

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

export default function LeadForm() {
  const t = useTranslations('LeadForm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const getFormSchema = (t: any) =>
    z.object({
      name: z.string().min(2, t('name.error')),
      email: z.string().email(t('email.error')),
      whatsapp: z.string().min(10, t('whatsapp.error')),
      challenge: z.string().nonempty(t('challenge.error')),
    });
  
  const formSchema = getFormSchema(t);


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
        title: t('toast.success.title'),
        description: t('toast.success.description'),
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
        title: t('toast.error.title'),
        description: t('toast.error.description'),
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
                    <FormLabel>{t('name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('name.placeholder')}
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
                    <FormLabel>{t('email.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('email.placeholder')}
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
                  <FormLabel>{t('whatsapp.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('whatsapp.placeholder')}
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
                  <FormLabel>{t('challenge.label')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder={t('challenge.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vendas">{t('challenge.options.sales')}</SelectItem>
                      <SelectItem value="gestao">{t('challenge.options.management')}</SelectItem>
                      <SelectItem value="processos">{t('challenge.options.processes')}</SelectItem>
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
              {t('submitButton')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
