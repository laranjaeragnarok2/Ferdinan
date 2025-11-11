"use client";

import { useState } from "react";
import { refineSectionContent } from "@/ai/flows/refine-section-content";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ContentSectionProps = {
  sectionName: string;
  title: string;
  initialContent: string;
  id: string;
  className?: string;
};

export default function ContentSection({
  sectionName,
  title,
  initialContent,
  id,
  className,
}: ContentSectionProps) {
  const [content, setContent] = useState(initialContent);
  const [isRefining, setIsRefining] = useState(false);

  const handleRefine = async () => {
    setIsRefining(true);
    try {
      const result = await refineSectionContent({ sectionName, content });
      if (result.refinedContent) {
        setContent(result.refinedContent);
      }
    } catch (error) {
      console.error(`Error refining ${sectionName}:`, error);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground whitespace-pre-line">
          {content}
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleRefine}
            disabled={isRefining}
            variant="outline"
          >
            {isRefining ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
            )}
            Refine with AI
          </Button>
        </div>
      </div>
    </section>
  );
}
