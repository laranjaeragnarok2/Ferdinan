"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  company: z.string().min(2, "Company name is required."),
  role: z.string().min(2, "Your role is required."),
  budget: z.string().nonempty("Please select a budget range."),
  challenge: z
    .string()
    .min(10, "Please describe your challenge in at least 10 characters."),
});

export type LeadFormData = z.infer<typeof formSchema>;

export async function submitLead(data: LeadFormData) {
  console.log("New lead submitted:", data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, message: "Thank you! We'll be in touch shortly." };
}
