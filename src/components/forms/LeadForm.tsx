"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitLead, type LeadFormData } from "@/app/actions/submitLead";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Por favor, insira um e-mail válido."),
  company: z.string().min(2, "O nome da empresa é obrigatório."),
  role: z.string().min(2, "Sua função é obrigatória."),
  budget: z.string().nonempty("Por favor, selecione uma faixa de orçamento."),
  challenge: z
    .string()
    .min(10, "Por favor, descreva seu desafio em pelo menos 10 caracteres."),
});

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      budget: "",
      challenge: "",
    },
  });

  async function onSubmit(values: LeadFormData) {
    setIsSubmitting(true);
    const result = await submitLead(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Enviado com Sucesso",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Falha no Envio",
        description: "Algo deu errado. Por favor, tente novamente.",
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
                      <Input placeholder="ex: João da Silva" {...field} className="bg-input" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Exemplo Ltda." {...field} className="bg-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu Cargo</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Diretor de Marketing" {...field} className="bg-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orçamento Anual Estimado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input">
                        <SelectValue placeholder="Selecione uma faixa de orçamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="< R$50k">&lt; R$50.000</SelectItem>
                      <SelectItem value="R$50k-R$100k">R$50.000 - R$100.000</SelectItem>
                      <SelectItem value="R$100k-R$250k">R$100.000 - R$250.000</SelectItem>
                      <SelectItem value="R$250k-R$500k">R$250.000 - R$500.000</SelectItem>
                      <SelectItem value="R$500k+">&gt; R$500.000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principal Desafio de Negócio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva brevemente o principal desafio que você busca resolver..."
                      className="resize-none bg-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold text-lg py-6 btn-gradient border-amber-500 hover:brightness-110"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              )}
              Solicitar uma Consultoria
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
