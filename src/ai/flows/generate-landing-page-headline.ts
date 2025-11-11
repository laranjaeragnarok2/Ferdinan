// This file is used to generate a compelling headline for the landing page based on product descriptions.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandingPageHeadlineInputSchema = z.object({
  heroSection: z.string().describe('Description of the hero section of the landing page.'),
  painAndThesisSection: z.string().describe('Description of the pain and thesis section of the landing page.'),
});
export type GenerateLandingPageHeadlineInput = z.infer<typeof GenerateLandingPageHeadlineInputSchema>;

const GenerateLandingPageHeadlineOutputSchema = z.object({
  headline: z.string().describe('A compelling headline for the landing page.'),
});
export type GenerateLandingPageHeadlineOutput = z.infer<typeof GenerateLandingPageHeadlineOutputSchema>;

export async function generateLandingPageHeadline(input: GenerateLandingPageHeadlineInput): Promise<GenerateLandingPageHeadlineOutput> {
  return generateLandingPageHeadlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLandingPageHeadlinePrompt',
  input: {schema: GenerateLandingPageHeadlineInputSchema},
  output: {schema: GenerateLandingPageHeadlineOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling headlines for landing pages.

  Based on the following descriptions of the landing page sections, generate a headline that will capture the attention of the target audience and entice them to learn more.

  Hero Section Description: {{{heroSection}}}
  Pain and Thesis Section Description: {{{painAndThesisSection}}}

  Headline:`,
});

const generateLandingPageHeadlineFlow = ai.defineFlow(
  {
    name: 'generateLandingPageHeadlineFlow',
    inputSchema: GenerateLandingPageHeadlineInputSchema,
    outputSchema: GenerateLandingPageHeadlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
