import * as z from 'zod';

export const heroSchema = z.object({
  name: z.string(),
  title: z.string(),
});

export const experienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  date: z.string(),
  bulletPoints: z.array(z.string()),
});

export const projectsSchema = z.object({
  title: z.string(),
  bulletPoints: z.array(z.string()),
  techStack: z.array(z.string()),
});

const PHONE_REGEX = /^\(\d{3}\)\s\d{3}-\d{4}$/;

export const contactSchema = z.object({
  text: z.string(),
  contactRef: z.union([z.url(), z.email(), z.string().regex(PHONE_REGEX)]),
});

export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectsSchema>;
export type Hero = z.infer<typeof heroSchema>;
export type Contact = z.infer<typeof contactSchema>;

export interface ParsedDoc {
  hero: Hero;
  experiences: Experience[];
  projects: Project[];
  contacts: Contact[];
}