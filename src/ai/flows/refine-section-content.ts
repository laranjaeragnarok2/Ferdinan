'use server';

/**
 * @fileOverview Refines section content using AI to improve strategic messaging and exclusivity.
 *
 * - refineSectionContent - A function that refines the content of a given section.
 * - RefineSectionContentInput - The input type for the refineSectionContent function.
 * - RefineSectionContentOutput - The return type for the refineSectionContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineSectionContentInputSchema = z.object({
  sectionName: z
    .string()
    .describe('The name of the section to refine (e.g., Pain and Thesis).'),
  content: z.string().describe('The content of the section to be refined.'),
});
export type RefineSectionContentInput = z.infer<typeof RefineSectionContentInputSchema>;

const RefineSectionContentOutputSchema = z.object({
  refinedContent: z
    .string()
    .describe('The refined content of the section, with improved strategic messaging and exclusivity.'),
});
export type RefineSectionContentOutput = z.infer<typeof RefineSectionContentOutputSchema>;

export async function refineSectionContent(input: RefineSectionContentInput): Promise<RefineSectionContentOutput> {
  return refineSectionContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineSectionContentPrompt',
  input: {schema: RefineSectionContentInputSchema},
  output: {schema: RefineSectionContentOutputSchema},
  prompt: `You are an expert marketing strategist specializing in crafting exclusive and persuasive content.

  Refine the content of the following section to improve its strategic messaging and exclusivity. Focus on making the content more impactful and persuasive for high-value leads.

  Section Name: {{{sectionName}}}
  Original Content: {{{content}}}

  Refined Content:`,
});

const refineSectionContentFlow = ai.defineFlow(
  {
    name: 'refineSectionContentFlow',
    inputSchema: RefineSectionContentInputSchema,
    outputSchema: RefineSectionContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
