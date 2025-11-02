import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { ParsedDoc, heroSchema, experienceSchema, projectsSchema, contactSchema } from '../types';

const dataDir = path.join(process.cwd(), 'data');

function readYamlFile<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents) as T;
}

export function getPortfolioData(): ParsedDoc {
  try {
    // Read each YAML file
    const about = readYamlFile('about.yml');
    const experiences = readYamlFile('experiences.yml');
    const projects = readYamlFile('projects.yml');
    const contacts = readYamlFile('contacts.yml');

    // Validate and parse with Zod schemas
    const parsedData: ParsedDoc = {
      hero: heroSchema.parse(about),
      experiences: Array.isArray(experiences)
        ? experiences.map((exp) => experienceSchema.parse(exp))
        : [],
      projects: Array.isArray(projects) ? projects.map((proj) => projectsSchema.parse(proj)) : [],
      contacts: Array.isArray(contacts)
        ? contacts.map((contact) => contactSchema.parse(contact))
        : [],
    };

    return parsedData;
  } catch {
    throw new Error('Portfolio data is invalid or missing. Please check your YAML files.');
  }
}
