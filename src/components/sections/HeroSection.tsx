"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateLandingPageHeadline } from "@/ai/flows/generate-landing-page-headline";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const formSchema = z.object({
  heroSection: z
    .string()
    .min(10, { message: "Please provide more detail for the hero section." }),
  painAndThesisSection: z.string().min(10, {
    message: "Please provide more detail for the pain/thesis section.",
  }),
});

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

export default function HeroSection() {
  const [headline, setHeadline] = useState(
    "Your Bespoke Growth Strategy, Curated."
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroSection:
        "A premium consulting service that offers curated, validated marketing strategies instead of just selling tools.",
      painAndThesisSection:
        "Businesses waste money on a patchwork of tools. Our thesis is that a bespoke strategy, not a tool, is the key to growth.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    try {
      const result = await generateLandingPageHeadline(values);
      if (result.headline) {
        setHeadline(result.headline);
      }
    } catch (error) {
      console.error("Error generating headline:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <section className="py-12 sm:py-20 bg-secondary">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            Stop chasing fleeting trends. We deliver enduring growth through
            meticulously vetted strategies and technologies, tailored exclusively
            for ambitious businesses.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="#contact">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Begin Consultation
              </Button>
            </Link>
            <Link href="#process">
              <Button size="lg" variant="outline">
                Our Process
              </Button>
            </Link>
          </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Headline Generator
            </CardTitle>
            <CardDescription>
              Craft a compelling headline. Describe your core offerings below and let
              AI create the perfect hook.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="heroSection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Section Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your main value proposition..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="painAndThesisSection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pain & Thesis Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What problem do you solve and what's your core belief?..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Headline
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
